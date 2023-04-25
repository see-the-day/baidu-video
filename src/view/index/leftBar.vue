<template>
  <div class="flex h-full">
    <div class="h-full w-50 border-r">
      <div
        v-for="{ text, type } of menu"
        :key="type"
        :class="{ 'bg-bgSelect': type === currentType }"
        class="h-50 cursor-pointer border-b text-center leading-50 text-textWhite"
        @click="selectType(type)"
      >
        {{ text }}
      </div>
    </div>
    <div class="h-full w-240 border-r pl-4 pr-4 pt-12">
      <uploadVideo v-if="currentType === 1"></uploadVideo>
      <textBox
        v-else-if="currentType === 2"
        :list="menu[currentType - 1].children"
      ></textBox>
      <imgBox
        v-else-if="currentType === 4"
        :list="menu[currentType - 1].children"
      ></imgBox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import uploadVideo from './uploadVideo.vue'
import textBox from './textBox.vue'
import imgBox from './imgBox.vue'
import { useState } from '@/store/videoState'

const menu: {
  text: string
  type: 1 | 2 | 3 | 4
  children?: Record<string, string>[]
}[] = [
  { text: '视频', type: 1 },
  { text: '文字', type: 2 },
  { text: '字幕', type: 3 },
  { text: '贴图', type: 4 }
]

const state = useState()
const selectType = (type: 1 | 2 | 3 | 4) => {
  state.SET_CURRENT_BOX_INDEX(type)
}

const currentType = computed(() => state.boxIndex)
</script>
