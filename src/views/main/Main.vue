<template>
  <main-layout>
    <div class="main is--page">
      <dropdown :primaryLabel="state.primaryLabel" :menus="state.dropdownMenus" @change="onChange" />
      <select-menu :selected="state.filterSelected" :tooltipMessage="state.filterMessage" :options="state.filterOptions" @change="onFilterChange" />
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import MainLayout from '@/components/layouts/MainLayout.vue'
import { Dropdown, SelectMenu } from '@/components/menus'

import { PRIORITYS, PriorityItem, FILTERS, FilterItem } from '@/constants'

export default defineComponent({
  components: {
    MainLayout,
    Dropdown,
    SelectMenu
  },
  setup () {
    const state = reactive({
      primaryLabel: PRIORITYS[3].label,
      dropdownMenus: [...PRIORITYS],
      filterMessage: '일감을 정렬합니다.',
      filterSelected: FILTERS[0].label,
      filterOptions: [...FILTERS]
    })

    const onChange = (item: PriorityItem): void => {
      console.log('onChange', item)
      state.primaryLabel = item.label
    }

    const onFilterChange = (item: FilterItem): void => {
      if (item.value) {
        const matched = state.filterOptions.find(option => option.value === item.value)
        if (matched) {
          state.filterSelected = matched.label
        }
      }
    }

    return {
      state,
      onChange,
      onFilterChange
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
}
</style>
