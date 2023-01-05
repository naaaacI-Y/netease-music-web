<template>
    <div class="comment-item-wrapper d-flex mb-20">
        <div class="commoent-left mr-15">
            <div class="comment-avatar" @click="goPersonCenter">
                <LazyLoadImg :src="commentContent?.user?.avatarUrl"></LazyLoadImg>
                <div class="flag" v-if="commentContent?.user?.avatarDetail">
                    <LazyLoadImg :src="commentContent?.user?.avatarDetail?.identityIconUrl"></LazyLoadImg>
                </div>
            </div>
        </div>
        <div class="commoent-right">
            <div class="right-top fs-2 mb-10">
                <span class="comment-name text-shadow_blue " @click="goPersonCenter">{{
                    commentContent?.user?.nickname
                }}：</span>
                <span class="text-33">{{ commentContent.content }}</span>
            </div>
            <div class="right-middle fs-2   mb-10" style="padding: 9px;" :class="isGrey ? 'bg-f6' : 'bg-fa'"
                v-if="commentContent.beReplied.length">
                <span class="origin-reply text-shadow_blue">@{{ commentContent?.beReplied[0]?.user?.nickname }}：</span>
                <span class="text-97">{{ commentContent?.beReplied[0]?.content }}</span>
            </div>
            <div class="right-bottom text-99 fs-2 d-flex ai-center mb-20">
                <div class="comment-time flex-1">{{ calcTime(commentContent.time) }}</div>
                <div class="comment-reactive d-flex ai-center">
                    <div class="vote d-flex ai-center mr-6">
                        <i class="iconfont icon-dianzan1 mr-4"></i>
                        <span class="vote-count" v-if="commentContent.likedCount">{{ commentContent.likedCount }}</span>
                    </div>
                    <span class="text-ee">丨</span>
                    <div class="share mr-6 ml-6" v-if="isGrey">
                        <i class="iconfont icon-fenxiang2 fs-3"></i>
                    </div>
                    <span class="text-ee" v-if="isGrey">丨</span>
                    <div class="comment ml-6 mr-4">
                        <i class="iconfont icon-liuyan-duandian"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotComment } from '@/service/api/comment/types';
import { calcTime } from "@/utils"
import LazyLoadImg from "@/components/LazyLoadImg.vue"
withDefaults(defineProps<{
    isGrey?: boolean
    commentContent: HotComment
}>(), {
    isGrey: true
})
// 前往个人中心
const goPersonCenter = () => {

}
</script>
<style lang="scss" scoped>
.comment-item-wrapper {
    width: 100%;

    .commoent-left {
        .comment-avatar {
            @include radius(35px);
            position: relative;
            overflow: visible;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            .flag {
                position: absolute;
                bottom: 0;
                right: -2px;
                // @include radius(15px);
                width: 15px;
                height: 15px;
                border-radius: 50%;

                // overflow: hidden;
                // overflow: auto;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
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
