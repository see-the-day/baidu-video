import { defineStore } from 'pinia'

interface DATA {
  videoFile: File
  partition: { startTime: number; endTime: number }[]
  text: Record<string, string | number>[]
  subtitle: Record<string, string>
  img: Record<string, string>
}
interface TEMPORARY {
  firstImage: string
  url: string
  currentTime: number
  timeEnd: number
}
export const useState = defineStore('state', {
  state: (): { data: DATA[]; temporary: TEMPORARY[] } => ({
    data: [],
    temporary: []
  }),
  actions: {
    SET_VIDEO(url: string, videoFile: File) {
      this.data.unshift({
        videoFile,
        partition: [],
        text: [],
        subtitle: {},
        img: {}
      })
      this.temporary.unshift({
        firstImage: '',
        url,
        currentTime: 0,
        timeEnd: 0
      })
    },
    ADD_TIME(currentTime: number, timeEnd: number) {
      this.temporary[0].currentTime = currentTime
      this.temporary[0].timeEnd = timeEnd
    },
    ADD_TEXT() {
      this.data.unshift(JSON.parse(JSON.stringify(this.data[0])))
      this.data[0].text.push({
        startTime: 0,
        endTime: 0,
        text: '默认文案',
        left: 0,
        bottom: 0
      })
      this.temporary.unshift(JSON.parse(JSON.stringify(this.temporary[0])))
    },
    SET_TEXT(index: number, obj: Record<string, string | number>) {
      this.data[0].text[index] = { ...this.data[0].text[index], ...obj }
    },
    UPDATE_VIDEO_URL(url: string) {
      this.temporary[0].firstImage = url
    }
  }
})
