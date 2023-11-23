import { defineStore } from 'pinia'
import { getIpAddrApi, getAccurateLocationApi, getLocationApi } from '@/api'
export const useIpAddrStore = defineStore('ipAddr', {
  state: () => ({
    ipAddr: '',
    location: {
      country: '',
      province: '',
      city: '',
      district: '',
      isp: ''
    }
  }),
  actions: {
    // 存储ip地址
    async getIpAddr() {
      const res = await getIpAddrApi()
      if (res) {
        this.ipAddr = res.ip
        // this.ipAddr = '222.83.255.203'
      }
    },
    // 获取地理位置
    async getLocation() {
      const res = await getAccurateLocationApi(this.ipAddr)
      if (res) {
        console.log(res)
        this.location.country = res.data.country
        this.location.province = res.data.prov
        this.location.city = res.data.city
        this.location.district = res.data.district
        this.location.isp = res.data.isp
      }
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
export default useIpAddrStore
