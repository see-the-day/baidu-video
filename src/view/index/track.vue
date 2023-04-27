<template>
  <div class="track">
    <div
      v-for="(li, index) of state.getLayerText"
      :key="index"
      class="ml-4 mr-4 mt-12 flex items-center"
    >
      <img src="@/assets/text.png" class="mr-4 h-16 w-16" />
      <n-slider
        :value="getValue(index, 'text')"
        :max="state.temporary[state.currentIndex]?.timeEnd || 0"
        range
        :step="0.1"
        @update:value="updateValue($event, index, 'text')"
      />
    </div>
    <div
      v-for="(li, index) of state.getLayerImg"
      :key="index"
      class="ml-4 mr-4 mt-12 flex items-center"
    >
      <img src="@/assets/img.png" class="mr-4 h-16 w-16" />
      <n-slider
        :value="getValue(index, 'img')"
        :max="state.temporary[state.currentIndex]?.timeEnd || 0"
        range
        :step="0.1"
        @update:value="updateValue($event, index, 'img')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NSlider } from 'naive-ui'
import { useState } from '@/store/videoState'

const state = useState()

const updateValue = (
  valueList: number[],
  index: number,
  type: 'text' | 'img'
) => {
  const stateType = type === 'text' ? 'SET_TEXT' : 'SET_IMG'

  state[stateType](index, {
    startTime: valueList[0] > valueList[1] ? valueList[1] : valueList[0],
    endTime: valueList[0] > valueList[1] ? valueList[0] : valueList[1]
  })
}

const getValue = (index: number, type: 'text' | 'img'): number[] => {
  const { startTime, endTime } = state.data[state.currentIndex][type][index]
  return [startTime || 0, endTime || 0] as number[]
}
</script>
<style lang="scss" scoped>
.track {
  :deep(.n-slider-handle) {
    width: 8px !important;
    height: 12px !important;
    border-radius: 8px !important;
  }
}
</style>
