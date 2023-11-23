<template>
  <div>
    <van-search
      v-model="value"
      placeholder="搜索附近位置"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @clear="onCancel"
    />
    <div class="searchResult" :style="Style">
      <ul>
        <li v-for="(item, index) in searchList" :key="index">
          {{ item.name }} <br />
          {{ item.address }}
        </li>
      </ul>
    </div>
    <button @click="getLocation">高德api获取定位</button>

    <button @click="getPosition">浏览器api获取定位</button>

    <button @click="getWXPosition">微信api获取定位</button>

    <div>当前位置 : {{ dz }}</div>

    <div>纬度 : {{ latitude }}</div>

    <div class="jd">经度 :{{ longitude }}</div>

    <h3>附近:</h3>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item.name }} <br />
        {{ item.address }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // 当前位置
      dz: '',
      // 纬度
      latitude: '',
      // 经度
      longitude: '',
      // 附近
      list: '',
      // 城市名
      city: '',
      // 搜索地点
      searchList: '',
      // 搜索结果显示/隐藏
      Style: {
        display: 'none'
      },
      // 搜索关键字
      value: ''
    }
  },
  methods: {
    // 高德api获取定位(可直接获取到具体位置)
    getLocation() {
      var that = this
      let geolocation
      AMap.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation()
        geolocation.getCurrentPosition((status, result) => {
          if (status == 'complete') {
            that.onComplete(result)
          } else {
            that.onError(result)
          }
        })
      })
    },
    //定位成功
    onComplete(data) {
      console.log(data)
      // 当前地址
      this.dz = data.formattedAddress
      // 经纬度
      this.latitude = data.position.lat
      this.longitude = data.position.lng
      console.log(this.latitude, this.longitude)
      alert(`纬度是 ${this.latitude}`)
      alert(`经度是 ${this.longitude}`)
      alert(this.dz)
      // 调用查询周边的方法, 传经纬度 , 城市名
      this.aMapSearchNearBy(`${this.longitude},${this.latitude}`, data.addressComponent.city)
    },
    //定位失败
    onError(data) {
      console.log('定位失败:' + data.message)
      alert('定位失败:' + data.message)
    },

    // 浏览器自带api获取经纬度(只能获取经纬度再用高德api解析出位置)
    getPosition() {
      if (navigator.geolocation) {
        alert('支持定位')
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError)
      } else {
        alert('浏览器不支持地理定位')
      }
    },
    // 获取经纬度成功
    async showPosition(position) {
      console.log(position)
      this.latitude = position.coords.latitude //纬度
      this.longitude = position.coords.longitude //经度
      console.log(this.latitude, this.longitude)
      alert(`纬度是 ${this.latitude}`)
      alert(`经度是 ${this.longitude}`)
      // 根据经纬度解析成位置信息
      let geocoder
      AMap.plugin('AMap.Geocoder', function () {
        geocoder = new AMap.Geocoder()
      })
      geocoder.getAddress(`${this.longitude},${this.latitude}`, (status, { regeocode }) => {
        console.log(regeocode)
        if (status === 'complete' && regeocode) {
          // formattedAddress即经纬度转换后的位置名称
          this.dz = regeocode.formattedAddress
          this.city = regeocode.addressComponent.city
          console.log(this.dz, this.city)
          alert(this.dz, this.city)
          // 调用查询周边的方法, 传经纬度 , 城市名
          this.aMapSearchNearBy(`${this.longitude},${this.latitude}`, this.city)
        } else {
          // 失败回调 status 统一返回1
          switch (originMessage) {
            case 'Timeout expired':
              // 超时
              break
            case 'User denied Geolocation':
              // 拒绝授权
              break
            case "error Network location provider at 'https://www.googleapis.com/' : No response received.":
              // 不支持定位，定位不可用的浏览器
              break
            default:
              // 其他错误
              return
          }
        }
      })
    },
    // 获取经纬度失败
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert('定位失败,用户拒绝请求地理定位')
          break
        case error.POSITION_UNAVAILABLE:
          alert('定位失败,位置信息是不可用')
          break
        case error.TIMEOUT:
          alert('定位失败,请求获取用户位置超时')
          break
        case error.UNKNOWN_ERROR:
          alert('定位失败,定位系统失效')
          break
      }
    },

    // 微信api获取经纬度
    getWXPosition() {
      alert('获取当前位置')
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log('获取经纬度成功')
          alert('获取经纬度成功')
          this.latitude = res.latitude.toFixed(6)
          this.longitude = res.longitude.toFixed(6)
          console.log(this.latitude, this.longitude)
          alert(`纬度是 ${this.latitude}`)
          alert(`经度是 ${this.longitude}`)
          // 根据经纬度解析成位置信息
          let geocoder
          AMap.plugin('AMap.Geocoder', function () {
            geocoder = new AMap.Geocoder()
          })

          geocoder.getAddress(`${this.longitude},${this.latitude}`, (status, { regeocode }) => {
            console.log(regeocode)
            if (status === 'complete' && regeocode) {
              // formattedAddress即经纬度转换后的位置名称
              this.dz = regeocode.formattedAddress
              this.city = regeocode.addressComponent.city
              console.log(this.dz, this.city)
              alert(`当前位置是${this.dz}`)
              alert(`当前城市是${this.city}`)
              // 调用查询周边的方法, 传经纬度 , 城市名
              this.aMapSearchNearBy(`${this.longitude},${this.latitude}`, this.city)
            } else {
              // 失败回调 status 统一返回1
              switch (originMessage) {
                case 'Timeout expired':
                  // 超时
                  break
                case 'User denied Geolocation':
                  // 拒绝授权
                  break
                case "error Network location provider at 'https://www.googleapis.com/' : No response received.":
                  // 不支持定位，定位不可用的浏览器
                  break
                default:
                  // 其他错误
                  return
              }
            }
          })
        },
        fail: (res) => {
          console.log('获取经纬度失败')
          alert('获取经纬度失败')
          alert(res.errMsg)
        }
      })
    },

    // 查询附近地点的方法
    aMapSearchNearBy(centerPoint, city) {
      var that = this
      let placeSearch
      AMap.service(['AMap.PlaceSearch'], function () {
        placeSearch = new AMap.PlaceSearch({
          pageSize: 20,
          pageIndex: 1,
          city: city
        })
        placeSearch.searchNearBy('', centerPoint, 1000, function (status, result) {
          console.log(result)
          if (result.info === 'OK') {
            var locationList = result.poiList.pois
            that.list = locationList
          } else {
            alert('获取位置信息失败!请重试')
          }
        })
      })
    },

    // 输入框搜索时
    onSearch(val) {
      var that = this
      let placeSearch
      AMap.plugin('AMap.PlaceSearch', function () {
        placeSearch = new AMap.PlaceSearch({
          pageSize: 20
        })
        placeSearch.search(`${val}`, (status, result) => {
          console.log(result)
          that.searchList = result.poiList.pois
          console.log(that.searchList)
          // 显示搜索结果
          that.Style.display = 'block'
        })
      })
    },

    // 取消搜索时
    onCancel() {
      this.Style.display = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 300px;
  height: 100px;
}

li {
  margin: 20px;
}

div {
  margin: 10px;
}

.jd {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}

.searchResult {
  position: absolute;
  width: 100%;
  background: #eee;
  left: 0;
}
</style>
