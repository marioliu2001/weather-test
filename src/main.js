import '@/styles/index.scss'

import { createApp } from 'vue'
import { setupStore } from '@/stores'

import App from './App.vue'
import router from './router'
// 引入echarts
import echarts from '@/echarts'

const app = createApp(App)

// 挂载到vue实例中 调用的时候就是：this.$echarts
app.config.globalProperties.$echarts = echarts

setupStore(app)
app.use(router)

console.log(import.meta.env.BASE_URL)

app.mount('#app')
