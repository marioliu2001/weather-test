<script setup>
import Header from './header/index.vue'
import Footer from './footer/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  .el-container {
    //height: 100vh;
    //去除边距
    .el-header {
      padding: 0;
    }
    .el-footer {
      padding: 0;
    }
  }

  //display: flex;
}
</style>
