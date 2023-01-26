import { checkLogin } from '@/utils';
import { likeSong } from "@/service/api/music"
import Message from "@/components/message"
import useStore from "@/store"
import { computed, ref, watch } from "vue"
import { storeToRefs } from 'pinia';
import { useRoute } from "vue-router";
export const useMusicPlayRelation = () => {
    const { usePlayer, useGlobal, useSideSongList, userProfile, useTheme } = useStore()
    const { player, likedList, currentTrackDuration } = storeToRefs(usePlayer)
    const { isShowPlayPage, isShowLoginBox } = storeToRefs(useGlobal)
    const { createdSongList, collectedSongList } = storeToRefs(useSideSongList)
    const { userFile } = storeToRefs(userProfile)
    const { theme } = storeToRefs(useTheme)
    const isHaveCopyRight = ref(true) // 是否需要版权
    const isNeedVip = ref(false) // 是否需要vip
    const isNeedBuy = ref(false) // 是否需要购买
    const route = useRoute()
    // 是否喜欢
    const isLikeMusic = (id: number) => {
        return likedList.value.includes(id)
    }
    const isLike = computed(() => {
        if (!player.value.enabled) return false
        const cid = player.value.isPersonalFM ? player.value.personalFMTrack.id : player.value.currentTrack.id
        return likedList.value.includes(cid)
    })

    // 喜欢音乐
    const likeMusic = async (id: number, like: boolean, callback?: Function) => {
        if (!checkLogin()) {
            return isShowLoginBox.value = true
        }
        const _ = {
            id,
            like
        }
        try {
            const r = await likeSong(_)
            // 更新喜欢的歌曲列表
            usePlayer.updateLikedSong(id, like)
            if (callback) {
                callback()
            }
            if (!like) {
                return Message.success("取消喜欢成功")
            }
            Message.success("已添加到我喜欢的音乐")
        } catch (error) {

        }
    }

    const messageTip = () => {
        if (!isHaveCopyRight.value) {
            Message.error("暂无资源>_<")
            return 1
        }
        if (isNeedVip.value) {
            Message.error("开通vip可畅听当前歌曲")
            return 1
        }
        if (isNeedBuy.value) {
            Message.error("需购买专辑可畅听当前歌曲")
            return 1
        }
    }

    /**
     * 检查歌曲版权信息，是否可播放
     * fee === 0 ==> 免费或是无版权的
     * fee === 1 ==> vip歌曲，用户是否是vip
     * fee === 4 ==> 需要购买专辑， 检查是否已购买 暂时不做
     * fee === 8 ==> 非会员可播放低音质 正常展示
     * copyrightId: 最新音乐列表传copyrightId 普通歌单传 !noCopyrightRcmd
     */
    const checkMusicCopyright = (fee: number, copyrightId: any) => {
        let r: boolean
        switch (fee) {
            case 0:
                if (!copyrightId) {
                    isHaveCopyRight.value = false
                    r = false
                } else {
                    r = true
                }
                break;
            case 1:
                // 检查用户是否是vip 不需要考虑用户开通会员的问题
                if (!userFile.value?.profile?.vipType) {
                    isNeedVip.value = true
                    r = false
                } else {
                    r = true
                }
                break
            case 4:
                isNeedBuy.value = true
                r = false
                break
            default:
                r = true
                break;
        }
        return r
    }
    /**
     * 播放歌单全部歌曲
     * @param ids 歌单歌曲列表 序列化之后的字符串
     * @param id 歌单id 用于在点击播放歌单单曲的时候比对是否是播放当前歌单，如果是则通过歌曲id播放歌单音乐(playTrackOnListByID)，否则直接播放新的歌单
     */
    const playSongList = (ids: string, id: number, songId?: number) => {
        // 如果当前的资源id和路径查询参数的id一致并且在播放中 直接返回
        if (player.value.playlistSource.id === id) {
            if (!player.value.playing) {
                usePlayer.play()
            }
            return
        }
        usePlayer.replacePlaylist(JSON.parse(ids), id, 'playlist', songId ?? -1)
    }

    /**
     * 播放单曲
     * @param ids 歌单列表
     * @param id  歌曲id
     * @param sourceId  资源id
     * @returns
     */
    const playSingleMusic = async (ids: number[], id: number, sourceId: number) => {
        // 如果当前正在播放 并且歌曲id和点击的一致
        if (player.value.currentTrack.id === id) {
            // // 如果当前正在播放的是私人fm的歌曲，点击了列表同样歌曲
            // if (player.value.isPersonalFM) {
            //     return playSongList(JSON.stringify(ids), id, sourceId)
            // }
            if (player.value.playing) return
            return usePlayer.playOrPause()
        }
        // 如果播放单首歌曲，例如，搜索，最新音乐 相似音乐，传入的sourceId为-1
        if (sourceId === -1) {
            // 如果当前有播放的列表
            if (player.value.list.length) {
                return usePlayer.addTrackToPlay(id)
            }
            // 如果当前没有播放的歌曲
            if (!player.value.list.length) {
                return usePlayer.replacePlaylist([id], sourceId, "singel-play")
            }

        }
        // 如果当前的歌单id和playlistsource的一致
        if (player.value.playlistSource.id === sourceId) {
            return usePlayer.playTrackOnListByID(id)
        }
        // 如果不一致 播放新的歌单
        // 歌曲id在列表中的位置
        const idx = ids.findIndex(item => item === id)
        if (!ids.length) {
            return Message.error("惊不惊喜，一首都不让你听>_<")
        }
        playSongList(JSON.stringify(ids), sourceId, idx !== 0 ? id : undefined)
    }

    const scrollTop = () => {
        if (isShowPlayPage.value) {
            // 滚动到顶部
            const el = document.getElementsByClassName("music-play-wrapper")[0]
            el?.scrollTo(0, 0)
        }
        if (route.path === "/personal-fm") {
            const el = document.getElementsByClassName("content")[0]
            el?.scrollTo(0, 0)
        }
    }
    // 下一首
    const playNextSong = () => {
        // 如果是私人fm
        scrollTop()
        if (player.value.isPersonalFM) {
            return usePlayer.playNextFMTrack()
        }
        usePlayer.playNextTrack()
    }
    // 移动垃圾桶 ==> 私人fm
    const delete2PlayNext = () => {
        usePlayer.moveToFMTrash()
    }
    // 音乐播放/暂停
    const musicPlay = () => {
        if (player.value.enabled) {
            // 如果有播放中的歌曲并且不是私人fm

            usePlayer.playOrPause()
        }
    }
    // 播放上一首 除私人fm外
    const playPrevTrack = () => {
        if (player.value.enabled) {
            scrollTop()
            usePlayer.playPrevTrack()
        }
    }
    // 切换播放模式
    const switchMode = () => {
        usePlayer.switchRepeatMode()
    }
    // 播放私人fm
    const playPersonalFm = () => {
        usePlayer.playPersonalFM()
    }
    // 播放下一首私人fm
    const playnextFm = () => {
        usePlayer.playNextFMTrack()
    }
    // 静音
    const mute = () => {
        usePlayer.mute()
    }

    return {
        player,
        theme,
        likedList,
        currentTrackDuration,
        isLike,
        useGlobal,
        usePlayer,
        isShowPlayPage,
        userFile,
        collectedSongList,
        useSideSongList,
        isHaveCopyRight,
        isNeedVip,
        isNeedBuy,
        createdSongList, // 创建的歌单
        likeMusic,
        delete2PlayNext,
        playNextSong,
        musicPlay,
        playPrevTrack,
        switchMode,
        isLikeMusic,
        mute,
        playSongList,
        playPersonalFm,
        playSingleMusic,
        checkMusicCopyright,
        messageTip,
        playnextFm,
        isShowLoginBox

    }
}