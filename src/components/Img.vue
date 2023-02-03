<template>
  <NImage
    :src="src || imgSrc"
    :img-props="{ class: defaultClass }"
    :fallback-src="fallback"
    :preview-disabled="true"
    object-fit="cover"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { NImage } from 'naive-ui'
import imgSrc from '@/assets/noData/details-no-img.png'
import fallback from '@/assets/noData/image-error.png'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})

const defaultClass = computed(() => props.class)
</script>
