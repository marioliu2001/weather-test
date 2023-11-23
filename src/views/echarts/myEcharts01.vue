<template>
  <div>
    <div id="main"></div>
    <div id="lineChart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 基本柱形图
    change() {
      const chartBox = this.$echarts.init(document.getElementById('main'))
      const option = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
          }
        ]
      }
      chartBox.setOption(option)
      // 根据页面大小自动响应图表大小
      window.addEventListener('resize', function () {
        chartBox.resize()
      })
    },
    // 折线图
    changeType() {
      // 获取组件实例
      const lineChart = this.$echarts.init(document.getElementById('lineChart'))
      // 设置配置项
      const option = {
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 43, 49],
            type: 'line',
            stack: 'x'
          },
          {
            data: [5, 4, 3, 5, 10],
            type: 'line',
            stack: 'x'
          }
        ]
      }
      // 复制
      lineChart.setOption(option)
      // 根据页面大小自动响应图表大小
      window.addEventListener('resize', function () {
        lineChart.resize()
      })
    }
  },
  mounted() {
    this.change()
    this.changeType()
  }
}
</script>

<style lang="scss" scoped>
#main {
  min-width: 31.25rem;
  min-height: 31.25rem;
}
#lineChart {
  max-height: 500px;
  height: 500px;
}
</style>
