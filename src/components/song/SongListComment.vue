<template>
    <div id="song-list-comment-wrapper">
        <div class="comment pt-20">
            <div class="comment-title mb-10" v-if="isShowTitle">
                <span class="mr-4 text-00">听友评论</span>
                <span class="fs-1 text-66">(已有{{ pages.total }}条评论)</span>
            </div>
            <div class="comment-input">
                <textarea id="textArea" rows="4" maxlength="140" v-model="commentContent" class="text-33"
                    placeholder="输入评论或@朋友"></textarea>
            </div>
            <div class="max-length fs-2 text-99 pr-10" :style="{ top: isShowTitle ? '110px' : '80px' }">{{ maxLength -
            commentContent.length }}</div>
            <div class="bottom-line mt-6 d-flex ai-center jc-between">
                <div class="operate text-66">
                    <i class="iconfont icon-Smile fs-7 mr-9 "></i>
                    <i class="iconfont icon-aite1 fs-7 mr-9"></i>
                    <i class="iconfont icon-wangge fs-7"></i>
                </div>
                <div class="submit-comment  fs-3 d-flex ai-center jc-center text-66"
                    :class="maxLength === 140 ? 'hasNoContent' : ''" @click="submitContent">评论</div>
            </div>
            <div class="top-vote-comment mt-30" v-if="hotCommentList.data?.length && pages.page === 1">
                <div class="comment-label text-4e mb-15">精彩评论</div>
                <CommentItem v-for="(item) in hotCommentList.data.slice(0, 10)" :is-grey="isGrey"
                    :comment-content="item" :key="item.commentId"></CommentItem>
                <div class="more-wrap d-flex ai-center jc-center">
                    <div class="more d-flex ai-center" v-if="hasMoreHot" @click="goMoreHotComment">
                        <span class="fs-2 mr-5 text-33">更多精彩评论</span>
                        <i class="iconfont icon-xiangyou1 fs-4"></i>
                    </div>
                </div>
            </div>
            <div class="new-comment mt-30" v-if="allComment.data?.length">
                <div class="comment-label text-4e mb-15" id="new-comment-pos">最新评论</div>
                <CommentItem v-for="(item) in allComment.data" :is-grey="isGrey" :comment-content="item"
                    :key="item.commentId"></CommentItem>
            </div>
            <div class="no-data text-66 mt-20 fs-3" v-if="!allComment.data?.length">还没有评论，快来抢沙发~</div>
            <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
                @page-change="handlePageChange" class="mt-30 mb-30" :index="paginationIndex">
            </Pagination>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import { computed, reactive, ref, watch } from 'vue';
import CommentItem from '../CommentItem.vue';
import useGlobalState from '@/store/globalState';
import { Comment, HotComment, list, t } from "@/service/api/comment/types"
import { checkLogin, getQueryId } from "@/utils"
import Message from "@/components/message"
import { getComment4Album } from '@/service/api/album';
import { getComment4MV } from '@/service/api/mv';
import { getComment4Song, getComment4SongList } from "@/service/api/music"
import { SongListCommentParams, SongListCommentResult } from '@/service/api/music/types';
import { useRoute } from 'vue-router';
import { getComment4Video } from '@/service/api/video';
import router from '@/router';
import { VideoCommentParams } from '@/service/api/video/types';
import { sendOrReplyComment } from '@/service/api/comment';
const route = useRoute()
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
const props = withDefaults(defineProps<{
    isGrey?: boolean
    // sourceType: list
    sourceType: 0 | 1 | 2 | 3 | 5
    isShowTitle?: boolean
}>(), {
    isGrey: true,
    sourceType: 3,
    isShowTitle: false
})
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const paginationIndex = ref(0)

const id = getQueryId() as number | string // id
const allComment = reactive({ data: [] as Comment[] }) // 所有评论
const hotCommentList = reactive({ data: [] as HotComment[] }) // 热门评论
const commentContent = ref("") //
const hasMoreHot = ref(false) // 是否有更多热评
// const hasMore = ref(false) // 是否有更多评论
watch(() => pages.page, () => {
    getAllComment(id)
    // 滚动到指定位置
    scrollToPos()
})
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})


// 提交评论
const submitContent = async () => {
    if (!commentContent.value.trim()) {
        return Message.error("写点东西吧，内容不能为空哦！")
    }

    if (!checkLogin()) {
        // 如果没有登录 显示登录弹窗
        return useGlobalState().isShowLoginBox = true
    }
    const _ = {
        t: 1 as t,
        id,
        type: props.sourceType,
        content: commentContent.value.trim()
    }
    const r = await sendOrReplyComment(_)
    if (r.code === 200) {
        // 重新获取评论
        await getAllComment(id)
        Message.success("评论成功！")
        commentContent.value = ""
    }
}
// 滚动到指定位置
const scrollToPos = () => {
    const item = document.getElementById("new-comment-pos")
    item!.scrollIntoView()
}
// 更多热评
const goMoreHotComment = () => {
    router.push(`/hot-comment/${id}/${props.sourceType}`)
}
// 处理分页页码变化
const handlePageChange = (num: number) => {
    pages.page = num
}
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
    hotCommentList.data = r.hotComments.length ? r.hotComments : hotCommentList.data
    hasMoreHot.value = r.moreHot
    // hasMore.value = r.more
}
getAllComment(id)
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
