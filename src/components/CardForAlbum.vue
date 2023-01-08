<template>
    <div class="card-for-album-wrapper" @click="goAlbum">
        <div class="img-wrap mb-5">
            <LazyLoadImg :src="formatPicUrl(albumItem.picUrl, 375, 375)"></LazyLoadImg>
            <div class="play-btn" @click.stop="playAlbum">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="album-info">
            <div class="name mb-2 fs-3 text-33">
                <span>{{ albumItem.name }}</span>
                <span v-if="albumItem.alias?.length" class="fs-2 text-99">({{ albumItem.alias[0] }})</span>
            </div>
            <div class="time fs-2 text-97">{{ formatTime(albumItem.publishTime, "yyyy-MM-dd") }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotAlbum } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
import { formatTime } from "@/utils/index"
import { useRouter } from 'vue-router';
import { formatPicUrl } from '@/utils/index';
const router = useRouter()
const props = defineProps<{
    albumItem: HotAlbum
}>()
const goAlbum = () => {
    console.log("goAlbum");
    router.push(`/album/${props.albumItem.id}`)
}
const playAlbum = () => {
    console.log("playAlbum");

}
</script>
<style lang="scss" scoped>
.card-for-album-wrapper {
    width: calc(16%);
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
            @include common-play-btn(40px, 7px, 10px);
            left: 50%;
            top: 50%;
            display: none;
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
