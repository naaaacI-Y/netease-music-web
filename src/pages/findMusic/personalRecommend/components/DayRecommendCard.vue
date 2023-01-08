<template>
    <div class="recommend-songlist-card-wrapper" @click="goSongList">
        <div class="img-wrapper mb-6" :class="{ isNotDayRecomnend: songListItem.picUrl }"
            :style="{ backgroundColor: type === 0 ? '#d33b31' : '' }">
            <slot name="canlender"></slot>
            <LazyLoadImg :src="formatPicUrl(songListItem.picUrl, 190, 190)" v-if="songListItem.picUrl"></LazyLoadImg>
            <div class="mask" v-if="type === 1"></div>
            <div class="play-count d-flex ai-center fs-1" v-if="type === 1">
                <i class="iconfont icon-bofang1 fs-7" style="color:white"></i>
                {{ formatPlayCount(songListItem.playCount!) }}
            </div>
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="songlist-name fs-3 text-4e">{{ songListItem.name }}</div>
    </div>

</template>

<script lang="ts" setup>
import { formatPicUrl } from '@/utils';
import LazyLoadImg from '@/components/LazyLoadImg.vue';
import { RecommendSongListRet } from '@/service/api/music/types';
import { formatPlayCount } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps<{
    songListItem: RecommendSongListRet
    type: number // 0: 每日歌曲推荐 1： 普通歌单
}>()
const goSongList = () => {
    if (props.type === 1) { // 普通歌单
        return router.push(`/song-list/${props.songListItem.id}`)
    }
    // 每日歌曲推荐
    router.push('/day-recommend')
}
</script>
<style lang="scss" scoped>
.recommend-songlist-card-wrapper {
    width: calc(20% - 18px);
    margin-bottom: 45px;


    .img-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        // border: 1px solid #eee;
        // background-color: #d33b31;

        img {
            width: 100%;
            // height: 100%;
        }

        .mask {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 100%;
            height: 30px;
            background-image: linear-gradient(rgba(#000, 0.3), rgba(#000, 0));
        }

        .play-count {
            position: absolute;
            right: 5px;
            top: 5px;
            color: white;
            // background-color: rgba($color: #000000, $alpha: 0.1);
        }

        .play-btn {
            display: none;
            position: absolute;
            bottom: 10px;
            right: 10px;
            @include radius(30px);
            background-color: rgba($color: #bebebb, $alpha: 0.6);

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

    .isNotDayRecomnend {
        background-color: var(--theme-dc);
    }

    .songlist-name {
        word-break: break-all;


        &:hover {
            color: var(--theme-3a);
            cursor: pointer;
        }
    }

}
</style>
