<template>
    <div class="singer-card-wrapper mb-30">
        <div class="img-wrapper">
            <LazyLoadImg :src="singerItem.picUrl"></LazyLoadImg>
        </div>
        <div class="singer-info d-flex ai-center jc-between">
            <div class="name fs-2">{{ singerItem.name }}</div>
            <div class="flag d-flex ai-center jc-center" v-if="isShowSingerFlag && singerItem.accountId">
                <i class="iconfont text-white icon-iconfontyonghuming"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Artist } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
// 虚拟滚动  TODO
withDefaults(defineProps<
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
</script>
<style lang="scss" scoped>
.singer-card-wrapper {
    width: calc(17% - 15px);
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
