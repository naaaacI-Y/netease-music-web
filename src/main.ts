import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import { createPinia } from 'pinia'
import DefaultLayout from "@/layout/index.vue"
const app = createApp(App)

app.use(router)

app.use(createPinia())
app.component("DefaultLayout", DefaultLayout)
app.mount('#app')
