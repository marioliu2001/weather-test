import { get } from '@/service/http.js'

// 获取天津天气
export const getTJWeatherApi = () => get('/api/weather/city/101030100')
