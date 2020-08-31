<template>
  <div class="todo-info">
    <el-tooltip effect="dark" content="일감을 추가합니다." placement="top-start">
      <el-button icon="el-icon-edit" circle @click="$emit('add-todo')"></el-button>
    </el-tooltip>
    <div class="todo-info__title">{{ title }}</div>
    <el-tooltip effect="dark" content="일감을 정렬합니다." placement="top-start">
      <el-select :value.sync="filter" placeholder="Select" @change="$emit('filter-change', $event)">
        <el-option
          v-for="item in filterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TodoItem',
  props: {
    title: {
      type: String,
      required: true
    },
    filter: {
      type: String,
      required: true
    },
    filterOptions: {
      type: Array,
      required: true,
      validator: (value: unknown[]) => {
        if (!Array.isArray(value)) {
          return false
        }

        if (!value.length) {
          return true
        } else {
          return value.every(v => v.label && v.value)
        }
      }
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
</style>
