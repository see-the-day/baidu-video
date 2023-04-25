<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item
      v-for="({ img }, index) of list"
      :key="index"
      class="flex h-70 cursor-pointer items-center justify-center border text-textWhite"
      @click="addImg(img)"
    >
      <span>默认</span>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'
import vueImg from '@/assets/map-img/logo.svg'

const list = [{ img: vueImg }]

const state = useState()
const addImg = (img: string) => {
  state.ADD_IMG(img)
}
</script>
