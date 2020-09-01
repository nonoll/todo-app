<template>
  <main-layout>
    <div class="todo">
      <todo-info
        :title="state.title"
        :filter="state.filter"
        :filterOptions="state.filterOptions"
        @filter-change="onFilterChange"
        @add-todo="onAddTodo"
      />

      <todo-list
        :todo-list="state.todoList"
        display-key="isVisible"
        @status-toggle="onTodoStatusToggle"
        @content-click="onTodoEditClick"
        @edit-click="onTodoEditClick"
        @delete-click="onTodoDeleteClick"
      />

      <todo-editor
        :visible="stateEditor.visible"
        :mode="stateEditor.mode"
        :uuid="stateEditor.uuid"
        :title="stateEditor.title"
        :description="stateEditor.description"
        :priorityLabel="stateEditor.priorityLabel"
        :priority="stateEditor.priority"
        :due-date="stateEditor.dueDate"
        @close="onEditorClose"
        @save="onEditorSave"
        @modify="onEditorModify"
        @cancel="onEditorCancel"
      />
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted, onMounted } from '@vue/composition-api'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { TodoInfo, TodoList, TodoEditor } from '@/components/todo'
import { useLocalStorageByKey } from '@/composables'
import { TodoListStorageKey } from '@/constants/keys'
import { DefaultFilter, FILTERS, FILTER_VALUES, TODO_EDITOR_MODE, DefaultPriority } from '@/constants/todo'
import { TodoItem } from '@/models/todo/todoItem.model'
import { ITodoItem } from '@/models/todo/types'
import { Notification } from 'element-ui'

const initialEditor = {
  mode: TODO_EDITOR_MODE.ADD as string,
  uuid: '',
  title: '',
  description: '',
  priorityLabel: DefaultPriority.label,
  priority: DefaultPriority.value,
  dueDate: ''
} as const

interface EditorParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  todo: unknown | ITodoItem | any;
  isDirty: boolean;
}

export default defineComponent({
  components: {
    MainLayout,
    TodoInfo,
    TodoList,
    TodoEditor
  },
  setup () {
    const todoListLocalStorage = useLocalStorageByKey(TodoListStorageKey)
    const state = reactive({
      title: '오늘(화) 09월 01일',
      filter: DefaultFilter.value,
      filterOptions: FILTERS,
      todoList: [] as ITodoItem [],
      checkOverTimeout: 0
    })

    const stateEditor = reactive({
      visible: false,
      ...initialEditor
    })

    const openEditor = (): void => {
      stateEditor.visible = true
    }

    const closeEditor = (): void => {
      stateEditor.visible = false
    }

    const displayEditor = (data: typeof stateEditor): void => {
      const { mode, uuid, title, description, priorityLabel, priority, dueDate } = data

      stateEditor.mode = mode
      stateEditor.uuid = uuid
      stateEditor.title = title
      stateEditor.description = description
      stateEditor.priorityLabel = priorityLabel
      stateEditor.priority = priority
      stateEditor.dueDate = dueDate
    }

    const sortTodoList = (sortType: FILTER_VALUES): void => {
      switch (sortType) {
        case FILTER_VALUES.ALL:
          state.todoList = state.todoList.map((item: ITodoItem) => {
            item.isVisible = true
            return item
          }).sort((a, b) => {
            const aDate = a.createdAt
            const bDate = b.createdAt
            if (aDate && bDate) {
              const sort = new Date(aDate).getTime() - new Date(bDate).getTime()
              return sort
            } else {
              return 0
            }
          })
          break

        case FILTER_VALUES.PRIORITY:
          state.todoList = state.todoList.map((item: ITodoItem) => {
            item.isVisible = true
            return item
          }).sort((a, b) => a.priority - b.priority)
          break

        case FILTER_VALUES.DUE_DATE:
          state.todoList = state.todoList.map((item: ITodoItem) => {
            item.isVisible = !!item.dueDate
            return item
          }).sort((a, b) => {
            const aDate = new Date(`2020-09-01T${a.dueDate}`)
            const bDate = new Date(`2020-09-01T${b.dueDate}`)
            if (aDate && bDate) {
              const sort = aDate.getTime() - bDate.getTime()
              return sort
            } else {
              return 0
            }
          })
          break

        case FILTER_VALUES.DONE:
          state.todoList = state.todoList.map((item: ITodoItem) => {
            item.isVisible = item.isDone
            return item
          })
          break
      }
    }

    const updateSortTodoList = (): void => sortTodoList(state.filter as FILTER_VALUES)

    const onFilterChange = (changeValue: FILTER_VALUES): void => {
      const filter = FILTERS.find(filter => filter.value === changeValue)
      if (!filter) {
        return
      }

      const value = filter.value as FILTER_VALUES
      state.filter = value
      updateSortTodoList()
    }

    const onTodoStatusToggle = ({ todo }: Pick<EditorParams, 'todo'>): void => {
      state.todoList = state.todoList.map((item: ITodoItem) => {
        if (item.uuid === todo.uuid) {
          return {
            ...item,
            isDone: !todo.isDone
          }
        } else {
          return item
        }
      })
    }

    const onTodoEditClick = ({ todo }: Pick<EditorParams, 'todo'>): void => {
      displayEditor({
        ...todo,
        mode: TODO_EDITOR_MODE.MODIFY as string
      })
      openEditor()
    }

    const onTodoDeleteClick = ({ todo }: Pick<EditorParams, 'todo'>): void => {
      // TODO: Modal confirm
      if (!confirm(`${todo.title} 을\n삭제 하시겠습니까?`)) {
        return
      }

      state.todoList = state.todoList
        .map((item: ITodoItem) => item.uuid !== todo.uuid ? item : null)
        .filter(item => item) as ITodoItem[]

      updateSortTodoList()

      Notification.warning({
        title: todo.title,
        message: '일감이 삭제되었습니다.',
        showClose: false
      })
    }

    const onAddTodo = (): void => {
      displayEditor({ ...initialEditor as typeof stateEditor })
      openEditor()
    }

    const onEditorClose = (): void => closeEditor()

    const onEditorSave = ({ todo }: Pick<EditorParams, 'todo'>): void => {
      const model = new TodoItem().fromVo(todo).toVo()
      state.todoList.push(model)

      updateSortTodoList()

      Notification.success({
        title: model.title,
        message: '일감이 추가 되었습니다.',
        showClose: false
      })

      window.requestAnimationFrame(() => {
        if (document && document.scrollingElement) {
          window.scrollTo({ top: document.scrollingElement.scrollHeight, behavior: 'smooth' })
        }
      })

      closeEditor()
    }

    const onEditorModify = ({ todo, isDirty }: EditorParams): void => {
      if (!isDirty) {
        // 변경사항 없음, 처리 무의미
        return
      }

      state.todoList = state.todoList.map((item: ITodoItem) => {
        if (item.uuid === todo.uuid) {
          const model = new TodoItem().fromVo(todo).toVo()
          return { ...model }
        } else {
          return item
        }
      })

      updateSortTodoList()

      Notification.success({
        title: todo.title,
        message: '일감이 수정되었습니다.',
        showClose: false
      })

      closeEditor()
    }

    const onEditorCancel = ({ isDirty }: Pick<EditorParams, 'isDirty'>): void => {
      if (isDirty) {
        // TODO: Modal confirm
        confirm('입력한 내용이 저장되지 않습니다.\n취소 하시겠습니까?') && closeEditor()
      } else {
        closeEditor()
      }
    }

    const setCheckOverDudate = () => {
      state.checkOverTimeout = setTimeout(setCheckOverDudate, 1000 * 60)
      if (state.todoList && !state.todoList.length) {
        return
      }

      const currentTime = new Date()
      let offset = 1
      state.todoList.forEach(todo => {
        if (!todo.dueDate || todo.isDone) {
          return
        }
        const todoTime = new Date(`2020-09-01T${todo.dueDate}`)
        if (currentTime > todoTime) {
          window.requestAnimationFrame(() => Notification.error({ title: todo.title, message: '일감 마감시간이 지났습니다', showClose: false, offset }))
          offset++
        }
      })
    }

    const onBeforeUnload = () => {
      const saveTodoList = JSON.stringify(state.todoList)
      todoListLocalStorage.setItem(saveTodoList)

      clearTimeout(state.checkOverTimeout)

      window.removeEventListener('beforeunload', onBeforeUnload)
    }

    onMounted(() => {
      const saveTodoList = todoListLocalStorage.getItem()
      if (saveTodoList) {
        state.todoList = JSON.parse(saveTodoList).map((todo: unknown) => {
          const model = new TodoItem().fromVo(todo).toVo()
          return model
        })
        sortTodoList(state.filter as FILTER_VALUES)
      }

      setCheckOverDudate()
      window.addEventListener('beforeunload', onBeforeUnload)
    })

    onUnmounted(() => onBeforeUnload())

    return {
      state,
      stateEditor,
      onFilterChange,
      onAddTodo,
      onTodoStatusToggle,
      onTodoEditClick,
      onTodoDeleteClick,
      onEditorClose,
      onEditorSave,
      onEditorModify,
      onEditorCancel
    }
  }
})
</script>

<style lang="scss" scoped>
.todo {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
