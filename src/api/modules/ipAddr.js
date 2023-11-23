import { get } from '@/service/http.js'

// 获取ip地址接口
export const getIpAddrApi = () => get('https://api.ipify.org?format=json')

// 获取精确位置接口
export const getAccurateLocationApi = (ip) =>
  get('https://qifu-api.baidubce.com/ip/geo/v1/district', { ip: ip })
// 获取市级接口
export const getLocationApi = (ip) =>
  get('https://restapi.amap.com/v3/ip?key=0113a13c88697dcea6a445584d535837', {
    ip: ip
  })

export const getCityCodeApi = () => get('https://j.i8tq.com/weather2020/search/city.js')

// 另一个接口1： https://opendata.baidu.com/api.php?query=110.248.64.144&co=&resource_id=6006&oe=utf8
// 接口2：https://ip.aliyun.com/service/getIpInfo.php?ip=110.248.64.144
