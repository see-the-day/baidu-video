<template>
  <div>
    <n-slider
      v-for="(li, index) of list"
      :key="index"
      :max="state.temporary[0]?.timeEnd || 0"
      range
      :step="1"
    />
  </div>
</template>
<script lang="ts" setup>
import { NSlider } from 'naive-ui'
import { ref, watch, computed } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()
watch(
  () => state.data,
  () => {
    console.log(state.data)
  },
  { deep: true }
)

const list = computed(() => state.data[0]?.text || [])
const value = ref([0, state.temporary[0]?.timeEnd || 0])
</script>
