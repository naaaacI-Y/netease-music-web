import { Comment } from "@/service/api/comment/types"
import { defineStore } from "pinia"

const useGlobalStore = defineStore("globalState", {
    state: () => {
        return {
            isShowLoginBox: false,
            isShowPlayPage: false, // 是否展示播放歌曲的界面
            cContent: undefined as unknown as Comment, // 弹出窗评论之后同步评论信息
        }
    },
    getters: {

    },
    actions: {

    },
    persist: true
})
export default useGlobalStore