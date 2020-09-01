<template>
  <empty-layout>
    <div class="error is--page">
      <div class="error__title">페이지를 찾을 수 없습니다.</div>
      <div class="error__message">접속하신 경로가 유효하지 않거나, 일시적인 현상일 수 있습니다.<br />잠시 후 다시 시도해 주세요</div>
      <div class="error__actions">
        <button class="action" @click="onBack">뒤로가기</button>
        <button class="action" @click="onHome">메인으로</button>
      </div>
    </div>
  </empty-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import { useRouter } from '@/composables'

export default defineComponent({
  components: {
    EmptyLayout
  },
  setup () {
    const { router } = useRouter()

    const onBack = () => router.back()
    const onHome = () => router.replace('/')

    return { onBack, onHome }
  }
})
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__message {
    margin: 20px;
    text-align: center;
    word-break: break-all;
  }

  &__actions {
    margin-top: 20px;
    text-align: center;
    .action {
      display: inline-block;
      margin: 2px;
      padding: 8px 14px;
      font-size: 12px;
      color: #2a2a2a;
      cursor: pointer;
      border-radius: 4px;
      background-color: #e2e2e2;
    }
  }
}
</style>
