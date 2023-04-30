<template>
  <div class="flex flex-wrap">
    <div
      v-for="(li, index) of list"
      :key="index"
      class="handle relative mb-4 mr-4 flex h-70 w-110 items-center justify-center border p-4 text-textWhite"
      :class="{ 'border-primary': index === state.currentIndex }"
      @click="selectSubtitle(index)"
    >
      {{ li.text }}
    </div>
  </div>
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
import { NUpload, UploadFileInfo } from 'naive-ui'
import { computed } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()

const list = computed(() => state.getLayerSubtitle)

const selectSubtitle = (index: number) => {
  state.SET_SUBTITLE_INDEX(index)
}

const waitReader = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8') // 读取文件
    reader.onload = (evt: any) => {
      const fileString = evt.target.result // 读取文件内容
      // eslint-disable-next-line no-unused-expressions
      fileString ? resolve(fileString) : reject(evt)
    }
  })
}

const getSeconds = (time: string): number => {
  const [h, m, sMs] = time.split(':')
  const [s, ms] = sMs.split(',')
  return (
    (Number(h) || 0) * 60 * 60 + (Number(m) || 0) * 60 + Number(s) ||
    0 + (Number(ms) || 0) / 1000
  )
}

const finish = (file: { file: UploadFileInfo }) => {
  const type = file.file.name.split('.')[file.file.name.split('.').length - 1]
  if (type !== 'srt') {
    window.$message.error('请上传SRT格式文件')
    return
  }
  waitReader(file.file.file as File).then((res): void => {
    if (typeof res !== 'string') return
    const subtitle: { startTime: number; endTime: number; text: string }[] = []
    const strList = res.split('\n')
    strList.forEach((str: string, index: number) => {
      if (str.indexOf('-->') > -1) {
        subtitle.push({
          startTime: getSeconds(str.split(' ')[0]),
          endTime: getSeconds(str.split(' ')[2]),
          text: strList[index + 1] || ''
        })
      }
    })
    state.ADD_SUBTITLE(subtitle)
  })
}
</script>
