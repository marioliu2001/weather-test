import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/echarts',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/weather',
          name: 'weather',
          component: () => import('@/views/weather/index.vue')
        },
        {
          path: '/picture',
          name: 'picture',
          component: () => import('@/views/picture/index.vue')
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: () => import('@/views/echarts/myEcharts01.vue')
        }
      ]
    }
  ]
})

export default router
