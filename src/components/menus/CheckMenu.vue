<template>
  <el-tooltip class="check-menu" :effect="tooltipEffect" :content="tooltipMessage" :placement="tooltipPlacement">
    <el-checkbox-button class="check-menu__button" :value="checked" @change="onChange($event)">
      <i :class="iconClassName"><span class="blind">{{ blind }}</span></i>
    </el-checkbox-button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  name: 'CheckMenu',
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
    iconClassName: {
      type: String,
      default: 'el-icon-chat-line-square'
    },
    blind: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    payload: {
      type: [String, Boolean, Number, Object],
      default: ''
    }
  },
  setup (props, context: SetupContext) {
    const { emit } = context

    const onChange = (checked: boolean): void => {
      const payload = { ...props.payload }
      emit('change', { payload, checked })
    }

    return {
      onChange
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
</style>
