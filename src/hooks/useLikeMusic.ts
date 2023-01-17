import { likeSong } from "@/service/api/music"
import Message from "@/components/message"
import useStore from "@/store"

const useLikeMusic = () => {
    const { usePlayerTest } = useStore()
    const likeMusic = async (id: number, like: boolean, callback?: Function) => {
        const _ = {
            id,
            like
        }
        const r = await likeSong(_)
        if (r.code === 200) {
            // 更新喜欢的歌曲列表
            usePlayerTest.updateLikedSong(id, like)
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
    return {
        likeMusic
    }
}
export default useLikeMusic