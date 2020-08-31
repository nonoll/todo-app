<template>
  <el-tooltip class="select-menu" :effect="tooltipEffect" :content="tooltipMessage" :placement="tooltipPlacement">
    <el-select class="select-menu__select" :value.sync="selected" :placeholder="placeholder" @change="onChange">
      <el-option class="select-menu__option"
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  name: 'SelectMenu',
  props: {
    tooltipEffect: {
      type: String,
      default: 'dark',
      validator: (value: string) => {
        return ['dark', 'light'].includes(value)
      }
    },
    tooltipMessage: {
      type: String,
      default: ''
    },
    tooltipPlacement: {
      type: String,
      default: 'top-start',
      validator: (value: string) => {
        const acceptedValues = 'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end'.split('/')
        return acceptedValues.includes(value)
      }
    },
    placeholder: {
      type: String,
      default: 'Select...'
    },
    selected: {
      type: [String, Number, Object],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    options: {
      type: Array,
      default: () => [],
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
  },
  setup (props, context: SetupContext) {
    const { emit } = context

    const onChange = (item: unknown): void => {
      emit('change', item)
    }

    return {
      onChange
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
