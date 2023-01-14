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
                v-if="commentContent.beReplied.length">
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
                    <!-- <div class="share mr-6 ml-6" v-if="isGrey">
                        <i class="iconfont icon-fenxiang2 fs-3"></i>
                    </div>
                    <span class="text-ee" v-if="isGrey">丨</span> -->
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
import useGlobalState from '@/store/globalState';
import { ref } from 'vue';
import Message from "@/components/message"
import { voteComment } from '@/service/api/comment';
import { useRoute } from 'vue-router';
const globalState = useGlobalState()
const route = useRoute()
const queryId = getQueryId() as number
const props = withDefaults(defineProps<{
    isGrey?: boolean
    commentContent: HotComment
    type: number // 类型
}>(), {
    isGrey: true
})
const emits = defineEmits<{
    (e: "activeComment", info: { name: string, commentId: number }): void
}>()
const voteCount = ref(props.commentContent.likedCount) // 缓存点赞数量
const isLiked = ref(props.commentContent.liked) // 缓存是否点赞
// 评论点赞 限制点击频率 TODO
const vote = async () => {
    if (!checkLogin()) {
        return globalState.isShowLoginBox = true
    }
    const _: VoteCommnentParam = {
        id: queryId, // 资源id
        cid: props.commentContent.commentId,
        t: isLiked.value ? 0 : 1,
        type: props.type as list
    }
    const r = await voteComment(_)
    isLiked.value ? voteCount.value-- : voteCount.value++
    isLiked.value = !isLiked.value
}

// 评论
const comment = () => {
    if (!checkLogin()) {
        return globalState.isShowLoginBox = true
    }
    // 如果是热评或是歌曲播放页面（私人fm）则直接弹出评论框
    const needShowBox = ["/hot-comment", "/personal-fm"] // 还差一个 播放非私人fm歌曲显示界面的时候 TODO
    if (needShowBox.some(item => route.path.startsWith(item))) {
        return Message.publishComment(2, props.type as list, '评论', Number(queryId), props.commentContent.commentId, props.commentContent.user.nickname)

    }
    // 评论框显示原评论的用户名，如果改动了用户名则会变成发表评论
    emits("activeComment", { name: props.commentContent.user.nickname, commentId: props.commentContent.commentId })
}
// 前往个人中心
const goPersonCenter = (id: number) => {
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
