<template>
    <div class="new-music-item-wrapper d-flex ai-center"
        :style="{ paddingLeft: `${!isOutSide ? '20px' : ''}`, backgroundColor: isShowBackground }">
        <div class="index mr-12 fs-2" v-if="!isOutSide">01</div>
        <div class="song-cover mr-12">
            <img src="" alt="">
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="index fs-2 mr-12" v-if="isOutSide">01</div>
        <div class="music-name d-flex flex-column jc-center ai-start flex-1">
            <div class="name fs-3">歌曲名称</div>
            <div class="music-author" v-if="isOutSide">
                <span class="fs-2 text-primary_red_2">SQ</span>
                <span class="fs-2">演唱者</span>
            </div>
        </div>
        <div class="music-author fs-2 " v-if="!isOutSide">歌曲演唱者</div>
        <div class="music-album fs-2" v-if="!isOutSide">歌曲专辑</div>
        <div class="music-time fs-2" v-if="!isOutSide">03:22</div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    isOutSide: boolean,
    index?: number
}>(), {
    isOutSide: false,
})
const isShowBackground = computed(() => {
    return props.index ? (props.index % 2 === 0 ? "" : "#fafafa") : ""
})
</script>
<style lang="scss" scoped>
.new-music-item-wrapper {
    height: 80px;
    padding: 10px 0;

    .index {
        color: #969696;
    }

    .song-cover {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        background-color: aqua;

        img {
            width: 100%;
            height: 100%;
        }

        .play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 25px;
            height: 25px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
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
    }

    .music-album {
        width: 250px;
    }

    .music-album,
    .music-author {
        color: #646464;

    }

    .music-album:hover,
    .music-author:hover {
        color: #4c4c4c;
        cursor: pointer;
    }

    .music-time {
        width: 100px;
        color: #969696;
    }

}
</style>
