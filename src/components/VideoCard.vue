<template>
    <div class="recommend-mv-card-wrapper" @click="goVideoDetail">
        <div class="img-wrapper" style="color: white;">
            <!-- <img :src="videoItem.coverUrl" alt=""> -->
            <LazyLoadImg :src="videoItem.coverUrl" :padding-bottom="56"></LazyLoadImg>
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
                <!--超出一行需要省略，但是有标签，TODO-->
                <span class="title" v-if="!colorful">{{ videoItem.title }}</span>
                <span class="title" v-if="colorful" v-html="keywordsColorful(videoItem.title, keywords)"></span>
            </div>
            <div class="line2 fs-1 text-c2 d-flex" v-if="!isOneline">
                <span v-if="!Array.isArray(videoItem.creator)">by&ensp;</span>
                <span v-if="!colorful">{{
                    Array.isArray(videoItem.creator) ? videoItem.creator[0].userName : videoItem.creator.nickname
                }}</span>
                <span v-if="colorful"
                    v-html="keywordsColorful(Array.isArray(videoItem.creator) ? videoItem.creator[0].userName : videoItem.creator.nickname, keywords)"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { formatPicUrl } from "@/utils"
import LazyLoadImg from './LazyLoadImg.vue';
import { computed } from 'vue';
import { formatSongTime, formatPlayCount } from '@/utils';
import { VideoByCategoryRet } from '@/service/api/video/types';
import { useRouter, useRoute } from 'vue-router';
import { Video } from '@/service/api/search/types';
import { keywordsColorful } from "@/utils";

const router = useRouter()
const props = withDefaults(defineProps<{
    isShowTime?: boolean
    isOneline?: boolean
    isPlayBtn?: boolean
    count?: number
    colorful?: boolean // 搜索高亮
    videoItem: VideoByCategoryRet["data"] | Video
}>(), {
    isShowTime: false,
    isOneline: false,
    isPlayBtn: false,
    colorful: false,
    count: 4,
    // recommendMvItem: []
})

const keywords = computed(() => {
    return useRoute().params.keywords as string
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
    if (Number(props.videoItem.vid)) {
        return router.push(`/mv-detail/${props.videoItem.vid}`)
    }
    router.push(`/video-detail/${props.videoItem.vid}`)
}
</script>
<style lang="scss" scoped >
.recommend-mv-card-wrapper {
    margin-bottom: 35px;
    width: v-bind(cardWidth);

    .img-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 56%;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
        }

        .play-count {
            position: absolute;
            right: 10px;
            top: 5px;
            color: white;
        }

        .play-btn {
            @include common-play-btn(30px, 7px, 10px);
            top: 50%;
            left: 50%;
            display: none;
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

            .title {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
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
