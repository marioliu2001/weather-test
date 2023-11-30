import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/weather-test/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/styles/variables.scss" as *;` // 加载全局样式，使用scss特性
      }
    }
  },
  server: {
    // 只有在dev环境下才有用，生产环境可以用nginx
    proxy: {
      '/api': {
        target: 'http://t.weather.sojson.com/api', // 目标服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉请求路径中的 /api 前缀
      }
    }
  },
  build: {
    // outDir: 'dist',
    minify: 'terser', // esbuild打包速度最快，terser打包体积最小。
    // assetsInlineLimit: 4000, // 小于该值 图片将打包成Base64
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, // 打包时删除console
        drop_debugger: true, // 打包时删除 debugger
        pure_funcs: ['console.log']
      },
      output: {
        // 去掉注释内容
        comments: true
      }
    },
    reportCompressedSize: false, // 禁用 gzip 压缩大小报告，可略微减少打包时间
    // 规定触发警告的 chunk 大小
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // js最小拆包
        // manualChunks (id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[1].toString()
        //   }
        // },
        // 自定义打包配置
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor' // 将所有来自 node_modules 的模块打包到 vendor chunk
          }
        },
        // 处理GitHub Pages 部署 下划线开头的js文件加载失败

        // 静态资源分类和包装
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
