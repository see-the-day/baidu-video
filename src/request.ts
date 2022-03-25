import axios from 'axios'
import router from './route'
import loading from '@/components/loading'
import { getToken } from './util'
const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 60000
})

service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const loadingUrl = {}
service.interceptors.request.use(
  config => {
    loadingUrl[config.url || ''] = true
    loading.create()

    if (getToken()) {
      config.headers.Authorization = `zdm ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

interface Res {
  error_code: number;
  message: string;
  error_msg: string
}
// response interceptor
service.interceptors.response.use(
  response => {
    const { url } = response.config
    const loadingKey = `${url}`
    delete loadingUrl[loadingKey]
    !Object.keys(loadingUrl).length && loading.close()

    const res: Res = response.data
    if (res.error_code !== 0 && res.error_code !== 10001) {
      window.$message.error(res.message || res.error_msg || 'Error')
      return Promise.reject(new Error(res.message || res.error_msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    delete loadingUrl[error.config.url]
    !Object.keys(loadingUrl).length && loading.close()

    const errStr = error + ''
    if (errStr.includes('status code 401')) {
      localStorage.removeItem('DATAZHI-TOKEN')
      localStorage.removeItem('USER_INFO')
      localStorage.removeItem('searchData')
      router.push('/login')
      return
    }

    if (error.code !== 'ECONNABORTED') {
      window.$message.error(
        error.message
      )
    }
    return Promise.reject(error)
  }
)

export default service
