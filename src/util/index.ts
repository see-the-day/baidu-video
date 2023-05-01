import { DATA_IMG, TEXT_TYPE } from '@/type/index'

/**
 * dataImg 当前图片集合数据
 * startTime 下一次即将插入的开始时间
 * endTime 下一次即将插入的结束时间
 * frequency 触发临界值
 */
export const isAddTextLine = (
  dataImg: DATA_IMG[],
  startTime: number = 0,
  endTime: number = 0,
  frequency: number = 4
): boolean => {
  const map: Record<string, number> = {}
  const data = [...dataImg, { startTime, endTime }]
  for (let length = 0; length < data.length; length++) {
    const obj = data[length]
    const start = (obj?.startTime || 0) * 10
    const end = (obj?.endTime || 0) * 10
    for (let i = start; i <= end; i++) {
      map[i] = map[i] ? (map[i] += 1) : 1
      if (map[i] >= frequency) {
        return false
      }
    }
  }
  return true
}

export const typeTextStyle = (type: TEXT_TYPE = 0) => {
  const styleMap: Record<TEXT_TYPE, string> = {
    0: '',
    1: 'rounded-4 border-2 border-white bg-blue p-4 font-Ngaan'
  }
  return styleMap[type]
}
