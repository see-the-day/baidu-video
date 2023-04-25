<template>
  <div class="flex w-200 flex-col border-l pl-20 pr-20">
    <template v-if="isShow && data && Object.keys(data).length">
      <div class="pt-20">
        <div class="mb-12 text-textWhite">位置</div>
        <span class="text-textWhite">x:</span>
        <n-input-number
          v-model:value="data.left"
          :precision="0"
          class="mb-12"
        ></n-input-number>
        <span class="text-textWhite">y:</span>
        <n-input-number
          v-model:value="data.top"
          :precision="0"
          class="mb-12"
        ></n-input-number>
      </div>
      <div>
        <span class="mb-12 text-textWhite">文案</span>
        <NInput v-model:value="data.text" :precision="0" class="mb-12"></NInput>
        <span class="mb-12 text-textWhite">颜色</span>
        <n-color-picker v-model:value="data.color" class="mb-12" />
        <span class="mb-12 text-textWhite">字号</span>
        <n-input-number
          v-model:value="data.fontSize"
          :precision="0"
          :min="12"
          :max="24"
          class="mb-12"
        ></n-input-number>
      </div>
      <n-button type="error" @click="deleteBox"> 删除 </n-button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { NButton, NInputNumber, NInput, NColorPicker } from 'naive-ui'
import { useState } from '@/store/videoState'
import { DATA_TEXT } from '@/type/index'

const state = useState()

const data = ref<DATA_TEXT | null>(null)

const index = computed(() =>
  state.boxIndex === 2 ? state.textIndex : state.imgIndex
)

let timeOut: ReturnType<typeof setTimeout>
const updateData = () => {
  clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    const gettersKey = state.boxIndex === 2 ? 'SET_TEXT' : 'SET_IMG'
    state[gettersKey](index.value, { ...(data.value || {}) })
  }, 300)
}

const deleteBox = () => {
  const gettersKey = state.boxIndex === 2 ? 'DELETE_TEXT' : 'DELETE_IMG'
  state[gettersKey]()
}

const isShow = computed(() => [2, 4].includes(state.boxIndex))
watch(
  data,
  () => {
    if (isShow.value) {
      updateData()
    }
  },
  { deep: true }
)
watch(
  () => state.data,
  () => {
    if (isShow.value) {
      const gettersKey = state.boxIndex === 2 ? 'getLayerText' : 'getLayerImg'
      if (
        JSON.stringify(state[gettersKey][index.value]) !==
        JSON.stringify(data.value)
      ) {
        data.value = { ...(state[gettersKey][index.value] || {}) }
      }
    }
  },
  { deep: true }
)
</script>
