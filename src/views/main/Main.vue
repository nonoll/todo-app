<template>
  <main-layout>
    <div class="main is--page">
      main
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default defineComponent({
  components: {
    MainLayout
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
</style>
