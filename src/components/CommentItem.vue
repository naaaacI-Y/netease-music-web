<template>
    <div class="comment-item-wrapper d-flex mb-20">
        <div class="commoent-left mr-15">
            <div class="comment-avatar" @click="goPersonCenter(commentContent?.user?.userId)">
                <img :src="formatPicUrl(commentContent?.user?.avatarUrl, 35, 35)" alt="" class="avatar"
                    v-if="commentContent?.user?.avatarUrl">
                <div class="flag" v-if="commentContent?.user?.avatarDetail">
                    <img :src="formatPicUrl(commentContent?.user?.avatarDetail?.identityIconUrl, 16, 16)" alt="">
                </div>
            </div>
        </div>
        <div class="commoent-right">
            <div class="right-top fs-2 mb-10">
                <span class="comment-name text-shadow_blue " @click="goPersonCenter(commentContent?.user?.userId)">
                    {{ commentContent?.user?.nickname }}：
                </span>
                <span class="text-33">{{ commentContent.content }}</span>
            </div>
            <div class="right-middle fs-2   mb-10" style="padding: 9px;" :class="isGrey ? 'bg-f6' : 'bg-fa'"
                v-if="commentContent?.beReplied?.length">
                <span class="origin-reply text-shadow_blue"
                    @click="goPersonCenter(commentContent?.beReplied[0]?.user?.userId)">
                    @{{ commentContent?.beReplied[0]?.user?.nickname }}：
                </span>
                <span class="text-97">{{ commentContent?.beReplied[0]?.content }}</span>
            </div>
            <div class="right-bottom text-99 fs-2 d-flex ai-center mb-20">
                <div class="comment-time flex-1">{{ calcTime(commentContent.time) }}</div>
                <div class="comment-reactive d-flex ai-center">
                    <div class="vote d-flex ai-center mr-6" @click="vote">
                        <i class="iconfont icon-dianzan1 mr-4" :style="{ color: isLiked ? '#c3473a' : '' }"></i>
                        <span class="vote-count" v-if="voteCount">{{ voteCount }}</span>
                    </div>
                    <span class="text-ee">丨</span>
                    <div class="share mr-6 ml-6" v-if="isGrey" @click="shareComment">
                        <i class="iconfont icon-fenxiang2 fs-3"></i>
                    </div>
                    <span class="text-ee" v-if="isGrey">丨</span>
                    <div class="comment ml-6 mr-4" @click="comment">
                        <i class="iconfont icon-liuyan-duandian"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotComment, list, VoteCommnentParam } from '@/service/api/comment/types';
import { calcTime, checkLogin, formatPicUrl, getQueryId } from "@/utils"
import router from '@/router';
// import useGlobalStore from '@/store/globalStore';
import { ref } from 'vue';
import Message from "@/components/message"
import useStore from '@/store';
import { voteComment } from '@/service/api/comment';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
// const globalState = useGlobalStore()

const props = withDefaults(defineProps<{
    isGrey?: boolean
    commentContent: HotComment
    type: number // 类型
}>(), {
    isGrey: true
})
const emits = defineEmits<{
    (e: "activeComment", info: { name: string, commentId: number, parentContent: string }): void
}>()

const voteCount = ref(props.commentContent.likedCount || 0) // 缓存点赞数量
const isLiked = ref(props.commentContent.liked) // 缓存是否点赞
const isVoting = ref(false) // 限制频繁点赞
const { usePlayer, useGlobal } = useStore()
const { player } = storeToRefs(usePlayer)
const { isShowLoginBox, isShowPlayPage } = storeToRefs(useGlobal)
const route = useRoute()
const queryId = getQueryId() as number

// 评论分享  暂不支持
const shareComment = () => {
    Message.error("暂不支持")
}

// 评论点赞 限制点击频率 TODO
const vote = async () => {
    if (!checkLogin()) {
        return isShowLoginBox.value = true
    }
    if (isVoting.value) return Message.error("请勿频繁操作")
    isVoting.value = true
    const _: VoteCommnentParam = {
        id: isShowPlayPage.value ? player.value.currentTrack.id : (queryId ? queryId : player.value.personalFMTrack.id), // 资源id
        cid: props.commentContent.commentId,
        t: isLiked.value ? 0 : 1,
        type: props.type as list
    }
    const r = await voteComment(_)
    isLiked.value ? voteCount.value-- : voteCount.value++
    isLiked.value = !isLiked.value
    isVoting.value = false
}

// 评论
const comment = () => {
    if (!checkLogin()) {
        return isShowLoginBox.value = true
    }
    // 如果是热评或是歌曲播放页面（私人fm以及单曲播放）则直接弹出评论框
    const needShowBox = ["/hot-comment", "/personal-fm"]
    // 要带上父级评论的内容 用于构造插入的回复结构
    if (needShowBox.some(item => route.path.startsWith(item)) || isShowPlayPage.value) {
        if (isShowPlayPage.value) {
            return Message.publishComment(2, props.type as list, '评论', player.value.currentTrack.id, props.commentContent.commentId, props.commentContent.user.nickname, props.commentContent.content)
        }
        return Message.publishComment(2, props.type as list, '评论', queryId ? Number(queryId) : player.value.personalFMTrack.id, props.commentContent.commentId, props.commentContent.user.nickname, props.commentContent.content)
    }
    console.log("评论======");
    console.log();

    // 评论框显示原评论的用户名，如果改动了用户名则会变成发表评论
    emits("activeComment", { name: props.commentContent.user.nickname, commentId: props.commentContent.commentId, parentContent: props.commentContent.content })
}
// 前往个人中心
const goPersonCenter = (id: number) => {
    if (isShowPlayPage) {
        isShowPlayPage.value = false
    }
    router.push(`/personal-center/${id}`)
}
</script>
<style lang="scss" scoped>
.comment-item-wrapper {
    width: 100%;

    .commoent-left {
        .comment-avatar {
            position: relative;
            overflow: visible;

            img {
                width: 35px;
                height: 35px;
            }

            .flag {
                position: absolute;
                bottom: 5px;
                right: -2px;
                width: 15px;
                height: 15px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .avatar {
                border-radius: 50%;
            }
        }
    }

    .commoent-right {
        flex: 1;
        border-bottom: 1px solid var(--theme-f2);

        .comment-name:hover,
        .right-middle .origin-reply:hover {
            color: #2757aa;
            cursor: pointer;
        }
    }
}
</style>
