import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './router/index'
import './assets/iconfont/iconfont.css'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import initApp, { initGlobalComponet } from './config/init'
import "vue-virtual-scroller/dist/vue-virtual-scroller.css" // 引入它的 css
import VueVirtualScroller from "vue-virtual-scroller" // 引入它



const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(router).use(VueVirtualScroller)

initApp()
initGlobalComponet(app)
app.mount('#app')
