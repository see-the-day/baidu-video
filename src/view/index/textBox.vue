<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item
      v-for="(obj, index) of list"
      :key="index"
      class="flex h-70 cursor-pointer items-center justify-center border text-textWhite"
      @click="addText(obj)"
    >
      <span>默认</span>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const state = useState()
const addText = () => {
  state.ADD_TEXT()
}
</script>
