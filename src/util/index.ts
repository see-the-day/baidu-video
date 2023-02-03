import { zdmCaptcha } from 'zdm-utils'

/**
 * 极验
 * @method geetestAction
 *
 * @return {undefined} 返回 无
 */
export const geetestAction = () => {
  return new Promise((resolve, reject) => {
    // 极验初始化
    zdmCaptcha({
      url: '/api/v1/verification/get_geetest?rand=1624428448921&scene=mobile_code',
      scene: 'mobile_code', // 场景 active：活动交互, login：登录注册, mobile_code: 验证码, ta_index：他人主页
      readyCallBack: () => {
        // 此处写初始化成功后，准备好的逻辑
        // 调起极验弹窗
        if (window.geetestObj) {
          window.geetestObj.verify()
        }
      },
      successCallBack: (result: Record<string, string>) => {
        // 此处写验证成功后执行的逻辑
        // 重置极验弹窗
        window.geetestObj.reset()
        resolve(result)
      },
      closeCallBack: () => {
        // 此处写关闭验证弹窗执行的逻辑
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      }
    })
  })
}

/**
 * 获取url参数
 */
export const getQueryVariable = (variable: string): string | boolean => {
  const query = window.location.href.split('?')[1]
  if (!query) {
    return false
  }
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}

/**
 * 用户信息
 */
export const getUserInfo = (key?: string): Record<string, any> => {
  const userInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  return key ? userInfo[key] || '' : userInfo
}
export const setUserInfo = (obj: Record<string, string>): void => {
  localStorage.setItem('USER_INFO', JSON.stringify(obj))
}

/**
 * 用户token
 */
export const getToken = (): string => {
  return localStorage.getItem('DATAZHI-TOKEN') || ''
}
export const setToken = (token: string): void => {
  localStorage.setItem('DATAZHI-TOKEN', token)
}

/**
 * 根据权限查找url
 * @method findPriority
 * @param  {Array}  p 菜单权限
 */
export const findPriority = (menu: string[]): string[] => {
  const RouteMap = {}
  return menu.map((key: string) => RouteMap[key] || '').filter((key) => key)
}
