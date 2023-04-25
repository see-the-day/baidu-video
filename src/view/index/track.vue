<template>
  <div>
    <n-slider
      v-for="(li, index) of state.getLayerText"
      :key="index"
      :value="getValue(index, 'text')"
      :max="state.temporary[state.currentIndex]?.timeEnd || 0"
      range
      :step="1"
      @update:value="updateValue($event, index, 'text')"
    />
    <n-slider
      v-for="(li, index) of state.getLayerImg"
      :key="index"
      :value="getValue(index, 'img')"
      :max="state.temporary[state.currentIndex]?.timeEnd || 0"
      range
      :step="1"
      @update:value="updateValue($event, index, 'img')"
    />
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
