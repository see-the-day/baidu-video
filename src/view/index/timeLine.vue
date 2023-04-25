<template>
  <div class="flex justify-between text-textWhite">
    <div
      v-for="scale of timeEnd"
      :key="scale"
      class="w-1 bg-white text-12"
      :class="(scale - 1) % 10 ? 'h-8' : 'h-16'"
    >
      {{ (scale - 1) % 10 ? '' : `${scale - 1}s` }}
    </div>
    <div
      class="absolute bottom-0 top-0 w-1 cursor-move bg-white"
      :style="{ left: `${(currentTime * 100) / timeEnd}%` }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, withDefaults, watch } from 'vue'
import { useState } from '@/store/videoState'

const props = withDefaults(defineProps<{ modelValue: number }>(), {
  modelValue: 0
})
const state = useState()
const currentTime = ref(0)
const timeEnd = ref(0)
watch(
  () => [state.data, props],
  () => {
    currentTime.value = props.modelValue - state.getStartTime
    timeEnd.value = Math.ceil(state.getEndTime - state.getStartTime)
  },
  { deep: true }
)
</script>
