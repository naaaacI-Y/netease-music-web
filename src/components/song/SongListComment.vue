<template>
    <div class="song-list-comment-wrapper">
        <div class="comment pt-20">
            <div class="comment-title mb-10" v-if="isShowTitle">
                <span class="mr-4 text-00">听友评论</span>
                <span class="fs-1 text-66">(已有{{ totalComment }}条评论)</span>
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
            <div class="top-vote-comment mt-30" v-if="hotCommentList.data.length">
                <div class="comment-label text-4e mb-15">精彩评论</div>
                <CommentItem v-for="(item) in hotCommentList.data.slice(0, 10)" :is-grey="isGrey"
                    :comment-content="item" :key="item.commentId"></CommentItem>
                <div class="more-wrap d-flex ai-center jc-center">
                    <div class="more d-flex ai-center" v-if="hasMoreHot" @click="goMoreHotComment">
                        <span class="fs-2 mr-5">更多精彩评论</span>
                        <i class="iconfont icon-xiangyou1 fs-4"></i>
                    </div>
                </div>
            </div>
            <div class="new-comment mt-30">
                <div class="comment-label text-4e mb-15">最新评论</div>
                <CommentItem v-for="(item) in allComment.data" :is-grey="isGrey" :comment-content="item"
                    :key="item.commentId"></CommentItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import CommentItem from '../CommentItem.vue';
import { Comment, HotComment } from "@/service/api/comment/types"
import { getQueryId } from "@/utils"
import { getAlbumComment } from '@/service/api/album';
import { getMVComment } from '@/service/api/mv';
import { getComment4Song, getComment4SongList } from "@/service/api/music"
import { SongListCommentResult } from '@/service/api/music/types';
import { useRoute } from 'vue-router';
import { getComment4Video } from '@/service/api/video';
const route = useRoute()
// 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台节目 5: 视频 6: 动态 7: 电台
const props = withDefaults(defineProps<{
    isGrey?: boolean
    sourceType: 0 | 1 | 2 | 3 | 5
    isShowTitle?: boolean
}>(), {
    isGrey: true,
    sourceType: 3,
    isShowTitle: false
})
watch(() => route.params.id, (newVal) => {
    getAllComment(Number(newVal))
})
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})
const id = getQueryId() as number | string // id
const allComment = reactive({ data: [] as Comment[] }) // 所有评论
const hotCommentList = reactive({ data: [] as HotComment[] }) // 热门评论
const commentContent = ref("") //
const totalComment = ref(0) // 总评论数量
const hasMoreHot = ref(false) // 是否有更多热评
const hasMore = ref(false) // 是否有更多评论
// 提交评论
const submitContent = () => {

}

// 更多热评
const goMoreHotComment = () => {

}
const getAllComment = async (id: string | number) => {
    let r: SongListCommentResult;

    switch (props.sourceType) {
        case 0:
            r = await getComment4Song({ id } as { id: number })
            break;
        case 1:
            r = await getMVComment({ id } as { id: number })
            break;
        case 2:
            r = await getComment4SongList({ id } as { id: number })
            break
        case 3:
            r = await getAlbumComment({ id } as { id: number })
            break;
        case 5:
            r = await getComment4Video({ id } as { id: string })
            break
        // case 6:
        //     break
        // default:
        //     break;
    }
    allComment.data = r.comments
    totalComment.value = r.total
    hotCommentList.data = r.hotComments
    hasMoreHot.value = r.moreHot
    hasMore.value = r.more
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
        border: 1px solid #ddd;
        padding: 5px 10px;
        width: 120px;
        border-radius: 20px;

        i {
            color: #ddd;
        }

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
