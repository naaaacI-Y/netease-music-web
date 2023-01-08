<template>
    <div class="dynamic-item-wrapper d-flex">
        <div class="left mr-10">
            <img :src="dynamicItem.user.avatarUrl" alt="" class="avatar-img">
            <div class="flag" v-if="dynamicItem.user.avatarDetail">
                <img :src="dynamicItem.user.avatarDetail.identityIconUrl" alt="">
            </div>
        </div>
        <div class="right flex-1">
            <div class="name-info fs-3 mb-5">
                <span class="text-shadow_blue mr-8">{{ dynamicItem.user.nickname }}</span>
                <span>{{ dynamicMap[dynamicItem.type.toString()] }}</span>
            </div>
            <div class="time fs-2 mb-10 text-7d">{{ calcTime(dynamicItem.eventTime) }}</div>
            <div class="dynamic-content fs-2 mb-5">{{ info.msg }}</div>
            <div class="quote d-flex ai-center mb-15">
                <div class="song-img mr-10">
                    <img :src="info.song.album.picUrl" alt="">
                    <div class="play-btn">
                        <div class="trangel"></div>
                    </div>
                </div>
                <div class="song-info fs-2">
                    <div class="song-name mb-3">{{ info.song.name }}</div>
                    <div class="singer text-7d">{{ info.song.artists[0].name }}</div>
                </div>
            </div>
            <div class="comment-reactive d-flex ai-center fs-2 jc-end mb-15">
                <div class="vote d-flex ai-center mr-6">
                    <i class="iconfont icon-dianzan1 mr-4"></i>
                    <span class="vote-count" v-if="dynamicItem.info.commentThread.likedCount">{{
                        dynamicItem.info.commentThread.likedCount
                    }}</span>
                </div>
                <span class="text-ee">丨</span>
                <div class="share mr-6 ml-6">
                    <i class="iconfont icon-fenxiang2 fs-3"></i>
                </div>
                <span class="text-ee">丨</span>
                <div class="comment ml-6 mr-4" @click="isShowCommentDetail = !isShowCommentDetail">
                    <i class="iconfont icon-liuyan-duandian"></i>
                </div>
            </div>
            <div class="comment-detail" v-if="isShowCommentDetail">
                <SongListComment :is-grey="false"></SongListComment>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { dynamicMap } from "@/utils/const"
import { computed, ref } from 'vue';
import { Event } from "@/service/api/user/types"
import SongListComment from '@/components/song/SongListComment.vue';
import { calcTime, formatTime } from '@/utils';

const props = defineProps<{
    dynamicItem: Event
}>()
const info = computed(() => {
    return JSON.parse(props.dynamicItem.json)
})
const isShowCommentDetail = ref(false)
</script>
<style lang="scss" scoped>
.dynamic-item-wrapper {
    padding-bottom: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;

    .left {
        // @include radius(40px);
        width: 40px;
        height: 40px;
        position: relative;

        .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .flag {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 13px;
            height: 13px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

    }

    .right {
        .quote {
            height: 60px;
            width: 100%;
            background-color: #f5f5f5;
            padding: 9px;

            .song-img {
                width: 40px;
                height: 40px;
                border-radius: 5px;
                position: relative;
                background-color: #d33b31;

                img {
                    width: 100%;
                    height: 100%;
                }

                .play-btn {
                    @include common-play-btn(20px, 5px, 8px);
                    top: 50%;
                    left: 50%;

                }

            }

            &:hover {
                background-color: #ededed;
            }
        }

        .comment-detail {
            background-color: #f5f5f5;
            padding: 0 10px;
        }
    }
}
</style>
