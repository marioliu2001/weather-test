<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 当前路由
const route = useRoute()
const activeIndex = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    active-text-color="#ffd04b"
    background-color="#218868"
    router
  >
    <el-menu-item index="/echarts">首页</el-menu-item>
    <el-menu-item index="/weather">天气</el-menu-item>
    <el-menu-item index="/picture">照片墙</el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  justify-content: center;
  .el-menu-item {
  }
}
</style>
