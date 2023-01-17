<template>
    <div class="recommend-wrapper d-flex" @click="goSongList" :class="{isHighQualityWrapper :isHighQuality }">
        <div class="songlist-card-wrapper" :style="{ width: !isHighQuality ? '100%' : '' }">
            <div class="img-wrapper mb-6" :class="{ isHighQualityImgWrapper: isHighQuality }">
                <LazyLoadImg :src="formatPicUrl(songListItem.coverImgUrl, 190, 190)"></LazyLoadImg>
                <div class="mask-top"></div>
                <div class="mask-bottom"></div>
                <div class="play-count d-flex ai-center fs-2">
                    <i class="iconfont icon-bofang1 fs-7"></i>
                    {{ formatPlayCount(songListItem.playCount) }}
                </div>
                <div class="play-btn">
                    <div class="trangel"></div>
                </div>
                <slot name="songlist-autor"></slot>
                <slot name="rank-flag"></slot>
            </div>
            <slot name="songlist-name"></slot>
            <slot name="songCount"></slot>
        </div>
        <slot name="right-info"></slot>
    </div>

</template>

<script lang="ts" setup>
import { formatPicUrl } from '@/utils';
import router from '@/router';
import LazyLoadImg from './LazyLoadImg.vue';
import { Playlist } from '@/service/api/music/types';
import { formatPlayCount } from '@/utils';
const props = withDefaults(defineProps<{
    isOutSide?: boolean
    isOneline?: boolean
    songListItem: Playlist
    isHighQuality?: boolean // 是否是精品歌单
}>(), {
    isOutSide: true,
    isOneline: false,
    isHighQuality: false
})
const goSongList = () => {
    router.push(`/song-list/${props.songListItem.id}`)
}
</script>
<style lang="scss" scoped>
.recommend-wrapper {
    width: 19%;


    .songlist-card-wrapper {
        // display: flex;
        // width: 100%;
        margin-bottom: 45px;

        .img-wrapper {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            overflow: hidden;
            position: relative;
            border-radius: 6px;

            img {
                width: 100%;
            }

            .mask-top,
            .mask-bottom {
                position: absolute;
                right: 0px;
                width: 100%;
                height: 30px;
            }

            .mask-top {
                top: 0;
                background-image: linear-gradient(rgba(#000, 0.3), rgba(#000, 0));
            }

            .mask-bottom {
                bottom: 0;
                background-image: linear-gradient(rgba(#000, 0), rgba(#000, 0.3));
            }

            .play-count {
                position: absolute;
                right: 5px;
                top: 5px;
                color: white;
                // background-color: rgba($color: #000000, $alpha: 0.1);
            }

            .play-btn {
                @include common-play-btn(30px, 7px, 10px);
                bottom: -5px;
                right: -5px;
                display: none;
            }

            .isCenter {
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            &:hover {
                cursor: pointer;

                .play-btn {
                    display: block;

                }
            }
        }

        .isHighQualityImgWrapper {
            width: 134px;
            height: 134px;
        }

        .songlist-name {
            word-break: break-all;

            &:hover {
                color: var(--theme-3a);
                cursor: pointer;
            }
        }

        .isOneLine {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

    }

}

.isHighQualityWrapper {
    width: 100%;
}
</style>
