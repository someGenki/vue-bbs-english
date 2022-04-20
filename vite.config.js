import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const libNameReg = /\/node_modules\/([^/]+)\//
const commonReg = /\/src\/(utils|api|hooks)\//
const extractLibs = [
  '@vue',
  '@ctrl',
  'vue-router',
  'element-plus',
  '@element-plus',
  'axios',
  'marked',
  '@popperjs',
  'lodash-es',
  'async-validator',
]
// 对库文件进行抽离，减少vendor的体积，也更方便缓存。合并小文件，减少请求次数
const manualChunks = (id) => {
  if (libNameReg.test(id)) {
    const libName = RegExp.$1
    return extractLibs.includes(libName) ? libName : 'vendor'
  } else if (commonReg.test(id)) {
    return 'common' // 合并零散的通用文件
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
    reportCompressedSize: false,
    target: 'es2020',
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/styles/_variables";\n`,
      },
    },
  },
})
