<template>
  <main-layout>
    <div class="ui">
      <div class="todo">
        <div class="todo-info">
          <el-tooltip effect="dark" content="일감을 추가합니다." placement="top-start">
            <el-button icon="el-icon-edit" circle @click="state.viewRegistModal = true"></el-button>
          </el-tooltip>
          <div class="todo-info__title">오늘(월요일) 08월 31일</div>
          <el-tooltip effect="dark" content="일감을 정렬합니다." placement="top-start">
            <el-select v-model="state.filter" placeholder="Select">
              <el-option
                v-for="item in state.filterOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-tooltip>
        </div>
        <div class="todo-list">
          <template v-if="!state.isEmpty">
            <el-card class="todo-item" shadow="hover">
              <div class="todo-item__status">
                <label>
                  <span class="blind">완료여부 // 아이콘 처리</span>
                  <input type="checkbox" />
                </label>
              </div>
              <div class="todo-item__contents" @click="state.viewRegistModal = true">
                <em class="contents-title">작업항목 제목</em>
                <p class="contents-description">작업항목 내용</p>
              </div>
              <div class="todo-item__actions">
                <el-tooltip class="item" effect="dark" content="일감을 편집합니다." placement="top-start">
                  <el-link icon="el-icon-more-outline" @click="state.viewRegistModal = true"></el-link>
                </el-tooltip>
                <el-divider></el-divider>
                <el-tooltip class="item" effect="dark" content="일감을 삭제합니다." placement="top-start">
                  <el-link icon="el-icon-delete" @click="() => {
                    displayMessage()
                    state.isEmpty = true
                  }"></el-link>
                </el-tooltip>
              </div>
            </el-card>
          </template>
          <template v-else>
            <div class="todo-item is--empty">
              <i class="empty-icon el-icon-circle-check"></i>
              <p class="empty-title">등록된 일감이 없습니다.</p>
            </div>
          </template>
        </div>

        <el-dialog title="일감 추가" width="80%" :visible.sync="state.viewRegistModal" @opened="onModalOpen" center>
          <div class="regist">
            <el-form label-position="left" label-width="120px" class="form">
              <em class="blind">작업 항목 등록</em>
              <div class="form__group">
                <el-form-item
                  ref="elModalTitle"
                  label="제목"
                  :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input></el-input>
                </el-form-item>
                <el-divider></el-divider>
              </div>
              <div class="form__group" :class="{ 'is--hide': !state.editDescription }">
                <el-form-item label="내용">
                  <el-input type="textarea" class="todo__description"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <!--
                <label>
                  <span class="blind">내용</span>
                  <textarea class="todo__description" rows="3" maxlength="140" />
                </label>
                 -->
              </div>
              <div class="form__group" :class="{ 'is--hide': !state.editPriority }">
                <el-form-item label="우선순위">
                  <el-dropdown trigger="click" @command="onProrityChange">
                    <el-button type="primary">
                      <i class="el-icon-s-flag">우선순위</i><i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="PRIORITYS.VALUE_1"><i class="el-icon-s-flag">우선순위 1</i></el-dropdown-item>
                      <el-dropdown-item :command="PRIORITYS.VALUE_2"><i class="el-icon-s-flag">우선순위 2</i></el-dropdown-item>
                      <el-dropdown-item :command="PRIORITYS.VALUE_3"><i class="el-icon-s-flag">우선순위 3</i></el-dropdown-item>
                      <el-dropdown-item :command="PRIORITYS.VALUE_4"><i class="el-icon-s-flag">우선순위 4</i></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
                <el-divider></el-divider>
              </div>
              <div class="form__group" :class="{ 'is--hide': !state.editDueDate }">
                <el-form-item label="마감기한">
                  <el-time-select
                    v-model="state.duDate"
                    :picker-options="{
                      start: '10:00',
                      step: '00:15',
                      end: '19:00'
                    }"
                    placeholder="Select time">
                  </el-time-select>
                </el-form-item>
                <el-divider></el-divider>
              </div>
              <div class="form__actions">
                <div class="actions__icon">
                  <el-tooltip class="item" effect="dark" content="세부 작업 내용을 입력합니다." placement="top-start">
                    <el-checkbox-button @change="onActionsIconChange(ACTION_TYPES.DESCRIPTION, $event)">
                      <i class="el-icon-chat-line-square"><span class="blind">내용 추가</span></i>
                    </el-checkbox-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="작업의 우선순위를 지정합니다." placement="top-start">
                    <el-checkbox-button @change="onActionsIconChange(ACTION_TYPES.PRIORITY, $event)">
                      <i class="el-icon-s-flag"><span class="blind">우선순위</span></i>
                    </el-checkbox-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="마감기한을 지정합니다." placement="top-start">
                    <el-checkbox-button @change="onActionsIconChange(ACTION_TYPES.DUE_DATE, $event)">
                      <i class="el-icon-timer"><span class="blind">마감기한</span></i>
                    </el-checkbox-button>
                  </el-tooltip>
                </div>
              </div>
            </el-form>
          </div>
          <template #footer>
            <div class="actions__button">
              <el-button-group>
                <el-button type="primary" icon="el-icon-check" @click="() => {
                  displayMessage(true)
                  state.isEmpty = false
                  state.viewRegistModal = false
                }">저장</el-button>
                <el-button icon="el-icon-close" @click="state.viewRegistModal = false">취소</el-button>
              </el-button-group>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { Notification } from 'element-ui'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { ElementUIComponent } from 'element-ui/types/component'
import { ElNotificationOptions } from 'element-ui/types/notification'

enum PRIORITYS {
  VALUE_1 = 'VALUE_1',
  VALUE_2 = 'VALUE_2',
  VALUE_3 = 'VALUE_3',
  VALUE_4 = 'VALUE_4'
}

enum ACTION_TYPES {
  DESCRIPTION = 'DESCRIPTION',
  PRIORITY = 'PRIORITY',
  DUE_DATE = 'DUE_DATE'
}

export default defineComponent({
  components: {
    MainLayout
  },
  setup () {
    const elModalTitle = ref<ElementUIComponent>()
    const state = reactive({
      filter: 'ALL',
      filterOptions: [{
        value: 'ALL',
        label: '전체'
      }, {
        value: 'PRIORITY',
        label: '우선순위'
      }, {
        value: 'DUE_DATE',
        label: '마감기한'
      }, {
        value: 'DONE',
        label: '완료'
      }],
      priority: '우선순위 4',
      dueDate: '',
      isEmpty: false,
      viewRegistModal: false,
      editDescription: false,
      editPriority: false,
      editDueDate: false
    })

    const onProrityChange = (value: PRIORITYS): void => {
      console.log('onProrityChange', value)
      switch (value) {
        case PRIORITYS.VALUE_1:
          state.priority = '우선순위 1'
          break

        case PRIORITYS.VALUE_2:
          state.priority = '우선순위 2'
          break

        case PRIORITYS.VALUE_3:
          state.priority = '우선순위 3'
          break

        case PRIORITYS.VALUE_4:
        default:
          state.priority = '우선순위 4'
          break
      }
    }

    const onActionsIconChange = (type: ACTION_TYPES, value: boolean): void => {
      console.log('onActionsIconChange', type, value)
      switch (type) {
        case ACTION_TYPES.DESCRIPTION:
          state.editDescription = value
          break

        case ACTION_TYPES.PRIORITY:
          state.editPriority = value
          break

        case ACTION_TYPES.DUE_DATE:
          state.editDueDate = value
          break
      }
    }

    const displayMessage = (isAdd: boolean): void => {
      let message = {
        type: 'success',
        title: '일감 제목',
        message: '일감이 추가 되었습니다.',
        showClose: false
      } as ElNotificationOptions

      if (!isAdd) {
        message = {
          type: 'warning',
          title: '일감 제목',
          message: '일감이 삭제 되었습니다.',
          showClose: false
        }
      }

      Notification(message)
    }

    const onModalOpen = (): void => {
      if (elModalTitle && elModalTitle.value) {
        const el = elModalTitle.value.$el as HTMLInputElement
        const input = el.querySelector('input')
        if (input) {
          input.focus()
        }
      }
    }

    return {
      PRIORITYS,
      ACTION_TYPES,
      elModalTitle,
      state,
      onProrityChange,
      onActionsIconChange,
      onModalOpen,
      displayMessage
    }
  }
})
</script>

<style lang="scss" scoped>
.ui {
  position: relative;
  width: 100%;
  flex: 1;

  .todo {
    height: 100%;
  }

  .todo-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }

  .todo-list {
    margin: 20px 0 0;
    height: 100%;
  }

  .todo-item {
    ::v-deep .el-card__body {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &:hover {
      .todo-item__actions {
        opacity: 1;
      }
    }

    &__contents {
      width: 80%;

      .contents-title {
        font-size: 16px;
        line-height: 24px;
        color: #303133;
      }

      .contents-description {
        font-size: 12px;
        line-height: 20px;
        color: #909399;
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      opacity: 0;
      transition: opacity 0.5s;
    }

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

  ::v-deep .el-link.is-underline:hover:after {
    display: none;
  }
}

.blind {
  @include blind;
}

.regist {
  // border: 1px solid #ddd;
  // border-radius: 5px;
  // padding: 10px 10px 0;
  // transition: border .5s;

  // &.has--focus {
  //   border-color: red
  // }

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
    justify-content: space-between;
  }
}
</style>
