import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//@ts-ignore
import viteCompression from 'vite-plugin-compression'
import proxy from './build/proxy'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { VITE_PORT } from './build/constant'
import autoImport from "unplugin-auto-import/vite" // 自动引入插件
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_PUBLIC_PATH, //打包路径
    plugins: [
      vue(),
      autoImport({
        imports: ["vue"],
        dts: "src/types/auto-import.d.ts"
      }),
      VueSetupExtend(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/style.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: true,
      https: false,
      proxy
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
