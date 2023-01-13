<template>
    <div class="singer-header-wrapper d-flex">
        <div class="left mr-30">
            <LazyLoadImg :src="singerInfo?.img1v1Url" v-if="singerInfo?.img1v1Url"></LazyLoadImg>
        </div>
        <div class="right">
            <div class="singer-name mb-10 fs-9" style="font-weight: bold;">{{ singerInfo.name }}</div>
            <!-- <div class="alias mb-15 text-66 fs-2">{{ singerInfo?.alias.join(";") }}</div> -->
            <div class="operate d-flex ai-center mb-20">
                <div class="collection d-flex ai-center jc-center mr-9">
                    <i class="iconfont icon-xinjianwenjianjia mr-3"></i>
                    <span class="fs-3 text-4e">收藏</span>
                </div>
                <div class="homepage d-flex ai-center jc-center">
                    <i class="iconfont icon-iconfontyonghuming mr-3 fs-6"></i>
                    <span class="fs-3 text-4e">个人主页</span>
                </div>
            </div>
            <div class="info d-flex ai-center">
                <div>
                    <span class="fs-3 text-4e">单曲数：</span>
                    <span class="fs-2 text-66">{{ singerInfo.musicSize }}</span>
                </div>
                <div>
                    <span class="fs-3 text-4e">专辑数：</span>
                    <span class="fs-2 text-66">{{ singerInfo.albumSize }}</span>
                </div>
                <div>
                    <span class="fs-3 text-4e">MV数：</span>
                    <span class="fs-2 text-66">{{ singerInfo.mvSize }}</span>
                </div>
                <!-- <div>
                    <span class="fs-3 text-4e">演出数：</span>
                    <span class="fs-2 text-66">22</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Artist } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
defineProps<{
    singerInfo: Artist
}>()
</script>
<style lang="scss" scoped>
.singer-header-wrapper {
    .left {
        width: 200px;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
        }

        // background-color: aqua;
    }

    .right {
        .operate {

            .collection,
            .homepage {
                padding: 4px 12px;
                border-radius: 20px;
                border: 1px solid #ddd;

                &:hover {
                    background-color: rgba($color: #000000, $alpha: 0.1);
                    cursor: pointer;
                }
            }
        }

        .info {
            div {
                margin-right: 15px;

                span:nth-child(1) {
                    font-size: 14px;
                    color: #4e4e4e;
                }

                span:nth-child(2) {
                    font-size: 13px;
                    color: #666;
                }
            }
        }

    }
}
</style>
