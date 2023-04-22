<template>
  <div class="flex h-full">
    <div class="h-full w-50 border-r">
      <div
        v-for="{ text, type, children } of menu"
        :key="type"
        class="h-50 cursor-pointer border-b text-center leading-50 text-textWhite"
        @click="upDateList(children)"
      >
        {{ text }}
      </div>
    </div>
    <div class="flex h-full w-240 flex-wrap border-r pt-12">
      <div
        v-for="{ type } of list"
        :key="type"
        class="ml-6 h-70 w-114 border"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const menu = [
  { text: '视频', type: 1, children: [{ type: 'add' }] },
  { text: '文字', type: 2, children: [] },
  { text: '字幕', type: 3, children: [] },
  { text: '贴图', type: 4, children: [] }
]

const list = ref([])
const upDateList = (children) => {
  list.value = children
}
</script>
