import { list } from "@/service/api/comment/types"
import { collectOrCancelMv, collectOrCancelVideo, getCollectedVideo, getVieoCountInfo, voteToVideo } from "@/service/api/video"
import { CollectedVideoResult, CollectOrCancelMvParams, CollectOrCancelVideoParams, VideoCountInfo, VoteToVideoParams } from "@/service/api/video/types"
import useGlobalState from "@/store/globalState"
import Message from "@/components/message"
import { checkLogin } from "@/utils"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { getMvInfo } from "@/service/api/mv"


export const useVideoVoteAndCollect = function () {
    const globalState = useGlobalState()
    const route = useRoute()
    const queryId = route.params.id as string
    const isLiked = ref(false) // 是否点赞
    const likeCount = ref(0) // 点赞数量，用作缓存
    const subsCount = ref(0) // 收藏数量，用户缓存
    const isSubscribe = ref(false)  // 是否已收藏
    // 视频/mv是否收藏
    const getIsSubscribed = async (id: string | number) => {
        const r = await getCollectedVideo()
        let idx: number
        let susList: CollectedVideoResult["data"]
        if (Number(id)) {
            // mv
            susList = r.data.filter(item => Number(item.vid))
            idx = susList.findIndex(item => Number(item.vid) === id)
        } else {
            // 视频
            susList = r.data.filter(item => !Number(item.vid))
            idx = susList.findIndex(item => item.vid === id)
        }
        isSubscribe.value = idx !== -1

    }
    // 视频是否已点赞 ==> 通过视频点赞数据接口
    // type: 1 mv 2 video
    const getIsVoted = async (type: number, id: number | string) => {
        let r: VideoCountInfo
        if (type === 1) {
            r = await getMvInfo({ mvid: Number(id) })
        } else {

            r = await getVieoCountInfo({ vid: id as string })
        }

        likeCount.value = r.likedCount ?? 0
        isLiked.value = r.liked
    }
    // 点赞 视频和mv公用接口
    const voteVideo = async () => {
        if (!checkLogin()) {
            globalState.isShowLoginBox = true
            return
        }
        const qId = route.params.id
        const _: VoteToVideoParams = {
            id: Number(qId) ? Number(qId) : qId as string,
            type: Number(qId) ? 1 : 5 as list,
            t: isLiked.value ? 0 : 1
        }
        const r = await voteToVideo(_)
        if (r.code === 200) {
            // 不请求接口，取缓存的点赞数量
            isLiked.value ? likeCount.value-- : likeCount.value++
            isLiked.value = !isLiked.value
        }
    }
    // 收藏
    const collectVideoOrMv = async () => {
        if (!checkLogin()) {
            globalState.isShowLoginBox = true
            return
        }
        const qId = route.params.id
        let params: CollectOrCancelVideoParams | CollectOrCancelMvParams;
        let r: { code: number }
        if (!Number(qId)) {
            // 视频
            params = {
                id: qId as string,
                t: isSubscribe.value ? 0 : 1
            }
            r = await collectOrCancelVideo(params)
        } else {
            // mv
            params = {
                mvid: Number(qId),
                t: isSubscribe.value ? 0 : 1
            }
            r = await collectOrCancelMv(params)
        }
        if (r.code === 200) {
            isSubscribe.value ? subsCount.value-- : subsCount.value++
            const message = isSubscribe.value ? '取消收藏视频成功!' : "视频收藏成功!"
            Message.success(message)
            isSubscribe.value = !isSubscribe.value
        }
    }
    return {
        collectVideoOrMv,
        voteVideo,
        getIsSubscribed,
        getIsVoted,
        isLiked,
        likeCount,
        queryId,
        subsCount,
        isSubscribe
    }
}


