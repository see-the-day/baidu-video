import { defineStore } from 'pinia'
import { DATA, TEMPORARY, PERSON_TEXT, PERSON_IMG } from '@/type/index'

export const useState = defineStore('state', {
  state: (): {
    data: DATA[]
    temporary: TEMPORARY[]
    currentIndex: number
    boxIndex: number
    textIndex: number
    imgIndex: number
  } => ({
    data: [],
    temporary: [],
    // 当前数据index
    currentIndex: 0,
    // 当前选中左侧box index
    boxIndex: 1,
    // 当前选中文本 index
    textIndex: 0,
    // 当前选中图片 index
    imgIndex: 0
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
    }
  },
  actions: {
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
        subtitle: {}, // 字幕
        img: [] // 贴图
      })
      this.temporary.unshift({
        firstImage: '',
        url,
        currentTime: startTime,
        timeEnd: 0
      })
    },
    PARTITION_CHANGE() {
      this.data[this.currentIndex].partition = {
        startTime: this.getStartTime,
        endTime: this.getCurrentTime
      }
      this.temporary[this.currentIndex].currentTime = this.getStartTime
    },
    ADD_TIME(currentTime: number, timeEnd: number) {
      this.temporary[this.currentIndex].currentTime = currentTime
      this.temporary[this.currentIndex].timeEnd = timeEnd
    },
    ADD_TEXT() {
      this.data.unshift(
        JSON.parse(JSON.stringify(this.data[this.currentIndex]))
      )
      this.data[this.currentIndex].text.push({
        startTime: this.getStartTime,
        endTime: this.getEndTime,
        text: '默认文案',
        color: '#000',
        fontSize: 14,
        left: 0,
        top: 0
      })
      this.temporary.unshift(
        JSON.parse(JSON.stringify(this.temporary[this.currentIndex]))
      )
    },
    ADD_IMG(img: string) {
      this.data.unshift(
        JSON.parse(JSON.stringify(this.data[this.currentIndex]))
      )
      this.data[this.currentIndex].img.push({
        startTime: this.getStartTime,
        endTime: this.getEndTime,
        img,
        left: 0,
        top: 0
      })
      this.temporary.unshift(
        JSON.parse(JSON.stringify(this.temporary[this.currentIndex]))
      )
    },
    SET_TEXT(index: number, obj: PERSON_TEXT) {
      this.data[this.currentIndex].text[index] = {
        ...this.data[this.currentIndex].text[index],
        ...obj
      }
    },
    SET_IMG(index: number, obj: PERSON_IMG) {
      this.data[this.currentIndex].img[index] = {
        ...this.data[this.currentIndex].img[index],
        ...obj
      }
    },
    DELETE_TEXT() {
      this.data[this.currentIndex].text.splice(this.textIndex, 1)
      this.textIndex = 0
    },
    DELETE_IMG() {
      this.data[this.currentIndex].img.splice(this.imgIndex, 1)
      this.imgIndex = 0
    },
    STE_VIDEO_URL(url: string) {
      this.temporary[this.currentIndex].firstImage = url
    },
    SET_CURRENT_INDEX(index: number) {
      this.currentIndex = index
    },
    SET_CURRENT_BOX_INDEX(index: number) {
      this.boxIndex = index
    },
    SET_TEXT_INDEX(index: number) {
      this.textIndex = index
    },
    SET_IMG_INDEX(index: number) {
      this.imgIndex = index
    },
    ADD_STATUS_MAP() {}
  }
})
