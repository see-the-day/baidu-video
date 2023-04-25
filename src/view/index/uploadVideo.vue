<template>
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-grid-item>
      <n-upload
        class="h-70 border"
        :show-file-list="false"
        :default-upload="false"
        @change="finish"
      >
        <div class="flex h-70 cursor-pointer items-center justify-center">
          <img src="@/assets/upload.png" class="h-24 w-20" />
        </div>
      </n-upload>
    </n-grid-item>
    <n-grid-item
      v-for="({ firstImage }, index) of list"
      :key="firstImage"
      class="h-70 border p-4"
      :class="{ 'border-primary': index === state.currentIndex }"
      @click="selectImage(index)"
    >
      <img :src="firstImage" class="h-full w-full" />
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { NUpload, UploadFileInfo, NGrid, NGridItem } from 'naive-ui'
import { useState } from '@/store/videoState'

const state = useState()
const finish = (file: { file: UploadFileInfo }) => {
  if (file?.file?.type !== 'video/mp4') {
    window.$message.error('请上传MP4格式文件')
    return
  }
  const url = window.webkitURL.createObjectURL(file.file.file as File)
  const fileElement = new Audio(url)
  fileElement.addEventListener('loadedmetadata', () => {
    state.SET_VIDEO(
      url,
      file.file.file as File,
      0,
      Math.ceil(fileElement.duration)
    )
  })
}

const selectImage = (index: number) => {
  state.SET_CURRENT_INDEX(index)
}
const list = computed(() => state.temporary)
</script>
