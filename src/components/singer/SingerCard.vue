<template>
    <div class="singer-card-wrapper mb-30" @click="goSingerPage">
        <div class="img-wrapper">
            <LazyLoadImg :src="formatPicUrl(singerItem.picUrl, 375, 375)"></LazyLoadImg>
            <!-- <img :src="formatPicUrl(singerItem.picUrl, 375, 375)" alt=""> -->
        </div>
        <div class="singer-info d-flex ai-center jc-between">
            <div class="name fs-2 text-33">{{ singerItem.name }}</div>
            <div class="flag d-flex ai-center jc-center" v-if="isShowSingerFlag && singerItem.accountId">
                <i class="iconfont icon-iconfontyonghuming" style="color: white"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Artist } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
import router from '@/router';
import { useRoute } from 'vue-router';
import { formatPicUrl, scrollToTop } from "@/utils"

const route = useRoute()

const props = withDefaults(defineProps<
    {
        cardWidth?: number,
        cardHeight?: number,
        isShowSingerFlag?: boolean
        singerItem: Artist
    }>(), {
    cardWidth: 158,
    cardHeight: 158,
    isShowSingerFlag: true
})
const goSingerPage = () => {
    // 如果是歌手页面 滚动到顶部
    if (route.path.startsWith("/singer-home")) {
        scrollToTop()
    }
    router.push(`/singer-home/${props.singerItem.id}`)
}
</script>
<style lang="scss" scoped>
.singer-card-wrapper {
    width: 16%;
    border-radius: 10px;

    .img-wrapper {
        // height: 158px;
        height: 0;
        padding-bottom: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        margin-bottom: 10px;
        // background-color: #d33b31;

        img {
            width: 100%;
            // height: inherit
            // height: 100%
        }
    }

    .singer-info {
        .flag {
            @include radius(17px);
            background-color: #d33b31;

        }
    }

    &:hover {
        cursor: pointer;
    }
}
</style>
