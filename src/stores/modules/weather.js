import { defineStore } from 'pinia'
import { getTJWeatherApi } from '@/api'

export const useWeatherDataStore = defineStore('weatherData', {
  state: () => ({
    weatherData: null
  }),
  actions: {
    // 获取天津天气
    async getTJWeather() {
      const res = await getTJWeatherApi()
      return res
      // console.log(res)
      // this.weatherData = res
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage
      }
    ]
  }
})
export default useWeatherDataStore
