<template>
  <div
    class="flex h-full min-h-200 w-full flex-col items-center justify-center"
  >
    <img src="@/assets/noData/no-data.png" class="h-100 w-120" />
    <div class="mt-12 text-gray-200">
      {{ emptyText }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  emptyText: {
    type: String,
    default: '暂无数据'
  }
})
</script>
