<template>
  <el-dialog
    center
    class="todo-editor"
    :title="viewState.title"
    width="80%"
    :visible.sync="visible"
    @opened="onOpened"
    @closed="onClosed"
  >
    <div class="regist">
      <el-form label-position="left" label-width="120px" class="form">
        <em class="blind">작업 항목 등록</em>
        <div class="form__group">
          <el-form-item label="제목" :rules="[]">
            <el-input ref="elTitle" v-model="todo.title"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </div>
        <div class="form__group" :class="{ 'is--hide': !state.editDescription }">
          <el-form-item label="내용" :rules="[]">
            <el-input type="textarea" class="todo__description" v-model="todo.description"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </div>
        <div class="form__group" :class="{ 'is--hide': !state.editPriority }">
          <el-form-item label="우선순위">
            <dropdown :primary-label="todo.priorityLabel" :menus="state.priority" @change="onProrityChange" />
          </el-form-item>
          <el-divider></el-divider>
        </div>
        <div class="form__group" :class="{ 'is--hide': !state.editDueDate }">
          <el-form-item label="마감기한" :rules="[]">
            <el-time-select
              placeholder="시간 선택"
              v-model="todo.dueDate"
              :value="state.dueDate"
              :picker-options="state.dueDateOptions"
            >
            </el-time-select>
          </el-form-item>
          <el-divider></el-divider>
        </div>
        <div class="form__actions">
          <check-menu
            tooltip-message="일감의 내용을 입력/편집 합니다."
            blind="내용 입력/편집"
            icon-class-name="el-icon-chat-line-square"
            @change="onActionChange(TODO_ACTION_TYPES.DESCRIPTION, $event)"
          />
          <check-menu
            tooltip-message="일감의 우선순위를 지정합니다."
            blind="우선순위 입력/편집"
            icon-class-name="el-icon-s-flag"
            @change="onActionChange(TODO_ACTION_TYPES.PRIORITY, $event)"
          />
          <check-menu
            tooltip-message="일감의 마감기한을 지정합니다."
            blind="마감기한 입력/편집"
            icon-class-name="el-icon-timer"
            @change="onActionChange(TODO_ACTION_TYPES.DUE_DATE, $event)"
          />
        </div>
      </el-form>
    </div>
    <template #footer>
      <div class="actions__button">
        <el-button-group>
          <template v-if="viewState.isAddMode">
            <el-button type="primary" icon="el-icon-check" @click="onSaveClick">저장</el-button>
          </template>
          <template v-else>
            <el-button type="primary" icon="el-icon-check" @click="onModifyClick">수정</el-button>
          </template>
          <el-button icon="el-icon-close" @click="onCancelClick">취소</el-button>
        </el-button-group>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import { Dropdown, CheckMenu } from '@/components/menus'
import { TODO_EDITOR_MODE, DefaultPriority, PRIORITYS, PriorityItem, TODO_ACTION_TYPES } from '@/constants'
import { ElementUIComponent } from 'element-ui/types/component'
import { timeToDate } from '@/libs/format'

export default defineComponent({
  name: 'TodoEditor',
  components: {
    Dropdown,
    CheckMenu
  },
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    mode: {
      type: String,
      default: TODO_EDITOR_MODE.ADD
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    priorityLabel: {
      type: String,
      default: DefaultPriority.label
    },
    priority: {
      type: Number,
      default: DefaultPriority.value
    },
    dueDate: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const elTitle = ref<ElementUIComponent>()

    const viewState = computed(() => {
      const title = props.mode === TODO_EDITOR_MODE.ADD ? '일감 추가' : '일감 편집'
      const isAddMode = props.mode === TODO_EDITOR_MODE.ADD
      return { title, isAddMode }
    })

    const state = reactive({
      priority: [...PRIORITYS],
      dueDateOptions: {
        start: '10:00',
        step: '00:15',
        end: '19:00'
      },
      dueDate: props.dueDate,
      editDescription: false,
      editPriority: false,
      editDueDate: false
    })

    const todo = reactive({
      title: props.title,
      description: props.description,
      priorityLabel: props.priorityLabel,
      priority: props.priority,
      dueDate: props.dueDate
    })

    const onOpened = (): void => {
      emit('opened')

      if (!props.autoFocus) {
        return
      }

      if (elTitle && elTitle.value) {
        const input = elTitle.value.$el.querySelector('.el-input__inner') as HTMLInputElement
        if (input) {
          input.focus()
        }
      }
    }

    const onClosed = (): void => emit('closed')

    const onProrityChange = (changeItem: PriorityItem): void => {
      const { label, value } = changeItem
      todo.priorityLabel = label
      todo.priority = value
    }

    const onActionChange = (actionType: TODO_ACTION_TYPES, checked: boolean): void => {
      switch (actionType) {
        case TODO_ACTION_TYPES.DESCRIPTION:
          state.editDescription = checked
          break

        case TODO_ACTION_TYPES.PRIORITY:
          state.editPriority = checked
          break

        case TODO_ACTION_TYPES.DUE_DATE:
          state.editDueDate = checked
          break
      }
    }

    const sanitizeTodo = (payload: typeof todo) => {
      return {
        ...payload,
        dueDate: timeToDate(payload.dueDate)
      }
    }

    const onSaveClick = (): void => emit('save', sanitizeTodo(todo))
    const onModifyClick = (): void => emit('modify', sanitizeTodo(todo))
    const onCancelClick = (): void => emit('cancel')

    return {
      TODO_ACTION_TYPES,
      elTitle,
      viewState,
      state,
      todo,
      onOpened,
      onClosed,
      onProrityChange,
      onActionChange,
      onSaveClick,
      onModifyClick,
      onCancelClick
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

.todo-editor {
  .regist {
    .todo__title {
      width: 100%;
      font-size: 14px;
      min-height: 24px;
      line-height: 21px;
      border: none;
      outline: 0;
    }

    .todo__description {
      width: 100%;
      font-size: 14px;
      min-height: 24px;
      line-height: 21px;
      border: none;
      outline: 0;
      resize: none;
    }

    .form__group {
      max-height: 500px;
      opacity: 1;
      transition: opacity, max-height .5s;
      overflow: hidden;

      &.is--hide {
        max-height: 0;
        opacity: 0;
      }

      &.is--show {
        max-height: 500px;
        opacity: 1;
      }
    }

    .form__actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
</style>
