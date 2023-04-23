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
      <textBox v-else :list="menu[currentType - 1].children"></textBox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import uploadVideo from './uploadVideo.vue'
import textBox from './textBox.vue'

const menu: {
  text: string
  type: 1 | 2 | 3 | 4
  children?: Record<string, string>[]
}[] = [
  { text: '视频', type: 1 },
  { text: '文字', type: 2, children: [{}] },
  { text: '字幕', type: 3 },
  { text: '贴图', type: 4 }
]

const currentType = ref(1)
const selectType = (type: 1 | 2 | 3 | 4) => {
  currentType.value = type
}
</script>
