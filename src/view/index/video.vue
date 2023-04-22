<template>
  <div class="flex h-0 flex-1 items-center justify-center">
    <video
      ref="myVideo"
      :controls="false"
      class="w-460"
      preload="auto"
      muted
      src="./100_1682178438.mp4"
    ></video>
  </div>
  <div class="flex h-16 justify-center border-t text-textWhite" @click="play">
    {{ isPlay ? '暂停' : '播放' }}
  </div>
  {{ timeEnd }}
  <div class="relative h-244 w-full border-t">
    <timeLine v-model="currentTime" :time="timeEnd"></timeLine>
    <div
      class="absolute bottom-0 top-0 w-1 cursor-move bg-white"
      :style="{ left: `${(currentTime * 100) / timeEnd}%` }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import timeLine from './timeLine.vue'

const myVideo = ref(null)

const timeEnd = ref(0)
const getVideoDate = () => {
  myVideo.value.addEventListener('loadedmetadata', () => {
    // myVideo.value.currentTime = 10
    const { duration } = myVideo.value // 获取当前播放时间

    // 如果当前传入时间为0，则默认当前视频时间
    if (!timeEnd.value) {
      timeEnd.value = duration
    }
  })
}

const currentTime = ref(0)
const getVideoCurrentTime = () => {
  myVideo.value.addEventListener('timeupdate', () => {
    currentTime.value = myVideo.value.currentTime
  })
}
onMounted(() => {
  getVideoDate()
  getVideoCurrentTime()
})

const isPlay = ref(false)
const play = () => {
  myVideo.value[isPlay.value ? 'pause' : 'play']()
  isPlay.value = !isPlay.value
}
</script>
