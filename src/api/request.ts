import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

/** 后端统一返回结构（mock 也会遵循） */
export interface ApiResult<T = unknown> {
  code: number
  message: string
  data: T
}

/** 简易轻量提示（不引入UI库，使用原生alert/console组合） */
function showError(message: string) {
  // eslint-disable-next-line no-console
  console.error('[Request Error]', message)
  // 避免阻塞，使用 setTimeout 让请求先返回
  window.setTimeout(() => {
    window.alert(message)
  }, 0)
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

/* 请求拦截器 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('tech-demo-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/* 响应拦截器：统一错误处理 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResult>) => {
    const res = response.data
    // 二进制流直接返回
    if (response.config.responseType === 'blob') {
      return response.data as unknown as AxiosResponse
    }
    if (res.code !== undefined && res.code !== 0 && res.code !== 200) {
      const msg = res.message || '请求异常'
      showError(msg)
      return Promise.reject(new Error(msg))
    }
    // 业务数据直接返回，配合 request<T,R> 的 R=ApiResult<T> 约束
    return res as unknown as AxiosResponse
  },
  (error) => {
    let message = '网络异常，请稍后重试'
    if (error.response) {
      const status = error.response.status
      const statusTextMap: Record<number, string> = {
        400: '请求参数错误',
        401: '登录状态已过期，请重新登录',
        403: '没有访问权限',
        404: '请求资源不存在',
        500: '服务器内部错误',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
      }
      message = statusTextMap[status] || `请求错误 (${status})`
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    }
    showError(message)
    return Promise.reject(error)
  }
)

/** 通用请求函数 */
export function request<T = unknown>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
  return service.request<unknown, ApiResult<T>>(config)
}

export default service
