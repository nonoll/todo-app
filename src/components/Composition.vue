<template>
  <div class="composition">
    component - composition
    <button @click="onClick">click - {{ state.count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const state = reactive({
      count: 0
    })

    const onClick = () => state.count++

    return {
      state,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.composition {
  position: relative;
  background: blue;
}
</style>
