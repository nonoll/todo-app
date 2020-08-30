<template>
  <div class="header">
    <div class="header__aside">
      <button class="aside__button">aside open</button>
      <button class="aside__button">홈</button>
    </div>
    <div class="header__search">
      <input type="text" class="search__input" />
      <button class="search__button">검색</button>
    </div>
    <div class="header__bside">
      <p>1/N DONE</p>
      <button class="bside__button">알림</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &__aside {
    border: 1px solid red;
  }

  &__search {
    display: flex;
    width: 70%;
    flex-direction: row;
    align-items: center;
    border: 1px solid green;
  }

  &__bside {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    line-height: 100%;
    border: 1px solid blue;
  }
}
</style>
