import axios from 'axios'

// 创建axios对象
const instance = axios.create({
  // baseURL: 'http://codercba.com:1888/api/',
  // baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})

// 添加请求拦截器 ===> 前端给后端的参数 [还没到后端响应]
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器 ===> 后端给前端的参数 [后端返回给前端]
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 后端给前端数据的时候，会有code码
    // if (response.data && response.data.code === 200) {
    return response
    // }
    // 后端响应code不是200
    // 返回一个包含错误信息的 Promise.reject，这样会触发 Promise 的 catch 回调
    // return Promise.reject(response)
    // return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // status 是 HTTP 状态码
    if (error && error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          // Token 过期时
          error.message = '权限不足, 请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else if (JSON.stringify(error).includes('timeout')) {
      // 超时处理
      error.message = '服务器响应超时，请刷新当前页'
    } else {
      error.message = '连接服务器失败'
    }
    return Promise.reject(error)
  }
)

// 最终返回的axios对象
export default instance
