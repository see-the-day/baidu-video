<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item
      v-for="({ img, text }, index) of list"
      :key="index"
      class="flex h-70 cursor-pointer items-center justify-center border text-textWhite"
      @click="addImg(img)"
    >
      <span>{{ text }}</span>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'
import vueImg from '@/assets/map-img/logo.svg'
import xiaomai from '@/assets/map-img/xiaomai.gif'
import xiaoxiong from '@/assets/map-img/xiaoxiong.gif'

const list = [
  { text: '默认', img: vueImg },
  { text: '小埋', img: xiaomai },
  { text: '小熊', img: xiaoxiong }
]

const state = useState()
const addImg = (img: string) => {
  state.ADD_IMG(img)
}
</script>
