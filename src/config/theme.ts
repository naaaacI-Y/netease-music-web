import useThemeState from "@/store/theme"
import { storeToRefs } from "pinia"

const defaultTheme: string = "white" // 默认主题
let currentTheme: string = "" // 当前使用的主题



// 初始化系统主题
const initTheme = () => {
    changeTheme(getCurrentTheme())
}

// 切换主题
const changeTheme = (theme: string) => {
    useThemeState().changeThemem(theme)
    currentTheme = theme
    document.documentElement.setAttribute("data-theme", currentTheme)

}
// 获取当前使用的主题
const getCurrentTheme = () => {
    if (currentTheme) {
        return currentTheme
    }
    currentTheme = storeToRefs(useThemeState()).theme.value
    currentTheme = currentTheme || defaultTheme
    return currentTheme
}
export {
    initTheme,
    getCurrentTheme,
    changeTheme
}