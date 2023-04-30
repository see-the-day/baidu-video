export interface DATA_TEXT {
  startTime?: number
  endTime?: number
  text?: string
  color?: string
  fontSize?: number
  left: number
  top: number
}
export interface DATA_IMG {
  startTime?: number
  endTime?: number
  img?: string
  left: number
  top: number
  rotation: number
  scale: string
}

export type PERSON_TEXT = Partial<DATA_TEXT>
export type PERSON_IMG = Partial<DATA_IMG>

type SUBTITLE = {
  text: string
  color: string
  fontSize: number
  top: number
  left: number
  data: {
    startTime: number
    endTime: number
    text: string
  }[]
}
export interface DATA {
  videoFile: File
  partition: { startTime: number; endTime: number }
  text: DATA_TEXT[]
  subtitle: SUBTITLE[]
  img: DATA_IMG[]
}
export interface TEMPORARY {
  firstImage: string
  url: string
  currentTime: number
  timeEnd: number
}

export interface VIDEO_DATA {
  data: DATA[]
  temporary: TEMPORARY[]
  currentIndex: number
  boxIndex: 1 | 2 | 3 | 4
  textIndex: number
  imgIndex: number
  subtitleIndex: number
  statusMap: string[]
}
