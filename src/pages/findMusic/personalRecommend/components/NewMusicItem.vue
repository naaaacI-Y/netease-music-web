<template>
    <div class="new-music-item-wrapper d-flex ai-center"
        :style="{ paddingLeft: `${!isOutSide ? '30px' : ''}`, backgroundColor: isShowBackground }">
        <div class="index mr-12 fs-2" v-if="!isOutSide">{{ paddingIndex(index) }}</div>
        <div class="song-cover mr-12">
            <img :src="formatPicUrl(musicItem.picUrl, 60, 60)" alt="">
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="index fs-2 mr-12" v-if="isOutSide">{{ paddingIndex(index) }}</div>
        <div class="music-name d-flex flex-column jc-center ai-start flex-1">
            <div class="name fs-3">
                <span class="mr-4 text-00">{{ musicItem.name }}</span>
                <span v-if="musicItem.song.alias.length" class="text-93">({{ musicItem.song.alias[0] }})</span>
            </div>
            <div class="music-author" v-if="isOutSide">
                <span class="text-primary_red_4 fs-1 mr-4 sq" v-if="musicItem.song.sqMusic">SQ</span>
                <span class="fs-2">{{ musicItem.song.artists[0].name }}</span>
            </div>
        </div>
        <div class="music-author fs-2 " v-if="!isOutSide">歌曲演唱者</div>
        <div class="music-album fs-2" v-if="!isOutSide">{{ musicItem.song.album.name }}</div>
        <div class="music-time fs-2" v-if="!isOutSide">{{ musicItem.song.duration }}</div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RecommendNewMusicRet } from '@/service/api/recommend/types';
import { formatPicUrl } from '@/utils';
const props = withDefaults(defineProps<{
    isOutSide?: boolean,
    index?: number
    musicItem: RecommendNewMusicRet
}>(), {
    isOutSide: true,
    index: 1
})
const isShowBackground = computed(() => {
    if (!props.isOutSide) {
        return props.index ? (props.index % 2 === 0 ? "" : "#fafafa") : ""
    }
    return ""
})
const paddingIndex = (index: number) => {
    if (index < 10) return `0${index}`
    return index
}
</script>
<style lang="scss" scoped>
.new-music-item-wrapper {
    height: 80px;
    padding: 10px 0;

    .index {
        color: #969696;
    }

    .music-name .name {
        @include no-wrap(413px);
    }

    .song-cover {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        // background-color: aqua;

        img {
            width: 100%;
            height: 100%;
        }

        .play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            @include radius(25px);
            background-color: rgba($color: #bebebb, $alpha: 0.6);

            .trangel {
                width: 0;
                height: 0;
                position: absolute;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 8px solid #d33b31;
                left: 50%;
                top: 50%;
                transform: translate(-30%, -50%);
            }
        }
    }

    .music-author {
        width: 185px;

        .sq {
            border: 1px solid #d33b31;
            border-radius: 4px;
            padding: 0 3px;
        }
    }

    .music-album {
        width: 250px;
    }

    .music-album,
    .music-author {
        color: var(--theme-3f);

    }

    .music-album:hover,
    .music-author:hover {
        color: var(--theme-66);
        cursor: pointer;
    }

    .music-time {
        width: 85px;
        color: #969696;
    }

}
</style>
