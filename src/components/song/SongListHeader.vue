<template>
    <div class="wrapper d-flex">
        <div class="left mr-30">
            <img :src="headerInfo.coverImgUrl" alt="">
        </div>
        <div class="right flex-1">
            <div class="info d-flex ai-center mb-20">
                <div class="song-list-type mr-10 fs-1 text-primary_red_1">歌单</div>
                <div class="name fs-9" style="font-weight:bold">{{ headerInfo.name }}</div>
            </div>
            <div class="creator-info d-flex ai-center mb-20">
                <div class="creator-avatar mr-7" @click="goPersonCenter">
                    <img :src="headerInfo.creator.avatarUrl" alt="">
                    <div class="flag" v-if="headerInfo.creator.avatarDetail">
                        <img :src="headerInfo.creator.avatarDetail.identityIconUrl" alt="">
                    </div>
                </div>
                <div class="creator-name fs-1 text-shadow_blue mr-6" @click="goPersonCenter">
                    {{ headerInfo.creator.nickname }}
                </div>
                <div class="creator-time fs-1 text-black_13">
                    {{ formatTime(headerInfo.createTime, "yyyy-MM-dd") }}创建
                </div>
            </div>
            <div class="operate d-flex text-black_3 mb-8">
                <div class="play-all fs-2 d-flex ai-center text-white mr-10">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect-count mr-15 fs-2 d-flex ai-center">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                    <span>收藏</span>
                    <span>({{ headerInfo.subscribedCount }})</span>
                </div>
                <div class="share mr-15 fs-2 d-flex ai-center">
                    <i class="iconfont icon-fenxiang2 mr-3"></i>
                    <span>分享</span>
                    <span>({{ headerInfo.shareCount }})</span>
                </div>
                <div class="download-all fs-2 d-flex ai-center">
                    <i class="iconfont icon-xiazai mr-3 fs-6"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="other-info mt-12">
                <div class="other-info-label mb-3" v-if="headerInfo.tags.length">
                    <span class="fs-2 text-black_3">标&emsp;签：</span>
                    <span class="label-name fs-2 text-shadow_blue mr-3" v-for="(item, index) in headerInfo.tags"
                        :key="index">{{ item }}</span>
                </div>
                <div class="song-about d-flex fs-1 mb-3">
                    <div class="song-count mr-11">
                        <span class="text-black_3">歌曲数：</span>
                        <span class="text-black_13">{{ headerInfo.trackCount }}</span>
                    </div>
                    <div class="play-count fs-1">
                        <span class="text-black_3">播放数：</span>
                        <span class="text-black_13">{{ formatPlayCount(headerInfo.playCount) }}</span>
                    </div>
                </div>
                <div class="summary fs-1">
                    <span class="text-black_3">简&emsp;介：</span>
                    <span class="text-black_13">{{ headerInfo.description }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 歌单

import { HeaderInfo } from '@/service/api/music/types';
import { formatPlayCount, formatTime } from '@/utils';

// 歌手
defineProps<{
    headerInfo: HeaderInfo
}>()
// 前往个人中心
const goPersonCenter = () => {

}
</script>
<style lang="scss" scoped>
.wrapper {
    .left {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        // background-color: aqua;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .right {
        .info {
            .song-list-type {
                padding: 2px 6px;
                border: 1px solid #d33b31;
                border-radius: 4px;
            }
        }

        .creator-info {
            .creator-avatar {
                position: relative;
                width: 25px;
                height: 25px;

                .flag {
                    position: absolute;
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    bottom: 7px;
                    right: -2px;
                }

                img {
                    width: 100%;
                    border-radius: 50%;
                }

                &:hover {
                    cursor: pointer;
                }
            }

            .creator-name:hover {
                cursor: pointer;
            }
        }

        .other-info .label-name:hover {
            cursor: pointer;
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
    }
}
</style>
