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
      <p class="contents-description">{{ description }}</p>
      <a class="todo-item__contents-link" @click="$emit('content-click')">
        <span class="blind">일감 상세 보기</span>
      </a>
    </div>
    <div class="todo-item__actions">
      <link-menu tooltip-message="일감을 편집합니다." icon-class-name="el-icon-more-outline" @click="$emit('edit-click')" />
      <el-divider></el-divider>
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

  .status-check {
    // appearance:none;
    // -webkit-appearance:none;
    // outline: none;
    // content: none;
    // border-radius: 100%;

    // &:before {
    //   font-family: element-icons!important;
    //   content: "\e79c";
    //   font-size: 15px;
    //   color: transparent !important;
    //   background: var(--priority-color);
    //   display: block;
    //   width: 15px;
    //   height: 15px;
    //   border: 1px solid var(--priority-color);
    //   margin-right: 7px;
    // }

    // &:checked:before {
    //   color: var(--priority-color) !important;
    // }
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

  &__contents {
    position: relative;
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
  }
}
</style>
