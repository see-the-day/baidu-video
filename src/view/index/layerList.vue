<template>
  <div>
    <div
      v-for="(li, index) of list"
      v-show="
        currentTime >= Number(li?.startTime) &&
        currentTime <= Number(li?.endTime)
      "
      :key="index"
      class="absolute p-4"
      :class="{ 'border border-primary': isBorder(li.type, index) }"
      :style="{ left: `${li.left}px`, top: `${li.top}px` }"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @mouseleave="mouseover"
      @mousemove="mousemove($event, index, li.type)"
      @click="currentEditElement(index, li.type)"
    >
      <span
        v-if="li.type === 'text'"
        :style="`color: ${li.color}; font-size: ${li.fontSize}px`"
      >
        {{ li.text }}
      </span>
      <img
        v-if="li.type === 'img'"
        :style="`transform: rotate(${li.rotation}deg) scale(${li.scale})`"
        class="h-36 w-36"
        :src="li.img"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()

const currentTime = computed(() => state.getCurrentTime - state.getStartTime)

const isBorder = computed(() => (type: 'text' | 'img', index: number) => {
  if (state.boxIndex === 4 && type === 'img' && state.imgIndex === index) {
    return true
  }
  if (state.boxIndex === 2 && type === 'text' && state.textIndex === index) {
    return true
  }
  return false
})

const currentEditElement = (index: number, type: 'text' | 'img') => {
  const indexKey = type === 'text' ? 'SET_TEXT_INDEX' : 'SET_IMG_INDEX'
  state[indexKey](index)
}
const list = computed(() => {
  const listMap: Record<string, any>[] = []
  state.getLayerText.forEach((obj) => {
    listMap.push({ ...obj, type: 'text' })
  })
  state.getLayerImg.forEach((obj) => {
    listMap.push({ ...obj, type: 'img' })
  })
  return listMap
})

const isMove = ref(false)
const mouseover = () => {
  isMove.value = false
}
function pauseEvent(e: any) {
  // 已做兼容性处理
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  e.cancelBubble = true
  e.returnValue = false
  return false
}
let client = { clientX: 0, clientY: 0 }
const handleMouseDown = (e: { clientX: number; clientY: number }) => {
  client = { clientX: e.clientX, clientY: e.clientY }
  pauseEvent(e)
  isMove.value = true
}
const handleMouseUp = () => {
  isMove.value = false
}
const mousemove = (
  e: { clientX: number; clientY: number },
  index: number,
  type: 'text' | 'img'
) => {
  const x = e.clientX - client.clientX
  const y = e.clientY - client.clientY
  client = { clientX: e.clientX, clientY: e.clientY }

  if (isMove.value) {
    const stateType = type === 'text' ? 'SET_TEXT' : 'SET_IMG'
    const stateKey = type === 'text' ? 'text' : 'img'
    const left =
      x +
      ((state.data[state.currentIndex][stateKey][index]?.left || 0) as number)
    const top =
      y +
      ((state.data[state.currentIndex][stateKey][index]?.top || 0) as number)
    state[stateType](index, {
      left: left > 0 ? left : 0,
      top: top > 0 ? top : 0
    })
  }
}
</script>
