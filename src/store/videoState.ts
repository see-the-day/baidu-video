import { defineStore } from 'pinia'
import { PERSON_TEXT, PERSON_IMG, VIDEO_DATA, TEXT_TYPE } from '@/type/index'
import { isAddTextLine } from '@/util/index'

let timeout: ReturnType<typeof setTimeout>
export const useState = defineStore('state', {
  state: (): VIDEO_DATA => ({
    data: [],
    temporary: [],
    // 当前数据index
    currentIndex: 0,
    // 当前选中左侧box index
    boxIndex: 1,
    // 当前选中文本 index
    textIndex: 0,
    // 当前选中图片 index
    imgIndex: 0,
    // 字幕index
    subtitleIndex: 0,
    statusMap: []
  }),
  getters: {
    getStartTime: (state) => {
      return state.data[state.currentIndex]?.partition?.startTime || 0
    },
    getEndTime: (state) => {
      return state.data[state.currentIndex]?.partition?.endTime || 0
    },
    getCurrentTime: (state) => {
      return state.temporary[state.currentIndex]?.currentTime || 0
    },
    getLayerText: (state) => {
      return state.data[state.currentIndex]?.text || []
    },
    getLayerImg: (state) => {
      return state.data[state.currentIndex]?.img || []
    },
    getLayerSubtitle: (state) => {
      return state.data[state.currentIndex]?.subtitle || []
    },
    getLineStartTime(): number {
      return this.getCurrentTime - 5 > 0 ? this.getCurrentTime - 5 : 0
    },
    getLineEndTime(): number {
      return this.getCurrentTime + 5 > this.getEndTime
        ? this.getEndTime
        : this.getCurrentTime + 5
    }
  },
  actions: {
    // 当前视频状态，视频刚上传时触发
    SET_VIDEO(
      url: string,
      videoFile: File,
      startTime: number = 0,
      endTime: number = 0
    ) {
      this.data.unshift({
        videoFile, // 文件file
        partition: { startTime, endTime }, // 视频开始时间结束时间，分割视频用
        text: [], // 文字
        subtitle: [], // 字幕
        img: [] // 贴图
      })
      this.temporary.unshift({
        firstImage: '',
        url,
        currentTime: startTime,
        timeEnd: 0
      })
    },
    // 删除当前视频
    DELETE_VIDEO(index: number) {
      this.data.splice(index, 1)
      this.temporary.splice(index, 1)
    },
    // 存储当前视频首页图
    STE_VIDEO_URL(url: string) {
      this.temporary[this.currentIndex].firstImage = url
    },
    // 视频拖拽
    CHANGE_DATA_DRAGGABLE(newIndex: number, oldIndex: number) {
      ;[this.data[newIndex], this.data[oldIndex]] = [
        this.data[oldIndex],
        this.data[newIndex]
      ]
    },

    // 存储当前开始时间，结束时间
    PARTITION_CHANGE() {
      this.data[this.currentIndex].partition = {
        startTime: this.getStartTime,
        endTime: this.getCurrentTime
      }
      this.temporary[this.currentIndex].currentTime = this.getStartTime
    },

    // 存储当前视频时间以及视频结束时间
    ADD_TIME(currentTime: number, timeEnd: number) {
      this.temporary[this.currentIndex].currentTime = currentTime
      this.temporary[this.currentIndex].timeEnd = timeEnd
    },

    ADD_SUBTITLE(
      subtitle: { startTime: number; endTime: number; text: string }[]
    ) {
      const length = (this.data[this.currentIndex].subtitle.length || 0) + 1
      if (length > 2) {
        window.$message.error('字幕最多存在两个')
        return
      }
      this.data[this.currentIndex].subtitle.push({
        top: 100,
        left: 50,
        color: '#000',
        fontSize: 14,
        data: subtitle,
        stroke: 0,
        strokeColor: '#000',
        text: `${length}`
      })
    },
    SET_SUBTITLE_INDEX(index: number) {
      this.subtitleIndex = index
    },
    SET_SUBTITLE_TIME(index: number, obj: PERSON_TEXT) {
      this.data[this.currentIndex].subtitle[this.subtitleIndex].data[index] = {
        ...this.data[this.currentIndex].subtitle[this.subtitleIndex].data[
          index
        ],
        ...obj
      }
    },
    SET_SUBTITLE(index: number, obj: PERSON_TEXT) {
      this.data[this.currentIndex].subtitle[index] = {
        ...this.data[this.currentIndex].subtitle[index],
        ...obj
      }
    },
    DELETE_SUBTITLE() {
      this.data[this.currentIndex].subtitle.splice(this.subtitleIndex, 1)
      this.subtitleIndex = 0
    },

    SET_TEXT_INDEX(index: number) {
      this.textIndex = index
    },
    ADD_TEXT(type: TEXT_TYPE = 0) {
      this.data[this.currentIndex].text.push({
        startTime: this.getLineStartTime,
        endTime: this.getLineEndTime,
        text: '默认文案',
        color: '#000',
        fontSize: 14,
        left: 50,
        top: 100,
        stroke: 0,
        strokeColor: '#000',
        type
      })
    },
    SET_TEXT(index: number, obj: PERSON_TEXT) {
      const data = { ...this.data[this.currentIndex].text[index], ...obj }
      this.data[this.currentIndex].text[index] = data
    },
    DELETE_TEXT() {
      this.data[this.currentIndex].text.splice(this.textIndex, 1)
      this.textIndex = 0
    },

    SET_IMG_INDEX(index: number) {
      this.imgIndex = index
    },
    ADD_IMG(img: string) {
      if (
        !isAddTextLine(
          this.data[this.currentIndex].img,
          this.getLineStartTime,
          this.getLineEndTime
        )
      ) {
        window.$message.error('相同时间贴图最多出现三个')
        return false
      }
      this.data[this.currentIndex].img.push({
        startTime: this.getLineStartTime,
        endTime: this.getLineEndTime,
        img,
        left: 50,
        rotation: 0,
        scale: 1,
        top: 100
      })
    },
    SET_IMG(index: number, obj: PERSON_IMG) {
      if (
        !isAddTextLine(
          this.data[this.currentIndex].img,
          obj.startTime || 0,
          obj.endTime || 0,
          5
        )
      ) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          window.$message.error('相同时间贴图最多出现三个')
        }, 300)
      }
      this.data[this.currentIndex].img[index] = {
        ...this.data[this.currentIndex].img[index],
        ...obj
      }
    },
    DELETE_IMG() {
      this.data[this.currentIndex].img.splice(this.imgIndex, 1)
      this.imgIndex = 0
    },

    SET_CURRENT_INDEX(index: number) {
      this.currentIndex = index
    },
    SET_CURRENT_BOX_INDEX(index: 1 | 2 | 3 | 4) {
      this.boxIndex = index
    },

    // 用栈存储用户操作状态
    ADD_STATUS_MAP() {
      const data = JSON.stringify({
        data: this.data,
        temporary: this.temporary,
        currentIndex: this.currentIndex,
        boxIndex: this.boxIndex,
        textIndex: this.textIndex,
        imgIndex: this.imgIndex,
        subtitleIndex: this.subtitleIndex
      })
      if (data !== this.statusMap[0]) {
        this.statusMap.unshift(data)
      }
    },
    CANCEL_STATUS_MAP() {
      this.statusMap.shift()
      if (!this.statusMap.length) return
      const {
        data,
        temporary,
        currentIndex,
        boxIndex,
        textIndex,
        imgIndex,
        subtitleIndex
      } = JSON.parse(this.statusMap[0])
      this.data = data
      this.temporary = temporary
      this.currentIndex = currentIndex
      this.boxIndex = boxIndex
      this.textIndex = textIndex
      this.imgIndex = imgIndex
      this.subtitleIndex = subtitleIndex
    }
  }
})
