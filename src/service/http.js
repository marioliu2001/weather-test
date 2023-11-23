import instance from './request.js'
import axios from 'axios' // 请替换成实际的 Axios 实例

const request = async (method, url, dataOrParams, config = {}) => {
  try {
    // 返回数据
    const response = await instance({
      method,
      url,
      [method === 'get' ? 'params' : 'data']: dataOrParams,
      ...config
    })
    // 返回数据
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const get = async (url, params = {}, config = {}) => {
  return await request('get', url, params, config)
}

export const post = async (url, data = {}, config = {}) => {
  return await request('post', url, data, config)
}

export const put = async (url, data = {}, config = {}) => {
  return await request('put', url, data, config)
}

export const del = async (url, params = {}, config = {}) => {
  return await request('delete', url, params, config)
}

// 如果需要取消请求的支持
export const cancelToken = () => {
  return axios.CancelToken.source()
}
