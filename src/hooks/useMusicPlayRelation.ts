import { likeSong } from "@/service/api/music"
import Message from "@/components/message"
import useStore from "@/store"
import { computed } from "vue"
import { storeToRefs } from 'pinia';
export const useMusicPlayRelation = () => {
    const { usePlayer, useGlobal, useSideSongList, userProfile } = useStore()
    const { player, likedList, currentTrackDuration } = storeToRefs(usePlayer)
    const { isShowPlayPage } = storeToRefs(useGlobal)
    const { createdSongList } = storeToRefs(useSideSongList)
    const { userFile } = storeToRefs(userProfile)
    // 是否喜欢
    const isLike = computed(() => {
        return likedList.value.includes(player.value.currentTrack.id)
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
            // 更新状态
            if (!like) {
                return Message.success("取消喜欢成功")
            }
            Message.success("已添加到我喜欢的音乐")
        }
    }
    // 下一首
    const playNextSong = () => {
        if (player.value.isPersonalFM) {
            // 如果是私人fm
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
        const list = ["one", "on", "off"]
        let index = list.indexOf(player.value.repeatMode)
        player.value.repeatMode = list[++index > 2 ? 0 : index]
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
        likeMusic,
        delete2PlayNext,
        playNextSong,
        musicPlay,
        playPrevTrack,
        switchMode,
        player,
        likedList,
        currentTrackDuration,
        isLike,
        mute,
        useGlobal,
        usePlayer,
        isShowPlayPage,
        playPersonalFm,
        userFile,
        createdSongList // 创建的歌单
    }
}