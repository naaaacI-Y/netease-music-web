// 全局初始化

import { getPersonSongList } from "./songList"
import { initTheme } from "./theme"

const initApp = () => {
    // 初始化注册全局组件

    // 初始化主题
    initTheme()
    // 初始化侧边栏歌单
    getPersonSongList(1, 1, 0, 0)
}

export default initApp