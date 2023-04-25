<template>
  <div class="flex h-full w-full justify-between bg-black">
    <LeftBar></LeftBar>
    <div class="flex flex-1 flex-col">
      <Video></Video>
    </div>
    <RightBar></RightBar>
  </div>
</template>
<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import LeftBar from './leftBar.vue'
import RightBar from './rightBar.vue'
import Video from './video.vue'
import { useState } from '@/store/videoState'

const state = useState()
let timeOut: ReturnType<typeof setTimeout>
watch(
  () => [
    state.data,
    state.temporary,
    state.currentIndex,
    state.boxIndex,
    state.textIndex,
    state.imgIndex
  ],
  () => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      state.ADD_STATUS_MAP()
    }, 100)
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  document.onkeydown = (event) => {
    if (event.code === 'KeyZ') {
      state.CANCEL_STATUS_MAP()
    }
  }
})
</script>
