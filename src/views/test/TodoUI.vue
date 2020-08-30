<template>
  <main-layout>
    <div class="ui">
      <div class="todo">
        <div class="todo__info">
          <div class="info">오늘(요일) MM월 DD일</div>
          <div>
            필터
            <label>
              우선순위: // 색으로 구분
              <select>
                <option value="1">우선순위 1</option>
                <option value="2">우선순위 2</option>
                <option value="3">우선순위 3</option>
                <option value="4" selected>우선순위 4</option>
              </select>
            </label>
          </div>
        </div>
        <div class="todo__list">
          <div class="todo__item">
            <div>
              <i>우선순위 색상 // 완료시 색상 변경</i>
              <label>
                <span class="blind">완료여부 // 아이콘 처리</span>
                <input type="checkbox" />
              </label>
            </div>
            <div>
              // 완료시 스타일 변경
              <em>작업항목 제목</em>
              <p>작업항목 내용</p>
            </div>
            <div>
              <i>수정아이콘</i>
              <i class="el-icon-delete"></i>
              <button>삭제</button>
            </div>
          </div>
          <div class="todo__item is--empty">등록된 작업 항목이 없습니다.</div>
        </div>

        <el-dialog title="일감 추가" width="80%" :visible="true" center>
          <div class="regist">
            <el-form label-position="left" label-width="120px" class="form">
              <em class="blind">작업 항목 등록</em>
              <div class="form__group">
                <el-form-item
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
                <el-divider></el-divider>
              </div>
              <div class="form__group" :class="{ 'is--hide': !state.editDueDate }">
                <label>
                  <span class="blind">마감기한</span>
                  <el-time-select
                    v-model="state.duDate"
                    :picker-options="{
                      start: '10:00',
                      step: '00:15',
                      end: '19:00'
                    }"
                    placeholder="Select time">
                  </el-time-select>
                </label>
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
                <!--
                <div class="actions__button">
                  <el-button-group>
                    <el-button type="primary" icon="el-icon-check">저장</el-button>
                    <el-button type="info" icon="el-icon-close">취소</el-button>
                    <el-popconfirm title="Are you sure to delete this?">
                      <el-button slot="reference">삭제</el-button>
                    </el-popconfirm>
                    <el-popconfirm title="Are you sure to delete this?" confirmButtonText="확인" cancelButtonText="취소">
                      <el-button slot="reference">취소</el-button>
                    </el-popconfirm>
                  </el-button-group>
                </div>
                 -->
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" icon="el-icon-check">저장</el-button>
            <el-popconfirm title="일감을 삭제 하시겠습니까?" confirmButtonText="확인" cancelButtonText="취소">
              <el-button slot="reference" icon="el-icon-delete">삭제</el-button>
            </el-popconfirm>
            <el-popconfirm title="조건체크 / 취소 하시겠습니까?" confirmButtonText="확인" cancelButtonText="취소">
              <el-button slot="reference" icon="el-icon-close">취소</el-button>
            </el-popconfirm>
          </span>
        </el-dialog>
      </div>
      <div class="add-todo blind">일감 추가</div>
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import { Notification } from 'element-ui'
import MainLayout from '@/components/layouts/MainLayout.vue'

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
    const state = reactive({
      priority: '우선순위 4',
      dueDate: '',
      editDescription: false,
      editPriority: false,
      editDueDate: false
    })

    const onProrityChange = (value: PRIORITYS) => {
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

    const displayMessage = () => {
      Notification({
        type: 'success',
        title: 'Info',
        message: 'This is a message without close button',
        showClose: false
      })
    }

    onMounted(() => {
      setTimeout(displayMessage, 1000 * 2)
    })

    return {
      PRIORITYS,
      ACTION_TYPES,
      state,
      onProrityChange,
      onActionsIconChange
    }
  }
})
</script>

<style lang="scss" scoped>
.ui {
  position: relative;
  width: 100%;
  flex: 1;
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
