import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bbs/', // 可被命令行参数 --base=/xxx/ 覆盖
  server: {
    port: 8009,
    open: true,
  },
  build: {
    reportCompressedSize: false,
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
        additionalData: `
            @import "/src/styles/_variables";
          `,
      },
    },
  },
})
