import { Comment } from "@/service/api/comment/types"
import { defineStore } from "pinia"

const useGlobalStore = defineStore("globalState", {
    state: () => {
        return {
            isShowLoginBox: false,
            loginOrLogout: 0,// 退出或者登录  1: 登录 -1: 退出登录
            isShowPlayPage: false, // 是否展示播放歌曲的界面
            cContent: undefined as unknown as Comment, // 弹出窗评论之后同步评论信息
        }
    },
    getters: {

    },
    actions: {
        updateLoginStatus(payload: number) {
            this.loginOrLogout = payload
            setTimeout(() => {
                this.loginOrLogout = 0
            }, 2000)
        }
    },
    persist: true
})
export default useGlobalStore