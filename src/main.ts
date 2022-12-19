import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import { createPinia } from 'pinia'
import DefaultLayout from "@/layout/index.vue"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import message from "@/components/message/index"
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.config.globalProperties.$message = message
app.use(pinia)
app.component("DefaultLayout", DefaultLayout)
app.mount('#app')
