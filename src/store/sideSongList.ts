
import { Playlist_user } from "@/service/api/user/types"
import { defineStore } from "pinia"

const useSideSongListStoreStore = defineStore("sideSongList", {
    state: () => {
        return {
            createdSongList: [] as Playlist_user[],
            collectedSongList: [] as Playlist_user[]
        }
    },
    getters: {

    },
    actions: {
        // 更新创建的歌单
        updateCreatedSongList(list: Playlist_user[]) {
            this.createdSongList = list
        },
        // 更新收藏的歌单
        updateCollectedSongList(list: Playlist_user[]) {
            this.collectedSongList = list
        }
    },
    persist: true
})
export default useSideSongListStoreStore