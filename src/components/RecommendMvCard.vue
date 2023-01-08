<template>
    <div class="recommend-mv-card-wrapper" @click="goVideoDetail">
        <div class="img-wrapper">
            <LazyLoadImg
                :src="formatPicUrl((recommendMvItem.cover || recommendMvItem.picUrl || recommendMvItem.imgurl) as string, 440, 250)">
            </LazyLoadImg>
            <div class="play-count d-flex ai-center fs-1" style="color: white;">
                <i class="iconfont icon-bofang1 fs-7"></i>
                {{ formatPlayCount(recommendMvItem.playCount) }}
            </div>
            <div class="play-btn" v-if="isPlayBtn">
                <div class="trangel"></div>
            </div>
            <div class="duration fs-1" v-if="isShowTime" style="color: white;">{{
                formatSongTime(recommendMvItem.duration)
            }}</div>
        </div>
        <div class="mv-name mt-5">
            <div class="line1 fs-3 text-4e" :class="{ noWrap: !isOneline }">
                {{ recommendMvItem.name }}
            </div>
            <div class="line2 fs-1 text-97" v-if="!isOneline">
                {{ recommendMvItem.artistName }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatPicUrl } from '@/utils';
import LazyLoadImg from './LazyLoadImg.vue';
import { MVItem, RecommendItem } from '@/service/api/mv/types';
import { formatSongTime, formatPlayCount } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = withDefaults(defineProps<{
    isShowTime?: boolean
    isOneline?: boolean
    isPlayBtn?: boolean
    count?: number
    recommendMvItem: MVItem
}>(), {
    isShowTime: false,
    isOneline: false,
    isPlayBtn: false,
    count: 4,
    // recommendMvItem: []
})
const cardWidth = computed(() => {
    if (props.count === 4) {
        return "24%"
    }
    return "19%"
})
// 前往视频详情页
const goVideoDetail = () => {
    router.push(`/mv-detail/${props.recommendMvItem.id}`)
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
        }

        .noWrap {
            @include no-wrap(247);
        }

        .line2:hover {
            color: #747474;
            cursor: pointer;
        }
    }
}
</style>
