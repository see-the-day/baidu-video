<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item
      v-for="({ text }, index) of list"
      :key="index"
      class="flex h-70 cursor-pointer items-center justify-center border text-textWhite"
      @click="addText"
    >
      <span>{{ text }}</span>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'

const list = [
  {
    text: '默认'
  }
]

const state = useState()
const addText = () => {
  state.ADD_TEXT()
}
</script>
