<template>
  <div class="h-full flex flex-col justify-center items-center bg-white">
    <img :src="isNetwork ? noData : noOnLine" class="w-120 h-100">
    <span class="text-gray-200">{{ isNetwork ? '页面加载失败' : '无法连接到网络' }}</span>
  </div>
</template>
<script lang="ts" setup>
import noData from '@/assets/noData/404.png'
import noOnLine from '@/assets/noData/notOnLine.png'

const isNetwork = navigator.onLine
</script>
