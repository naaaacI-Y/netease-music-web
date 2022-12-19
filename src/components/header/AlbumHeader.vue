<template>
    <div class="album-header-wrapper d-flex">
        <div class="album-left">
            <LazyLoadImg :src="albumInfo?.picUrl" v-if="albumInfo?.picUrl"></LazyLoadImg>
        </div>
        <div class="album-right">
            <div class="base-info d-flex ai-center mb-20">
                <div class="type mr-10 fs-1 text-primary_red_1">专辑</div>
                <div class="name fs-9" style="font-weight:bold">{{ albumInfo?.name }}
                </div>
            </div>
            <div class="operate d-flex text-black_3 mb-20">
                <div class="play-all fs-3 d-flex ai-center text-white mr-10">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect-count mr-15 fs-3 d-flex ai-center" @click="collect">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                    <span>收藏</span>
                    <span>已收藏</span>
                    <span>({{ albumCountInfo?.subCount }})</span>
                </div>
                <div class="share mr-15 fs-3 d-flex ai-center" @click="share">
                    <i class="iconfont icon-fenxiang2 mr-3"></i>
                    <span>分享</span>
                    <span>({{ albumCountInfo?.shareCount }})</span>
                </div>
                <div class="download-all fs-3 d-flex ai-center">
                    <i class="iconfont icon-xiazai mr-3 fs-6"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="singer fs-2 mb-8">
                <span class="text-black_3" @click="goSingerPage">歌手：</span>
                <span class="text-shadow_blue">{{ albumInfo?.artist?.name }}</span>
            </div>
            <div class="time fs-2 text-black_3">
                <span>时间：</span>
                <span>{{ formatTime(albumInfo?.publishTime, "yyyy-MM-dd") }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LazyLoadImg from '../LazyLoadImg.vue';
import { getCurrentInstance } from 'vue';
import { HotAlbum } from '@/service/api/singer/types';
import { checkLogin, formatTime } from '@/utils';
import { AlbumDynamicInfoResult, Info } from '@/service/api/album/types';

const message = getCurrentInstance()?.appContext.config.globalProperties.$message
defineProps<{
    albumInfo: HotAlbum & { info: Info }
    albumCountInfo: AlbumDynamicInfoResult
}>()

// 收藏
const collect = () => {
    const isLogin = checkLogin()
    if (!isLogin) return
    message.error("失败的提示")
}
// 分享 TODO
const share = () => {

}
// 前往歌手页
const goSingerPage = () => {

}
</script>
<style lang="scss" scoped>
.album-header-wrapper {
    .album-left {
        width: 200px;
        height: 200px;
        margin-right: 50px;

        img {
            width: 100%;
            height: 100%;
        }

    }

    .album-right {
        .base-info {
            .type {
                padding: 2px 6px;
                border: 1px solid #d33b31;
                border-radius: 4px;
            }
        }

        .operate {

            .share,
            .download-all,
            .collect-count {
                padding: 4px 12px;
                border: 1px solid #e5e5e5;
                border-radius: 18px;

                &:hover {
                    background-color: #f2f2f2;
                    cursor: pointer;
                }
            }

            .play-all {
                background-color: rgba($color: #d33b31, $alpha: 0.9);
                padding: 4px 12px;
                border-radius: 18px;
            }
        }

        .singer span:nth-child(2) {
            &:hover {
                color: #2757aa;
                cursor: pointer;
            }
        }
    }
}
</style>
