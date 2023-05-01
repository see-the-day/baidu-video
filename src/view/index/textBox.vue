<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item
      v-for="({ text, type }, index) of list"
      :key="index"
      class="flex h-70 cursor-pointer items-center justify-center border text-textWhite"
      @click="addText(type)"
    >
      <div :class="typeTextStyle(type)">
        <span>{{ text }}</span>
      </div>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'
import { typeTextStyle } from '@/util'
import { TEXT_TYPE } from '@/type/index'

const list: { text: string; type: TEXT_TYPE }[] = [
  { text: '默认', type: 0 },
  { text: '元气', type: 1 }
]

const state = useState()
const addText = (type: TEXT_TYPE) => {
  state.ADD_TEXT(type)
}
</script>
