import { defineStore } from 'pinia'
import { city_data } from '@/data/city'

export const useCityDataStore = defineStore('cityData', {
  state: () => ({
    cityCode: '',
    city_data: city_data
  }),
  actions: {
    // 获取城市id
    async getCityCode() {
      // 去掉"省"、"市"、"矿区"、"区"、"县"等后缀
      // const province = ipAddrStore.location.province.replace(/省|市|矿区|区|县/g, '')
      // const city = ipAddrStore.location.city.replace(/省|市|矿区|区|县/g, '')
      // const district = ipAddrStore.location.district.replace(/省|市|矿区|区|县/g, '')
      // console.log(province)
      // console.log(city)
      // console.log(district)
      // console.log(ipAddrStore.location.district)
      // const cityCode = this.city_data[province][city][district].AREAID
      // if (cityCode) {
      //   this.cityCode = cityCode
      //   return cityCode
      // }
      // this.cityCode = '101010100'
      // return '101010100'
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
export default useCityDataStore
