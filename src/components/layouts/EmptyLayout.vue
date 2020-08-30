<template>
  <div class="layout is--empty">
    <div class="layout__body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  margin: 0 auto;
  max-width: $layout-max-width;
  width: 100%;
  flex-direction: column;
  flex: 1;

  &__body {
    display: flex;
    flex: 1;
    font-size: 14px;
  }
}
</style>
