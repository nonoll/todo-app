<template>
  <div class="todo-list">
    <template v-if="viewState.hasList">
      <todo-item v-for="(todo, index) in viewState.displayList"
        :key="todo.uuid || index"
        :title="todo.title"
        :description="todo.description"
        :priority="todo.priority"
        :due-date="todo.dueDate"
        :is-done="todo.isDone"
        @status-toggle="$emit('status-toggle', { index, todo })"
        @content-click="$emit('content-click', { index, todo })"
        @edit-click="$emit('edit-click', { index, todo })"
        @delete-click="$emit('delete-click', { index, todo })"
      />
    </template>
    <template v-else-if="viewState.isEmpty">
      <div class="todo-item is--empty">
        <i class="empty-icon el-icon-circle-check"></i>
        <p class="empty-title">등록된 일감이 없습니다.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { TodoItem } from '@/components/todo'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todoList: {
      type: Array,
      require: true
    },
    displayKey: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const viewState = computed(() => {
      const displayList = (() => {
        if (!props.todoList && !(props.todoList || []).length) {
          return []
        }

        if (!props.displayKey) {
          return props.todoList || []
        }

        return (props.todoList || []).map(todo => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((todo as any)[props.displayKey]) {
            return todo
          }
        }).filter(todo => todo)
      })()
      const hasList = displayList.length
      const isEmpty = !hasList

      return { hasList, displayList, isEmpty }
    })

    return {
      viewState
    }
  }
})
</script>

<style lang="scss" scoped>
.blind {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}

.todo-list {
  margin: 0;
  height: calc(100% - 80px);
}

.todo-item {
  &.is--empty {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .empty-icon {
      font-size: 48px;
      line-height: 48px;
      color: #67C23A;
    }

    .empty-title {
      margin: 20px 0 0;
      font-size: 22px;
      line-height: 22px;
    }
  }
}
</style>
