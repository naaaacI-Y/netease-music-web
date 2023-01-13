<template>
    <div class="singer-header-wrapper d-flex">
        <div class="left mr-30">
            <LazyLoadImg :src="formatPicUrl(singerInfo?.img1v1Url, 200, 200)" v-if="singerInfo?.img1v1Url">
            </LazyLoadImg>
        </div>
        <div class="right">
            <div class="singer-name mb-10 fs-9 text-33" style="font-weight: bold;">{{ singerInfo.name }}</div>
            <div class="alias mb-15 text-66 fs-2">{{ singerInfo?.alias?.join("; ") }}</div>
            <div class="operate d-flex ai-center mb-20 text-4e">
                <div class="collection d-flex ai-center jc-center mr-9" @click="collecSinger">
                    <i class="iconfont icon-xinjianwenjianjia mr-3" v-show="!singerInfo.followed"></i>
                    <i class="iconfont icon-gou- mr-3" v-show="singerInfo.followed"></i>
                    <span class="fs-3">{{ singerInfo.followed ? "已收藏" : "收藏" }}</span>
                </div>
                <div class="homepage d-flex ai-center jc-center">
                    <i class="iconfont icon-iconfontyonghuming mr-3 fs-6"></i>
                    <span class="fs-3">个人主页</span>
                </div>
            </div>
            <div class="info d-flex ai-center">
                <div class="mr-15">
                    <span class="fs-2 text-4e">单曲数：</span>
                    <span class="fs-1 text-66">{{ singerInfo.musicSize }}</span>
                </div>
                <div class="mr-15">
                    <span class="fs-2 text-4e">专辑数：</span>
                    <span class="fs-1 text-66">{{ singerInfo.albumSize }}</span>
                </div>
                <div class="mr-15">
                    <span class="fs-2 text-4e">MV数：</span>
                    <span class="fs-1 text-66">{{ singerInfo.mvSize }}</span>
                </div>
                <!-- <div>
                    <span class="fs-2 text-4e">演出数：</span>
                    <span class="fs-1 text-66">22</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Artist } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
import { checkLogin, formatPicUrl } from '@/utils';
import useGlobalState from '@/store/globalState';
import { collectOrCancelSinger } from "@/service/api/singer"
import Message from "@/components/message"
const globalState = useGlobalState()
const props = defineProps<{
    singerInfo: Artist
}>()
const emits = defineEmits<{
    (e: "changeCollectState"): Promise<void>
}>()
// 收藏歌手
const collecSinger = async () => {
    if (!checkLogin()) {
        return globalState.isShowLoginBox = true
    }
    const followed = props.singerInfo.followed
    const _ = {
        id: props.singerInfo.id,
        t: followed ? 0 : 1
    }
    const r = await collectOrCancelSinger(_)
    if (r.code === 200) {
        followed ? Message.success("取消收藏成功") : Message.success("收藏成功")
        emits("changeCollectState")
    }
}
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
                border: 1px solid var(--theme-dd);

                &:hover {
                    background-color: rgba($color: #000000, $alpha: 0.1);
                    cursor: pointer;
                }
            }
        }

    }
}
</style>
