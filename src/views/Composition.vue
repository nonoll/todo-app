<template>
  <div class="composition">
    <composition />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Composition from '@/components/Composition.vue'

export default defineComponent({
  components: {
    Composition
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.composition {
  position: relative;
  background: #ededed;
}
</style>
