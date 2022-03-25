<template>
  <div class="w-full h-full flex justify-center items-center flex-col min-h-200">
    <img src="@/assets/noData/no-data.png" class="w-120 h-100">
    <div class="text-gray-200 mt-12">
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
