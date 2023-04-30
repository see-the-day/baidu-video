<template>
  <div class="flex h-full w-full justify-between bg-black">
    <LeftBar></LeftBar>
    <div class="w-0 flex flex-1 flex-col">
      <Video></Video>
    </div>
    <RightBar></RightBar>
  </div>
</template>
<script lang="ts" setup>
import { watch, onMounted, nextTick } from 'vue'
import LeftBar from './leftBar.vue'
import RightBar from './rightBar.vue'
import Video from './video.vue'
import { useState } from '@/store/videoState'

const state = useState()
let timeOut: ReturnType<typeof setTimeout>
let catchStatus = true
watch(
  () => [
    state.data,
    state.currentIndex,
    state.boxIndex,
    state.textIndex,
    state.imgIndex,
    state.subtitleIndex
  ],
  () => {
    clearTimeout(timeOut)
    if (catchStatus) {
      timeOut = setTimeout(() => {
        state.ADD_STATUS_MAP()
      }, 100)
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  document.onkeydown = (event) => {
    if (event.code === 'KeyZ') {
      catchStatus = false
      state.CANCEL_STATUS_MAP()
      nextTick(() => {
        catchStatus = true
      })
    }
  }
})
</script>
