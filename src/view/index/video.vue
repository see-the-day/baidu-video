<template>
  <div class="flex h-0 flex-1 items-center justify-center">
    <div class="relative">
      <video
        ref="myVideo"
        :controls="false"
        class="w-460"
        preload="auto"
        muted
        :src="url"
      ></video>
      <textList
        :current-time="currentTime"
        class="absolute bottom-0 left-0 right-0 top-0"
      ></textList>
    </div>
  </div>
  <div class="flex justify-center border-t pb-6 pt-6">
    <img class="h-16 w-16" :src="isPlay ? pausePng : playPng" @click="play" />
    <img class="ml-12 h-16 w-16" src="@/assets/cutting.png" @click="cutting" />
  </div>
  <div class="relative h-244 w-full border-t">
    <timeLine v-model="currentTime" :time="timeEnd"></timeLine>
    <trackVue></trackVue>
    <div
      class="absolute bottom-0 top-0 w-1 cursor-move bg-white"
      :style="{ left: `${(currentTime * 100) / timeEnd}%` }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import timeLine from './timeLine.vue'
import { useState } from '@/store/videoState'
import playPng from '@/assets/play.png'
import pausePng from '@/assets/pause.png'
import video from './100_1682178438.mp4'
import textList from './textList.vue'
import trackVue from './track.vue'

const myVideo = ref<HTMLVideoElement>({} as HTMLVideoElement)

const state = useState()
// 第一帧转成图片
const getFirstImg = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  myVideo.value?.addEventListener('canplay', () => {
    canvas.width = myVideo.value.videoWidth
    canvas.height = myVideo.value.videoHeight
    ctx?.drawImage(myVideo.value, 0, 0, canvas.width, canvas.height)
    const imgBase64 = canvas.toDataURL('image/png')
    state.UPDATE_VIDEO_URL(imgBase64)
  })
}

// 文件加载完成获取总时间
const timeEnd = ref(0)
const getVideoDate = () => {
  myVideo.value.addEventListener('loadedmetadata', () => {
    // myVideo.value.currentTime = 10
    const { duration } = myVideo.value // 获取当前播放时间
    myVideo.value.currentTime = 0
    myVideo.value.pause()

    getFirstImg()
    // 如果当前传入时间为0，则默认当前视频时间
    if (!timeEnd.value) {
      timeEnd.value = duration
      state.ADD_TIME(0, Math.ceil(duration))
    }
  })
}

const currentTime = ref(0)
const getVideoCurrentTime = () => {
  myVideo.value.addEventListener('timeupdate', () => {
    currentTime.value = myVideo.value.currentTime
    state.ADD_TIME(currentTime.value, Math.ceil(timeEnd.value))
  })
}

const url = computed(() => state.temporary[0]?.url || video)
onMounted(() => {
  getVideoDate()
  getVideoCurrentTime()
})

watch(url, () => {
  getVideoDate()
  getVideoCurrentTime()
})

const isPlay = ref(false)
const play = () => {
  myVideo.value[isPlay.value ? 'pause' : 'play']()
  isPlay.value = !isPlay.value
}

const cutting = () => {}
</script>
