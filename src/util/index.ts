export interface videoRef {
  // 其他冗余字段
  [propName: string]: any
  // 数字值，表示当前播放的时间，以秒计
  currentTime: number
}
export class cropFilter {
  // 结束按钮距离左侧距离
  endLeft: string | number = 0

  // 结束按钮初始位置
  endright: string | number = 0

  // 开始按钮距离左侧距离
  startLeft: string | number = 0

  // 毫秒/px(1px===的毫秒数)
  roal: string | number = 0

  // 开始时间
  startTime: string | number = 0

  // 结束时间
  endTime: string | number = 0

  // 时间轴显示时间数组
  timeList: string[] = []
}

// 日期字符串转成时间戳
export function dateStrChangeTimeTamp(dateStr: string) {
  dateStr = dateStr.substring(0, 23)
  dateStr = dateStr.replace(/-/g, '/')
  const timeTamp = new Date(dateStr).getTime()
  return timeTamp
}
// 精准到毫秒
export function getNowTime(val: string | number) {
  const date = new Date(val)
  const hour =
    date.getHours() - 8 < 10 ? `0${date.getHours() - 8}` : date.getHours() - 8
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const second =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  const milliSeconds = date.getMilliseconds() // 毫秒
  const currentTime = `${hour}:${minute}:${second}.${milliSeconds}`
  return currentTime
}
