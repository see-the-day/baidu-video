<template>
  <div class="track">
    <div
      v-for="(li, index) of state.getLayerSubtitle"
      :key="index"
      class="ml-4 mr-4 mt-12 text-textWhite"
    >
      <!-- {{ li }} -->
      <div class="relative flex w-full">
        <div
          v-for="({ startTime, endTime, text }, index) of li.data"
          :key="index"
          class="absolute overflow-hidden whitespace-nowrap"
          :style="{
            left: `${(startTime / state.getEndTime) * 100}%`,
            width: `${((endTime - startTime) * 100) / state.getEndTime}%`
          }"
          :class="{
            'z-10 border border-primary bg-black text-selectColor':
              subTitle === index
          }"
          @click="getCurrentIndex(index)"
        >
          {{ text }}
        </div>
      </div>
      <n-slider
        class="mt-30"
        :value="getCurrentSubtitle"
        :max="state.temporary[state.currentIndex]?.timeEnd || 0"
        range
        :step="0.1"
        @update:value="updateValue($event, subTitle, 'subtitle')"
      />
    </div>
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
import { ref, computed } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()

const updateValue = (
  valueList: number[],
  index: number,
  type: 'text' | 'img' | 'subtitle'
) => {
  const typeMap: Record<
    'text' | 'img' | 'subtitle',
    'SET_TEXT' | 'SET_IMG' | 'SET_SUBTITLE_TIME'
  > = {
    text: 'SET_TEXT',
    img: 'SET_IMG',
    subtitle: 'SET_SUBTITLE_TIME'
  }
  state[typeMap[type]](index, {
    startTime: Math.min(...valueList),
    endTime: Math.max(...valueList)
  })
}

const getValue = (index: number, type: 'text' | 'img'): number[] => {
  const { startTime, endTime } = state.data[state.currentIndex][type][index]
  return [startTime || 0, endTime || 0] as number[]
}

const subTitle = ref(0)
const getCurrentIndex = (index: number) => {
  subTitle.value = index
}
const getCurrentSubtitle = computed(() => {
  const { startTime, endTime } =
    state.getLayerSubtitle[state.subtitleIndex].data[subTitle.value]
  return [startTime || 0, endTime || 0] as number[]
})
</script>
<style lang="scss" scoped>
.track {
  :deep(.n-slider-rail) {
    background: #000 !important;
  }
  :deep(.n-slider-handle) {
    width: 8px !important;
    height: 12px !important;
    border-radius: 8px !important;
  }
}
</style>
