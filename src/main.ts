import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import { createPinia } from 'pinia'
import DefaultLayout from "@/layout/index.vue"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import message from "@/components/message/index"
import initApp from './config/init'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.config.globalProperties.$message = message
app.use(pinia)
// 初始化注册全局组件 TODO https://www.bilibili.com/video/BV1kG4y1a7n5?p=14&vd_source=2a7f60acdf988ecc8a68c50a69856a9d
initApp()
app.component("DefaultLayout", DefaultLayout)
app.mount('#app')
