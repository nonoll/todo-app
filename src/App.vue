<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { provideRouter } from '@/composables'

export default defineComponent({
  setup (_, context) {
    provideRouter(context)

    return {}
  }
})
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
