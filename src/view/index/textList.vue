<template>
  <div>
    <div
      v-for="(li, index) of list"
      :key="index"
      class="absolute"
      :style="{ left: `${li.left}px`, bottom: `${li.bottom}px` }"
      @handleMouseDown="handleMouseDown($event)"
      @handleMouseUp="handleMouseUp($event)"
      @mousemove="mousemove($event)"
    >
      {{ li.text }}{{ li }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()

const list = computed(() => state.data[0]?.text || [])

const isMove = ref(false)

const handleMouseDown = () => {
  isMove.value = true
}
const handleMouseUp = () => {
  isMove.value = false
}
const mousemove = (e, index: number) => {
  if (isMove.value) {
    state.SET_TEXT(index, '', e.offsetX, e.offsetY)
  }
}
</script>
