//http.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import whiteList from "./whiteList"
import Message from "@/components/message"
interface Http {
  get<T>(url: string, params?: unknown): Promise<T>
  post<T>(url: string, params?: unknown): Promise<T>
  upload<T>(url: string, params: unknown): Promise<T>
  download(url: string): void
}

function onError(e: AxiosError) {
  if (e.response) {
    // 请求已发出，服务器返回的 http 状态码不是 2xx
    // http 状态码非2开头（没有额外定义 validateStatus）的都会进来这里，如 404, 500 等，error 的数据结构如下：error-400、error-500
    Message.error(e.response.statusText)
    return Promise.reject(e.response);
  } else if (e.request) {
    // 请求已发出，但没有收到响应，断网
    Message.error("网络错误，请检查")
    return Promise.reject(e.request);
  } else {
    // 取消请求会进入这里，可以用 axios.isCancel(error) 来判断是否是取消请求，error 的数据结构如下：cancel-error
    // 请求运行有异常会进入这里，如故意将 headers 写错
    console.debug('请求被取消或者发送请求时异常', e.message)
    Message.error(e.message)
    return Promise.reject(e);
  }

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
  }
)
// 响应拦截
service.interceptors.response.use((res) => {
  return res
}, onError)




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
