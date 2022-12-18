<template>
    <div class="card-for-album-wrapper">
        <div class="img-wrap mb-5">
            <LazyLoadImg :src="albumItem.picUrl"></LazyLoadImg>
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="album-info">
            <div class="name mb-10 fs-3 text-black_3">{{ albumItem.name }}</div>
            <div class="time fs-2 text-black_6">{{ formatTime(albumItem.publishTime, "yyyy-MM-dd") }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotAlbum } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
import { formatTime } from "@/utils/index"
defineProps<{
    albumItem: HotAlbum
}>()
</script>
<style lang="scss" scoped>
.card-for-album-wrapper {
    width: calc(17% - 15px);
    margin-bottom: 35px;

    .img-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
        border-radius: 10px;

        // background-color: aqua;
        img {
            width: 100%;
        }

        .play-btn {
            display: none;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            @include radius(40px);
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

        &:hover {
            .play-btn {
                display: block;
            }

            cursor: pointer;
        }

    }

    .album-info {
        .name {}

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
