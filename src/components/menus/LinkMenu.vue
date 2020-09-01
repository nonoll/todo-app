<template>
  <el-tooltip class="link-menu" :effect="tooltipEffect" :content="tooltipMessage" :placement="tooltipPlacement">
    <el-link class="link-menu__link" :icon="iconClassName" @click="$emit('click')">{{ text }}</el-link>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LinkMenu',
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
      default: 'el-icon-more-outline'
    },
    text: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.link-menu__link.is-underline:hover:after {
  display: none;
}
</style>
