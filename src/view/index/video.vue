<template>
  <div class="flex h-0 min-h-200 flex-1 items-center justify-center">
    <div class="relative">
      <video
        ref="myVideo"
        :controls="false"
        class="w-460"
        preload="auto"
        muted
        :src="url"
      ></video>
      <layerList class="absolute bottom-0 left-0 right-0 top-0"></layerList>
    </div>
  </div>
  <div class="flex justify-center border-t pb-6 pt-6">
    <img
      class="h-16 w-16 cursor-pointer"
      :src="isPlay ? playPng : pausePng"
      @click="play"
    />
    <img
      class="ml-12 h-16 w-16 cursor-pointer"
      src="@/assets/cutting.png"
      @click="cutting"
    />
    <exportVue></exportVue>
  </div>
  <div class="relative h-244 w-full border-t">
    <timeLine v-model="currentTime"></timeLine>
    <trackVue></trackVue>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import timeLine from './timeLine.vue'
import { useState } from '@/store/videoState'
import playPng from '@/assets/play.png'
import pausePng from '@/assets/pause.png'
import layerList from './layerList.vue'
import trackVue from './track.vue'
import exportVue from './export.vue'

const myVideo = ref<HTMLVideoElement>({} as HTMLVideoElement)

const state = useState()
// 当前帧转成图片
const getFirstImg = (startTime: number = 0) => {
  myVideo.value.currentTime = startTime
  myVideo.value.pause()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  myVideo.value?.addEventListener('canplay', () => {
    canvas.width = myVideo.value.videoWidth
    canvas.height = myVideo.value.videoHeight
    ctx?.drawImage(myVideo.value, 0, 0, canvas.width, canvas.height)
    const imgBase64 = canvas.toDataURL('image/png')
    state.STE_VIDEO_URL(imgBase64)
  })
}

// 文件加载完成获取总时间
const timeEnd = ref(0)
const getVideoDate = () => {
  myVideo.value.addEventListener('loadedmetadata', () => {
    const { duration } = myVideo.value // 获取当前播放时间

    getFirstImg()

    // 如果当前传入时间为0，则默认当前视频时间
    if (!timeEnd.value) {
      timeEnd.value = duration
      state.ADD_TIME(0, Math.ceil(duration))
    }
  })
}

const isPlay = ref(false)
const play = () => {
  myVideo.value[isPlay.value ? 'pause' : 'play']()
  isPlay.value = !isPlay.value
}

const startTime = computed(() => state.getStartTime)
const endTime = computed(() => state.getEndTime)
const currentTime = ref(0)
const getVideoCurrentTime = () => {
  myVideo.value.addEventListener('timeupdate', () => {
    currentTime.value = myVideo.value.currentTime
    state.ADD_TIME(currentTime.value, Math.ceil(timeEnd.value))
    if (currentTime.value >= endTime.value) {
      currentTime.value = startTime.value
      myVideo.value.currentTime = startTime.value
      play()
    }
  })
}

const url = computed(() => state.temporary[state.currentIndex]?.url)

watch(
  () => state.currentIndex,
  () => {
    myVideo.value.currentTime = startTime.value
  }
)
watch(url, () => {
  getVideoDate()
  getVideoCurrentTime()
})

const cutting = () => {
  state.PARTITION_CHANGE()
  const { videoFile } = state.data[state.currentIndex]
  const { url } = state.temporary[state.currentIndex]
  state.SET_VIDEO(url, videoFile, currentTime.value, timeEnd.value)
  getFirstImg(currentTime.value)
  play()
}
</script>
