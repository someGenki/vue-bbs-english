import { defineConfig } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

const libNameReg = /\/node_modules\/([^/]+)\//
const commonReg = /\/src\/(utils|api|hooks)\//
// 太小的库还是不抽离吧
const extractLibs = ['@vue', 'vue-router', 'element-plus', '@element-plus']
// 对库文件进行抽离，减少vendor的体积，也更方便缓存。合并小文件，减少请求次数

const manualChunks = (id) => {
  if (libNameReg.test(id)) {
    const libName = RegExp.$1
    return extractLibs.includes(libName) ? libName : 'vendor'
  } else if (commonReg.test(id)) {
    return 'vendor' // 合并零散的通用文件
  } else if (id.includes('css')) {
    return 'styles' // 合并零散的样式文件
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bbs/', // 可被命令行参数 --base=/xxx/ 覆盖
  server: {
    port: 8009,
    open: true,
  },
  build: {
    target: 'es2018',
    reportCompressedSize: false,
    rollupOptions: { output: { manualChunks } },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // 别名 `@` 指向 `src` 目录 PS:IDEA编辑器还是不能识别
      '@': '/src/',
      assets: '/src/assets',
      comp: '/src/components',
    },
  },
  // 定义全局常量替换方式,其中每项在开发环境下会被定义在全局，而在构建时被静态替换
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
})
