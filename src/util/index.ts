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
