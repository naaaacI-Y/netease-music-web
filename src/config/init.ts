// 全局初始化

import { App } from "vue"
import { initPlayer } from "./player"
import { getPersonSongList } from "./songList"
import { initTheme } from "./theme"
import DefaultLayout from "@/layout/DefaultLayout.vue"
import initUser from "./user"
const initApp = () => {
    // 初始化注册全局组件

    // 初始化主题
    initTheme()
    // 初始化侧边栏歌单
    getPersonSongList(1, 1, 0, 0)

    // 初始化音乐播放器
    initPlayer()

    // 如果登录了重新获取用户个人信息
    initUser()
}

// 注册全局组件
export const initGlobalComponet = (app: App) => {
    app.component("DefaultLayout", DefaultLayout)
    const register = (compoents: Record<string | number, any>, path: string) => {
        const paths = path.split("/")
        const name = paths[paths.length - 1].split('.')[0]

        app.component(name, compoents[path].default)
    }
}

export default initApp