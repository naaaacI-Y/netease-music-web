import { checkLogin } from '@/utils';
import { reactive, ref } from "vue"

// 初始化侧边导航栏的歌单
import { getSongList } from '@/service/api/user';
import { Playlist_user } from '@/service/api/user/types';
import useSideSongListStore from "@/store/sideSongList";
import useUserProfileStore from "@/store/user";

const hasMore = ref(false)
const createdList = reactive({ data: [] as Playlist_user[] })
const collectedList = reactive({ data: [] as Playlist_user[] })
const pages = reactive({
    limit: 1000, // 一次全部取回
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
    const userProfile = useUserProfileStore()
    const sideSongList = useSideSongListStore()
    if (!checkLogin()) {
        // 没有登陆 从本地获取  清空已有的创建和收藏的歌单 后面再做
        // const list = localStorage.getItem("sideSongList")
        // likeSongList[0].createTime = new Date().getTime()
        // if (!list) {
        //     return sideSongList.updateTempCreatedSongList(likeSongList)
        // }
        // const temp = JSON.parse(list!).tempCreatedSongList || []
        // return sideSongList.updateTempCreatedSongList(temp.length ? temp : likeSongList)
        return
    }
    if (createdResetFlag) {
        createdList.data = []
    }
    if (collectedResetFlag) {
        collectedList.data = []
    }
    if (createdResetFlag || collectedResetFlag) {
        pages.page = 1
    }

    if (!userProfile.userFile?.profile?.userId) return;

    const getList = async () => {
        const _ = {
            uid: userProfile.userFile?.profile?.userId,
            limit: pages.limit,
            offset: (pages.page - 1) * pages.limit
        }
        try {
            const r = await getSongList(_)
            hasMore.value = r.more
            const self = r.playlist.filter(item => item.creator.userId === _.uid && item.trackCount)
            const collect = r.playlist.filter(item => item.creator.userId !== _.uid && item.trackCount)
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
        } catch (error) {
        }
    }
    getList()

}