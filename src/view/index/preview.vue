<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <img
          class="h-16 w-16 cursor-pointer"
          src="@/assets/preview.png"
          @click="preview"
        />
      </template>
      预览
    </n-tooltip>
    <n-modal
      v-model:show="showModal"
      display-directive="if"
      @update:show="clearStatus"
    >
      <div class="border border-white bg-black p-20">
        <div class="relative">
          <video
            ref="previewVideo"
            :controls="false"
            class="w-460"
            preload="auto"
            muted
            :src="url"
          ></video>
          <layerList
            un-edit
            class="absolute bottom-0 left-0 right-0 top-0"
          ></layerList>
        </div>
        <div class="mt-12 flex">
          <img
            class="mr-12 h-16 w-16 cursor-pointer"
            :src="isPlay ? playPng : pausePng"
            @click="play"
          />
          <n-slider
            :tooltip="showTooltip"
            class="flex items-center"
            :value="currentTime"
            :max="state.temporary[state.currentIndex]?.timeEnd || 0"
            :step="0.1"
            :format-tooltip="formatTooltip"
            @update:value="updateValue"
          />
        </div>
      </div>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { NModal, NSlider, NTooltip } from 'naive-ui'
import { ref, computed, nextTick } from 'vue'
import { useState } from '@/store/videoState'
import layerList from './layerList.vue'
import playPng from '@/assets/play.png'
import pausePng from '@/assets/pause.png'

const state = useState()

const url = computed(() => state.temporary[state.currentIndex]?.url)

const formatTooltip = (value: number) => value.toFixed(1)

const isPlay = ref(false)
const previewVideo = ref<HTMLVideoElement>({} as HTMLVideoElement)
const play = () => {
  previewVideo.value[isPlay.value ? 'pause' : 'play']()
  isPlay.value = !isPlay.value
}

const currentTime = ref(0)
const getVideoCurrentTime = () => {
  previewVideo.value.addEventListener('timeupdate', () => {
    currentTime.value = previewVideo.value?.currentTime || 0
    const { timeEnd } = state.temporary[state.currentIndex]
    state.ADD_TIME(currentTime.value, timeEnd)
  })
}

let toolTimeoutFn: ReturnType<typeof setTimeout>
const showTooltip = ref(false)
const updateValue = (time: number) => {
  previewVideo.value.currentTime = time
  currentTime.value = time

  showTooltip.value = true
  clearTimeout(toolTimeoutFn)
  toolTimeoutFn = setTimeout(() => {
    showTooltip.value = false
  }, 1000)
}

const showModal = ref(false)
const preview = () => {
  showModal.value = true
  nextTick(getVideoCurrentTime)
}

const clearStatus = () => {
  isPlay.value = false
  currentTime.value = 0
}
</script>
