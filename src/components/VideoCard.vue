<template>
    <div class="recommend-mv-card-wrapper" @click="goVideoDetail">
        <div class="img-wrapper" style="color: white;">
            <img :src="videoItem.coverUrl" alt="">
            <div class="play-count d-flex ai-center fs-1">
                <i class="iconfont icon-bofang1  fs-7"></i>
                {{ formatPlayCount(videoItem.playTime) }}
            </div>
            <div class="play-btn" v-if="isPlayBtn">
                <div class="trangel"></div>
            </div>
            <div class="duration fs-1" v-if="isShowTime">{{ formatSongTime(videoItem.durationms) }}
            </div>
        </div>
        <div class="mv-name mt-5">
            <div class="line1 fs-3 text-4e d-flex ai-center mb-4" :class="{ noWrap: !isOneline }">
                <slot name="mv-flag"></slot>
                <span class="title">{{ videoItem.title }}</span>
            </div>
            <div class="line2 fs-1 text-c2 d-flex" v-if="!isOneline">
                <span v-if="!Array.isArray(videoItem.creator)">by&ensp;</span>
                <span>{{
                    Array.isArray(videoItem.creator) ? videoItem.creator[0].userName : videoItem.creator.nickname
                }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatSongTime, formatPlayCount } from '@/utils';
import { VideoByCategoryRet } from '@/service/api/video/types';
import { useRouter } from 'vue-router';
import { Video } from '@/service/api/search/types';
const router = useRouter()
const props = withDefaults(defineProps<{
    isShowTime?: boolean
    isOneline?: boolean
    isPlayBtn?: boolean
    count?: number
    videoItem: VideoByCategoryRet["data"] | Video
}>(), {
    isShowTime: false,
    isOneline: false,
    isPlayBtn: false,
    count: 4,
    // recommendMvItem: []
})
const cardWidth = computed(() => {
    if (props.count === 4) {
        return "calc(25% - 18px)"
    }
    return "calc(20% - 18px)"
})
const goVideoDetail = () => {
    // flag ==> 标识是视频详情还是mv详情
    // 区别于mv详情不同 视频的id是字符串要单独处理
    console.log("router.push(`/video-detail/${props.videoItem.data.vid}`)");

    router.push(`/video-detail/${props.videoItem.vid}`)
}
</script>
<style lang="scss" scoped >
.recommend-mv-card-wrapper {
    margin-bottom: 35px;
    width: v-bind(cardWidth);

    .img-wrapper {
        width: 100%;
        // height: 138px;
        height: 0;
        padding-bottom: 56%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        // background-color: aqua;
        img {
            width: 100%;
            // height: 100%;
        }

        .play-count {
            position: absolute;
            right: 10px;
            top: 5px;
            color: white;
        }

        .play-btn {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            @include radius(30px);
            background-color: rgba($color: #bebebb, $alpha: 0.6);
            transform: translate(-50%, -50%);

            .trangel {
                width: 0;
                height: 0;
                position: absolute;
                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 10px solid #d33b31;
                left: 50%;
                top: 50%;
                transform: translate(-30%, -50%);
            }
        }

        &:hover {
            .play-btn {
                display: block
            }
        }

        .duration {
            position: absolute;
            bottom: 10px;
            right: 10px
        }
    }

    .mv-name {
        .line1 {
            &:hover {
                color: var(--theme-3a);
                cursor: pointer;
            }
        }

        .noWrap {
            @include no-wrap(247);
        }

        .line2:hover {
            color: var(--theme-a9); // 7c
            cursor: pointer;
        }
    }
}
</style>
