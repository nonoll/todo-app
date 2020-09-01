<template>
  <el-card class="todo-item" shadow="hover" :class="{ 'is--done': isDone }" :style="{ '--priority-color': priorityColor }">
    <div class="todo-item__status">
      <label>
        <span class="blind">완료여부</span>
        <input class="status-check" type="checkbox" :value="isDone" :checked="isDone" @change="$emit('status-toggle')" />
      </label>
    </div>
    <div class="todo-item__contents">
      <em class="contents-title">{{ title }}</em>
      <p class="contents-description">{{ description }}&nbsp;</p>
      <div class="contents-info">
        <span v-if="priority">우선순위 {{ priority }}</span>
        <span class="info-divider" v-if="dueDate"></span>
        <span v-if="dueDate">마감기한 {{ dueDate }}</span>
      </div>
      <a class="todo-item__contents-link" @click="$emit('content-click')">
        <span class="blind">일감 상세 보기</span>
      </a>
    </div>
    <div class="todo-item__actions">
      <link-menu tooltip-message="일감을 편집합니다." icon-class-name="el-icon-more-outline" @click="$emit('edit-click')" />
      <el-divider class="divider"></el-divider>
      <link-menu tooltip-message="일감을 삭제합니다." icon-class-name="el-icon-delete" @click="$emit('delete-click')" />
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { LinkMenu } from '@/components/menus'

export default defineComponent({
  name: 'TodoItem',
  components: {
    LinkMenu
  },
  props: {
    priorityColor: {
      type: String,
      default: '#ff0000'
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    priority: {
      type: Number,
      default: 0
    },
    dueDate: {
      type: String,
      default: ''
    },
    isDone: {
      type: Boolean
    }
  },
  setup () {
    return {}
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

.todo-item {
  --priority-color: #fffff;

  & + & {
    margin: 20px 0 0;
  }

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

  &.is--done {
    .contents-title {
      color: #909399;
      opacity: 0.5;
      text-decoration: line-through;
    }

    .contents-description {
      color: #C0C4CC;
      opacity: 0.5;
      text-decoration: line-through;
    }

    .contents-info {
      span {
        opacity: 0.5;
        text-decoration: line-through;
      }
    }
  }

  &__contents {
    position: relative;
    width: 80%;

    .contents-title {
      font-size: 16px;
      line-height: 24px;
      color: #303133;
      transform: color, opacity 0.5s;
    }

    .contents-description {
      font-size: 12px;
      line-height: 20px;
      color: #909399;
      transform: color, opacity 0.5s;
      min-height: 20px;
    }

    .contents-info {
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        font-size: 10px;
        line-height: 16px;
        color: #C0C4CC;
        transform: color, opacity 0.5s;
        min-height: 16px;
      }

      .info-divider {
        display: inline-block;
        margin: 5px;
        border-left: 1px solid #C0C4CC;
        height: 10px;
        min-height: 10px;
        box-sizing: border-box;
      }
    }

    &-link {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
    transition: opacity 0.5s;

    .divider {
      width: 15px;
      margin: 24px 4px 24px 0;
    }
  }
}
</style>
