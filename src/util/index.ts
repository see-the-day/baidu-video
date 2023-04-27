import { DATA_IMG } from '@/type/index'

export const isAddTextLine = (
  dataImg: DATA_IMG[],
  startTime: number = 0,
  endTime: number = 0,
  frequency: number = 3
): boolean => {
  const map: Record<string, number> = {}
  const data = [...dataImg, { startTime, endTime }]
  for (let length = 0; length < data.length; length++) {
    const obj = data[length]
    const start = (obj?.startTime || 0) * 10
    const end = (obj?.endTime || 0) * 10
    for (let i = start; i < end; i++) {
      if (map[i / 10] >= frequency) {
        return false
      }
      if (map[i / 10]) {
        map[i / 10] += 1
      } else {
        map[i / 10] = 1
      }
    }
  }
  return true
}
