<template>
  <component :is="element" class="button" :class="classes" @click="onClick">
    <template v-if="iconSrc">
      <slot name="icon">
        <img class="icon" :src="iconSrc" alt="" />
      </slot>
    </template>
    <span class="aside">
      <slot></slot>
    </span>
    <span v-if="hasSlots.bside" class="bside">
      <slot name="bside"></slot>
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from '@vue/composition-api'

export default defineComponent({
  name: 'TempButton',
  props: {
    iconSrc: {
      type: String,
      default: ''
    },
    element: {
      type: String,
      default: 'button'
    },
    disableClickable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context: SetupContext) {
    const { emit } = context

    const hasSlots = computed(() => {
      const { slots } = context
      return {
        bside: !!slots.bside
      }
    })

    const classes = computed(() => {
      return {
        'disable-clickable': props.disableClickable
      }
    })

    const onClick = () => emit('click')

    return {
      classes,
      hasSlots,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  padding: 18px 0 19px 0;
  width: 100%;
  font-size: 18px;
  color: #1a1a1a;
  text-align: left;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  > .icon {
    display: block;
    margin-right: 8px;
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
  > .aside {
    flex: 1;
  }

  &.disable-clickable {
    cursor: default;
  }
}
</style>
