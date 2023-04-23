<template>
  <div>
    <div
      v-for="(li, index) of list"
      v-show="
        currentTime > Number(li?.startTime) && currentTime < Number(li?.endTime)
      "
      :key="index"
      class="absolute"
      :style="{ left: `${li.left}px`, bottom: `${li.bottom}px` }"
      @handleMouseDown="handleMouseDown()"
      @handleMouseUp="handleMouseUp()"
      @mousemove="mousemove($event, index)"
    >
      {{ li.text }}{{ li }}{{ currentTime }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useState } from '@/store/videoState'

defineProps({
  currentTime: {
    type: Number,
    default: 0
  }
})
const state = useState()

const list = computed(() => state.data[0]?.text || [])

const isMove = ref(false)

const handleMouseDown = () => {
  isMove.value = true
}
const handleMouseUp = () => {
  isMove.value = false
}
const mousemove = (e: { offsetX: number; offsetY: number }, index: number) => {
  if (isMove.value) {
    state.SET_TEXT(index, { left: e.offsetX, bottom: e.offsetY })
  }
}
</script>
