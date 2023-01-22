<template>
    <div id="song-list-comment-wrapper">
        <div class="comment pt-20">
            <div class="comment-title mb-10" v-if="isShowTitle">
                <span class="mr-4 text-00">听友评论</span>
                <span class="fs-1 text-66">(已有{{ pages.total ?? 0 }}条评论)</span>
            </div>
            <div class="comment-input" v-if="isShowInputBox">
                <textarea id="textArea" rows="4" maxlength="140" v-model="commentContent" class="text-33" ref="textArea"
                    placeholder="输入评论或@朋友">
                </textarea>
            </div>
            <div class="max-length fs-2 text-99 pr-10" :style="{ top: isShowTitle ? '110px' : '80px' }"
                v-if="isShowInputBox">
                {{ maxLength - commentContent.length }}
            </div>
            <!--单曲播放界面的评论框-->
            <slot name="song-box"></slot>

            <div class="bottom-line mt-6 d-flex ai-center jc-between" v-if="isShowInputBox">
                <div class="operate text-66">
                    <i class="iconfont icon-Smile fs-7 mr-9 "></i>
                    <i class="iconfont icon-aite1 fs-7 mr-9"></i>
                    <i class="iconfont icon-wangge fs-7"></i>
                </div>
                <div class="submit-comment  fs-3 d-flex ai-center jc-center text-66"
                    :class="maxLength === 140 ? 'hasNoContent' : ''" @click="submitContent">评论</div>
            </div>
            <div class="top-vote-comment mt-30"
                v-if="hotCommentList.data?.length && pages.page === 1 && !isShowLoading">
                <div class="comment-label text-4e mb-15">精彩评论</div>
                <CommentItem v-for="(item) in hotCommentList.data.slice(0, 10)" :is-grey="isGrey"
                    @active-comment="activeComment" :comment-content="item" :key="item.commentId" :type="sourceType">
                </CommentItem>
                <div class="more-wrap d-flex ai-center jc-center">
                    <div class="more d-flex ai-center" v-if="hasMoreHot" @click="goMoreHotComment">
                        <span class="fs-2 mr-5 text-33">更多精彩评论</span>
                        <i class="iconfont icon-xiangyou1 fs-4"></i>
                    </div>
                </div>
            </div>
            <div class="new-comment mt-30" v-if="allComment.data?.length && !isShowLoading" id="new-comment-pos">
                <div class="comment-label text-4e mb-15">最新评论</div>
                <CommentItem v-for="(item) in allComment.data" :is-grey="isGrey" :comment-content="item"
                    @active-comment="activeComment" :key="item.commentId" :type="sourceType">
                </CommentItem>
            </div>
            <div class="no-data text-66 mt-20 fs-3" v-if="!allComment.data?.length && !isShowLoading">还没有评论，快来抢沙发~</div>
            <Pagination v-if="pages.total >= pages.size && !isShowLoading" :total="pages.total" :size="pages.size"
                :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30" :index="paginationIndex">
            </Pagination>
            <Loading v-show="isShowLoading"></Loading>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import { computed, reactive, ref, watch } from 'vue';
import CommentItem from '../CommentItem.vue';
import useGlobalStore from '@/store/globalStore';
import { Comment, HotComment, SendOrReplyCommentParam, t } from "@/service/api/comment/types"
import { checkLogin, getQueryId, scrollToTop } from "@/utils"
import Message from "@/components/message"
import { getComment4Album } from '@/service/api/album';
import { getComment4MV } from '@/service/api/mv';
import { getComment4Song, getComment4SongList } from "@/service/api/music"
import { SongListCommentParams, SongListCommentResult } from '@/service/api/music/types';
import { getComment4Video } from '@/service/api/video';
import { VideoCommentParams } from '@/service/api/video/types';
import { sendOrReplyComment } from '@/service/api/comment';
import { useRouter, useRoute } from 'vue-router';
import useStore from "@/store"
import { storeToRefs } from 'pinia';
import useInsertComment from '@/hooks/useInsertComment';
const { usePlayer, useGlobal } = useStore()
const { player } = storeToRefs(usePlayer)
const { cContent } = storeToRefs(useGlobal)
const router = useRouter()
const route = useRoute()
const replyPerson = ref("")
const isShowLoading = ref(false)
const paginationIndex = ref(0)
const commentId = ref<number>()
const textArea = ref<HTMLInputElement | null>(null)
const id = getQueryId() as number | string // id
const allComment = reactive({ data: [] as Comment[] }) // 所有评论
const hotCommentList = reactive({ data: [] as HotComment[] }) // 热门评论
const commentContent = ref("") // 评论内容
const hasMoreHot = ref(false) // 是否有更多热评
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
const props = withDefaults(defineProps<{
    isGrey?: boolean
    // sourceType: list
    sourceType: 0 | 1 | 2 | 3 | 5
    isShowTitle?: boolean
    isShowInputBox?: boolean
}>(), {
    isGrey: true, // 用在动态里面
    sourceType: 3,
    isShowTitle: false, // 是否显示 "听友评论"
    isShowInputBox: true // 是否显示评论输入框
})
const emits = defineEmits<{
    (e: "changeCommentCount", count: number): void
    (e: "updateSimilarList"): void
}>()
// 计算后的歌曲id 单曲播放界面/私人fm播放
const cid = computed(() => {
    return useGlobal.isShowPlayPage ? player.value.currentTrack.id : (id ? id : player.value.personalFMTrack.id)
})

watch(() => pages.page, async (newVal) => {
    if (route.path === "/personal-fm") {
        scrollToTop()
    }
    if (newVal === 1 && useGlobal.isShowPlayPage) {
        scrollToTop("music-play-wrapper")
    }
    if (newVal !== 1) {
        // 滚动到最新评论处
        scrollToTop("music-play-wrapper", 625)
    }
    getAllComment(cid.value)
})
watch(() => route.params.id, (newVal) => {
    allComment.data = []
    hotCommentList.data = []
    getAllComment(newVal as string)
})
// 同步弹出窗的评论之后的评论信息同步
watch(() => cContent.value, async (newVal) => {
    if (newVal) {
        inserData()
    }

    // if (isShowPlayPage.value && newVal) {
    //     inserData()
    // }
})

watch(() => cid.value, (newVal) => {
    // 更新评论
    pages.page = 1

    console.log("歌曲切换，更新评论========");
    isShowLoading.value = true
    getAllComment(newVal)
    // 更新相似歌曲
    emits("updateSimilarList")

})
// 最大长度
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})

// 插入评论数据
const inserData = () => {
    // 插入数据
    const insertData = useInsertComment(useGlobal.cContent)
    allComment.data.unshift(insertData)
    // 清空评论内容
    cContent.value = "" as unknown as Comment
}

// 激活评论框
const activeComment = (info: { name: string, commentId: number }) => {
    commentContent.value = "回复" + info.name + '：'
    replyPerson.value = info.name + '：' // 记录被回复用户名
    // 滚动到评论框处
    scrollToTop()
    commentId.value = info.commentId
    // 获取焦点
    textArea.value!.focus()
}

// 检查发布还是回复评论 以及返回评论的内容
const checkIsPublishOrReply = () => {
    const splitList = commentContent.value.split(replyPerson.value)
    if (splitList.length === 1) {
        // 发表评论
        return ["publish", splitList[0]]
    }
    if (splitList.length === commentContent.value.length) {
        return ["publish", commentContent.value]
    }
    const idx = splitList.findIndex(item => item === replyPerson.value)
    if (idx !== -1) {
        // 如果可以找到被回复用户的昵称也是发表评论
        return ["publish", splitList.join("")]
    }
    return ["reply", splitList[splitList.length - 1]]
}

// 提交评论
const submitContent = async () => {
    const commentType = checkIsPublishOrReply()
    if (!commentContent.value.trim() || !commentType[1].trim().length) {
        return Message.error("写点东西吧，内容不能为空哦！")
    }
    if (!checkLogin()) {
        // 如果没有登录 显示登录弹窗
        return useGlobalStore().isShowLoginBox = true
    }
    const _: SendOrReplyCommentParam = {
        t: commentType[0] === "publish" ? 1 : 2 as t,
        id,
        type: props.sourceType,
        content: commentType[1],
    }
    if (commentType[0] === "reply") {
        _.commentId = commentId.value
    }
    const r = await sendOrReplyComment(_)
    if (r.code === 200) {
        // 插入数据
        inserData()
        Message.success("评论成功！")
        commentContent.value = ""
        replyPerson.value = ""
    }
}

// 更多热评
const goMoreHotComment = () => {
    // 如果当前展示了播放界面
    if (useGlobal.isShowPlayPage) {
        useGlobal.isShowPlayPage = false
        return router.push(`/hot-comment/${player.value.currentTrack.id}/${props.sourceType}`)
    }
    router.push(`/hot-comment/${id}/${props.sourceType}`)
}

// 处理分页页码变化
const handlePageChange = (num: number) => {
    pages.page = num
}

// 获取所有评论 根据不同的分类
const getAllComment = async (id: string | number) => {
    let r: SongListCommentResult;
    const queryInfo: { [key: string]: any } = {
        id,
        limit: pages.size,
        offset: (pages.page - 1) * pages.size
    }
    // TODO  遇到问题了再看
    // if (pages.total && pages.total > 5000) {
    //     queryInfo.before = allComment.data[allComment.data.length - 1].time
    // }
    isShowLoading.value = true
    switch (props.sourceType) {
        case 0:
            r = await getComment4Song(queryInfo as SongListCommentParams)
            break;
        case 1:
            r = await getComment4MV(queryInfo as SongListCommentParams)
            break;
        case 2:
            r = await getComment4SongList(queryInfo as SongListCommentParams)
            break
        case 3:
            r = await getComment4Album(queryInfo as SongListCommentParams)
            break;
        case 5:
            r = await getComment4Video(queryInfo as VideoCommentParams)
            break
        // case 6:
        //     break
        // default:
        //     break;
    }
    allComment.data = r.comments
    pages.total = r.total
    hotCommentList.data = r.hotComments?.length ? r.hotComments : hotCommentList.data
    hasMoreHot.value = r.moreHot
    isShowLoading.value = false
    emits("changeCommentCount", r.total)
    // hasMore.value = r.more
}

// 向外暴露获取评论的方法
defineExpose({
    getAllComment
})

getAllComment(cid.value)
</script>
<style lang="scss" scoped>
.comment {
    position: relative;

    #textArea {
        width: 100%;
        resize: none;
        border: 1px solid var(--theme-e5);
        border-radius: 8px;
        padding: 8px 12px;
        background-color: var(--theme-35);

        &::placeholder {
            color: var(--theme-d4);
        }
    }

    .max-length {
        position: absolute;
        // top: 80px;
        // top: 110px;
        right: 0px;
    }

    .submit-comment {
        width: 60px;
        height: 30px;
        border-radius: 20px;
        border: 1px solid var(--theme-e5);

        &:hover {
            cursor: pointer;
        }
    }

    .top-vote-comment .more {
        border: 1px solid var(--theme-dd);
        padding: 5px 10px;
        width: 120px;
        border-radius: 20px;

        i {
            color: var(--theme-dd);
        }

        &:hover {
            cursor: pointer;
        }
    }

    .no-data {
        text-align: center;
    }
}
</style>
