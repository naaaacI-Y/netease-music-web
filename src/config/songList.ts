import useStore from "@/store"
// import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"

// 初始化侧边导航栏的歌单
import { getSongList } from '@/service/api/user';
import { Playlist_user } from '@/service/api/user/types';
import useSideSongListStore from "@/store/sideSongList";
import useUserProfileStore from "@/store/user";
// const sideSongList = useSideSongListStore()
// const userProfile = useUserProfileStore()
const hasMore = ref(false)
const createdList = reactive({ data: [] as Playlist_user[] })
const collectedList = reactive({ data: [] as Playlist_user[] })
const pages = reactive({
    limit: 30,
    page: 1
})

/**
 * 获取/更新用户歌单到store
 * @param createdFlag 1: 更新创建的歌单  0: 不更新
 * @param collectedflag  1: 更新收藏的歌单 0: 不更新
 * @param createdResetFlag  是否需要重置创建的歌单 1: 需要 0: 不需要
 * @param collectedResetFlag  是否需要重置收藏的歌单 1: 需要 0: 不需要
 * @returns
 */
export const getPersonSongList = (createdFlag: number, collectedflag: number, createdResetFlag: number, collectedResetFlag: number) => {
    console.log(pages.page, "pages.page=========");
    if (createdResetFlag) {
        createdList.data = []
    }
    if (collectedResetFlag) {
        collectedList.data = []
    }
    if (createdResetFlag || collectedResetFlag) {
        pages.page = 1
    }
    // const pages = {
    //     limit: 30,
    //     page: 1
    // }
    // const createdList = [] as Playlist_user[] // 创建的歌单信息
    // const collectedList = [] as Playlist_user[] // 收藏的歌单信息
    // let hasMore = false
    const userProfile = useUserProfileStore()
    const sideSongList = useSideSongListStore()
    if (!userProfile.userFile.userId) return;

    const getList = async () => {
        const _ = {
            uid: userProfile.userFile.userId,
            limit: pages.limit,
            offset: (pages.page - 1) * pages.limit
        }
        const r = await getSongList(_)
        if (r.code === 200) {
            hasMore.value = r.more
            const self = r.playlist.filter(item => item.creator.userId === _.uid)
            const collect = r.playlist.filter(item => item.creator.userId !== _.uid)
            createdList.data = createdList.data.concat(...self)
            collectedList.data = collectedList.data.concat(...collect)
            pages.page++
            if (hasMore.value) {
                getList()
            } else {
                // 更新至store
                createdFlag && sideSongList.updateCreatedSongList(createdList.data)
                collectedflag && sideSongList.updateCollectedSongList(collectedList.data)
            }
        }
    }
    getList()

}