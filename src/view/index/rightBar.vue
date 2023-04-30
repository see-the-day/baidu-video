<template>
  <div class="flex w-200 flex-col border-l pl-20 pr-20">
    <template v-if="isShow && data && Object.keys(data).length">
      <div class="pt-20">
        <div class="mb-12 text-textWhite">位置</div>
        <span class="text-textWhite">x:</span>
        <n-input-number
          v-model:value="data.left"
          :precision="2"
          class="mb-12"
        ></n-input-number>
        <span class="text-textWhite">y:</span>
        <n-input-number
          v-model:value="data.top"
          :precision="2"
          class="mb-12"
        ></n-input-number>
      </div>
      <div v-if="[2, 3].includes(state.boxIndex)">
        <span class="mb-12 text-textWhite">
          {{ state.boxIndex === 2 ? '文案' : '字幕名' }}
        </span>
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
      <div v-if="state.boxIndex === 4">
        <span class="mb-12 text-textWhite">放大</span>
        <NInput
          v-model:value="data.scale"
          :precision="0.1"
          class="mb-12"
        ></NInput>
        <span class="mb-12 text-textWhite">旋转</span>
        <n-input-number
          v-model:value="data.rotation"
          :precision="0"
          :min="0"
          :max="360"
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
import { DATA_TEXT, DATA_IMG } from '@/type/index'

const state = useState()

const data = ref<(DATA_TEXT & DATA_IMG) | null>(null)

const index = computed(() => {
  if (state.boxIndex === 2) {
    return state.textIndex
  }
  if (state.boxIndex === 3) {
    return state.subtitleIndex
  }
  return state.imgIndex
})

let timeOut: ReturnType<typeof setTimeout>
const updateData = () => {
  clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    const map: Record<2 | 3 | 4, 'SET_TEXT' | 'SET_IMG' | 'SET_SUBTITLE'> = {
      2: 'SET_TEXT',
      3: 'SET_SUBTITLE',
      4: 'SET_IMG'
    }
    const gettersKey = map[state.boxIndex as 2 | 3 | 4]
    state[gettersKey](index.value, { ...(data.value || {}) })
  }, 300)
}

const deleteBox = () => {
  const map: Record<
    2 | 3 | 4,
    'DELETE_TEXT' | 'DELETE_SUBTITLE' | 'DELETE_IMG'
  > = {
    2: 'DELETE_TEXT',
    3: 'DELETE_SUBTITLE',
    4: 'DELETE_IMG'
  }
  state[map[state.boxIndex as 2 | 3 | 4]]()
}

const isShow = computed(() => [2, 3, 4].includes(state.boxIndex))
watch(
  data,
  () => {
    if (isShow.value && data.value && Object.keys(data.value).length) {
      updateData()
    }
  },
  { deep: true }
)
watch(
  () => [
    state.data,
    state.boxIndex,
    state.subtitleIndex,
    state.imgIndex,
    state.textIndex
  ],
  () => {
    if (isShow.value) {
      const map: Record<
        2 | 3 | 4,
        'getLayerText' | 'getLayerImg' | 'getLayerSubtitle'
      > = {
        2: 'getLayerText',
        3: 'getLayerSubtitle',
        4: 'getLayerImg'
      }
      if (
        JSON.stringify(state[map[state.boxIndex as 2 | 3 | 4]][index.value]) !==
        JSON.stringify(data.value)
      ) {
        data.value = {
          ...(state[map[state.boxIndex as 2 | 3 | 4]][index.value] || {})
        } as any
      }
    }
  },
  { deep: true }
)
</script>
