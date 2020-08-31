<template>
  <div class="todo-list">
    <template v-if="viewState.hasList">
      <todo-item v-for="(item, index) in todoList"
        :key="index"
        :title="item.title"
        :description="item.description"
        :is-done="item.isDone"
        @status-toggle="$emit('status-toggle', { index, item })"
        @content-click="$emit('content-click', { index, item })"
        @edit-click="$emit('edit-click', { index, item })"
        @delete-click="$emit('delete-click', { index, item })"
      />
    </template>
    <template v-else-if="!viewState.hasList && viewState.isEmpty">
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
    }
  },
  setup (props) {
    const viewState = computed(() => {
      const hasList = props.todoList && props.todoList.length
      const isEmpty = !hasList
      return { hasList, isEmpty }
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
  margin: 20px 0 0;
  height: 100%;
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
