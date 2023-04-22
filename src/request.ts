import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 60000
})

service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

interface Res {
  error_code: number
  message: string
  error_msg: string
}
// response interceptor
service.interceptors.response.use(
  (response) => {
    const res: Res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
