<script setup>
import { onMounted, ref } from 'vue'
import useIpAddrStore from '@/stores/modules/ipAddr'
import { storeToRefs } from 'pinia'
import { getTJWeatherApi } from '@/api'
const ipAddrStore = useIpAddrStore()

const { ipAddr, location } = storeToRefs(ipAddrStore)

const wendu = ref()
const shidu = ref()
const quality = ref()
const ganmao = ref()
const updateTime = ref() // 更新时间
const city = ref([]) // 城市
const forecast = ref([]) // 预报
const getTJWeatherData = async () => {
  const res = await getTJWeatherApi()
  console.log(res)
  console.log(res.time)
  console.log(res.cityInfo.city)
  console.log(res.data.forecast)
  wendu.value = res.data.wendu
  shidu.value = res.data.shidu
  quality.value = res.data.quality
  ganmao.value = res.data.ganmao
  updateTime.value = res.time
  city.value = res.cityInfo.city
  forecast.value = res.data.forecast
}

onMounted(async () => {
  await getTJWeatherData()
  if (!ipAddr.value) {
    console.log('开始获取ip和地理位置')
    // 获取用户的ip地址并存储
    await ipAddrStore.getIpAddr()
    // 获取ip地理位置
    await ipAddrStore.getLocation()
    // 获取cityCode
    // await cityDataStore.getCityCode()
  }
})
</script>

<template>
  <el-descriptions title="地理位置">
    <el-descriptions-item label="ip">{{ ipAddr }}</el-descriptions-item>
    <el-descriptions-item label="位置">{{
      location.province + ' ' + location.city + ' ' + location.district
    }}</el-descriptions-item>
  </el-descriptions>
  <div class="right-text" style="margin-bottom: 10px; text-align: center">
    温度：{{ wendu + '℃' }}
  </div>
  <div class="right-text" style="margin-bottom: 10px; text-align: center">湿度：{{ shidu }}</div>
  <div class="right-text" style="margin-bottom: 10px; text-align: center">
    空气质量：{{ quality }}
  </div>
  <div class="right-text" style="margin-bottom: 10px; text-align: center">
    更新时间：{{ updateTime }}
  </div>
  <el-card class="box-card" v-for="(item, index) in forecast" :key="index">
    <template #header>
      <div class="card-header">
        <span>{{ city }}</span>
        <span class="right-text">{{ item.ymd }} {{ item.week }}</span>
      </div>
    </template>
    <!--    <p th:text="'地区:'+ ${weather.city}"></p>
        <p th:text="'更新时间:'+${weather.time}"></p>
        <p th:text="'温度:'+${weather.wendu}"></p>
        <p th:text="'湿度:'+${weather.shidu}"></p>
        <p th:text="'空气质量:'+${weather.quality}"></p>
        <p th:text="'最高温度:'+${weather.high}"></p>
        <p th:text="'最低温度:'+${weather.low}"></p>
        <p th:text="'日出时间:'+${weather.sunrise}"></p>
        <p th:text="'日落时间:'+${weather.sunset}"></p>
        <p th:text="'空气指数:'+${weather.aqi}"></p>
        <p th:text="'风向:'+${weather.fx}"></p>
        <p th:text="'风速:'+${weather.fl}"></p>
        <p th:text="'天气:'+${weather.type}"></p>
        <p th:text="'温馨提醒:'+${weather.notice}"></p>
      -->
    <div class="text item">天气：{{ item.type }}</div>
    <div class="text item">最高温度：{{ item.high }}</div>
    <div class="text item">最低温度：{{ item.low }}</div>
    <div class="text item">风速：{{ item.fx }}</div>
    <div class="text item">风向：{{ item.fl }}</div>
    <div class="text item">日出时间：{{ item.sunrise }}</div>
    <div class="text item">日落时间：{{ item.sunset }}</div>
    <div class="text item">空气指数：{{ item.aqi }}</div>
    <div class="text item">温馨提醒：{{ item.notice }}</div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 5px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right-text {
    font-size: 12px;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
