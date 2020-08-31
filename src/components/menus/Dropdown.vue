<template>
  <el-dropdown class="dropdown" :trigger.sync="trigger" @command="onCommand">
    <slot name="primary">
      <el-button class="dropdown-primary" type="primary">
        <i :class="iconClassName">{{ primaryLabel }}</i><i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </slot>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <el-dropdown-item class="dropdown-menu__item" v-for="(item, index) in menus" :key="index" :command="item">
          <i :class="iconClassName">{{ item.label }}</i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  name: 'Dropdown',
  props: {
    // @see https://element.eleme.io/?ref=madewithvuejs.com#/en-US/component/dropdown#dropdown-attributes
    trigger: {
      type: String,
      default: 'click',
      validator: (value: string) => {
        return ['click', 'hover'].includes(value)
      }
    },
    iconClassName: {
      type: String,
      default: 'el-icon-s-flag'
    },
    primaryLabel: {
      type: String,
      default: ''
    },
    menus: {
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
  setup (_, context: SetupContext) {
    const { emit } = context

    const onCommand = (item: unknown): void => {
      emit('change', item)
    }

    return {
      onCommand
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
