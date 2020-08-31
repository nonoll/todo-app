<template>
  <div class="layout is--main">
    <!--
    <div class="layout__header">
      <main-header />
    </div>
     -->
    <div class="layout__body">
      <slot></slot>
    </div>
    <div class="layout__footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MainHeader from '@/components/layouts/headers/MainHeader.vue'

export default defineComponent({
  components: {
    MainHeader
  },
  setup () {
    return { }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  margin: 0 auto;
  max-width: $layout-max-width;
  width: 100%;
  flex-direction: column;
  flex: 1;

  &__header {
    height: 44px;
  }

  &__body {
    display: flex;
    flex: 1;
    margin-top: 10px;
    font-size: 14px;
  }

  &__footer  {
    padding-bottom: 56px;
  }
}
</style>
