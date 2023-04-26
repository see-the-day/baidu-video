<template>
  <Draggable
    :list="list"
    item-key="name"
    class="list-group flex flex-1 flex-wrap"
    handle=".handle"
    :animation="100"
    @change="log"
  >
    <template #item="{ element, index }">
      <div
        class="handle mb-4 mr-4 h-70 w-110 border p-4"
        :class="{ 'border-primary': index === state.currentIndex }"
        @click="selectImage(index)"
      >
        <img :src="element.firstImage" class="h-full w-full" />
      </div>
    </template>
  </Draggable>
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
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { NUpload, UploadFileInfo } from 'naive-ui'
import Draggable from 'vuedraggable'
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
const log = ({
  moved: { newIndex, oldIndex }
}: {
  moved: { newIndex: number; oldIndex: number }
}) => {
  state.SET_CURRENT_INDEX(newIndex)
  state.CHANGE_DATA(newIndex, oldIndex)
  console.log(state.data)
}

const selectImage = (index: number) => {
  state.SET_CURRENT_INDEX(index)
}
const list = computed(() => state.temporary)
</script>
