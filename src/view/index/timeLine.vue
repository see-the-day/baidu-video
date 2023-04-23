<template>
  <div class="relative flex justify-between text-textWhite">
    <div
      v-for="scale of timeEnd"
      :key="scale"
      class="w-1 bg-white text-12"
      :class="scale % 10 ? 'h-8' : 'h-16'"
    >
      {{ scale % 10 ? '' : `${scale}s` }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, withDefaults } from 'vue'

const props = withDefaults(defineProps<{ time: number }>(), {
  time: 0
})

const timeEnd = computed(() => Math.ceil(props.time))
</script>
