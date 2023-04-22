<template>
  <div class="flex h-full w-full justify-between bg-black">
    <LeftBar></LeftBar>
    <div class="flex flex-1 flex-col">
      <Video></Video>
    </div>
    <RightBar></RightBar>
  </div>
</template>
<script lang="ts" setup>
import LeftBar from './leftBar.vue'
import RightBar from './rightBar.vue'
import Video from './video.vue'
</script>
