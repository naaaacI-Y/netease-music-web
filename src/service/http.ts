//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import whiteList from "./whiteList"
interface Http {
  get<T>(url: string, params?: unknown): Promise<T>
  post<T>(url: string, params?: unknown): Promise<T>
  upload<T>(url: string, params: unknown): Promise<T>
  download(url: string): void
}


// 设置请求头和请求路径
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
})
// axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEURL
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.withCredentials = true
service.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    //  部分请求不需要缓存，请求url上面添加时间戳
    if (whiteList.includes(config.url!) || whiteList.includes(config.url!.split("?")[0])) {
      if (config.url?.includes("?")) {
        config.url += `&timestamp=${Date.now()}`
      } else {
        config.url += `?timestamp=${Date.now()}`

      }
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
service.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})




const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      service
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      service
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
