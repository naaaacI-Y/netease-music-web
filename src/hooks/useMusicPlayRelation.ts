import { likeSong } from "@/service/api/music"
import Message from "@/components/message"
import useStore from "@/store"
import { computed, watch } from "vue"
import { storeToRefs } from 'pinia';
export const useMusicPlayRelation = () => {
    const { usePlayer, useGlobal, useSideSongList, userProfile } = useStore()
    const { player, likedList, currentTrackDuration } = storeToRefs(usePlayer)
    const { isShowPlayPage } = storeToRefs(useGlobal)
    const { createdSongList } = storeToRefs(useSideSongList)
    const { userFile } = storeToRefs(userProfile)
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
        const _ = {
            id,
            like
        }
        const r = await likeSong(_)
        if (r.code === 200) {
            // 更新喜欢的歌曲列表
            usePlayer.updateLikedSong(id, like)
            if (callback) {
                callback()
            }
            // // 更新状态
            // if (!like) {
            //     return Message.success("取消喜欢成功")
            // }
            // Message.success("已添加到我喜欢的音乐")
        }
    }
    // 播放歌单
    const playSongList = () => {

        // usePlayer.playPlaylistByID()
    }
    // 下一首
    const playNextSong = () => {
        // 如果是私人fm
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
        usePlayer.playOrPause()
    }
    // 播放上一首 除私人fm外
    const playPrevTrack = () => {
        usePlayer.playPrevTrack()
    }
    // 切换播放模式
    const switchMode = () => {
        usePlayer.switchRepeatMode()
    }
    // 播放私人fm
    const playPersonalFm = () => {
        usePlayer.playPersonalFM()
    }
    // 静音
    const mute = () => {
        usePlayer.mute()
    }

    return {
        player,
        likedList,
        currentTrackDuration,
        isLike,
        useGlobal,
        usePlayer,
        isShowPlayPage,
        userFile,
        createdSongList, // 创建的歌单
        likeMusic,
        delete2PlayNext,
        playNextSong,
        musicPlay,
        playPrevTrack,
        switchMode,
        isLikeMusic,
        mute,
        playPersonalFm,

    }
}