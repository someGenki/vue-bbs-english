import axios from 'axios'
import { getToken } from './storage.js'

export const BASEURL = String(import.meta.env.VITE_BASE_URL)

axios.defaults.timeout = 5000 // 响应超时时间
axios.defaults.baseURL = BASEURL // 请求的根路径

// 配置 请求 拦截器
axios.interceptors.request.use((request) => {
  const token = getToken()
  if (token) request.headers.token = token
  return request
})

// 配置 响应 拦截器
axios.interceptors.response.use(
  // 响应200
  (response) => {
    // ... doing something
    return Promise.resolve(response.data)
  },
  // 响应4xx 5xx
  (error) => {
    // ... doing something
    return Promise.reject(error.response)
  }
)

export default axios
