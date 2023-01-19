<template>
    <div class="wrapper d-flex">
        <div class="left mr-30">
            <img :src="headerInfo.coverImgUrl" alt="">
        </div>
        <div class="right flex-1">
            <div class="info d-flex ai-center mb-20">
                <div class="song-list-type mr-10 fs-1 text-primary_red_4">歌单</div>
                <div class="name fs-9 text-33" style="font-weight:bold">{{ headerInfo.name }}</div>
            </div>
            <div class="creator-info d-flex ai-center mb-20">
                <div class="creator-avatar mr-7" @click="goPersonCenter">
                    <img :src="headerInfo.creator.avatarUrl" alt="" class="avatar-img">
                    <div class="flag" v-if="headerInfo.creator.avatarDetail">
                        <img :src="headerInfo.creator.avatarDetail.identityIconUrl" alt="">
                    </div>
                </div>
                <div class="creator-name fs-1 text-shadow_blue mr-6" @click="goPersonCenter">
                    {{ headerInfo.creator.nickname }}
                </div>
                <div class="creator-time fs-1 text-99">
                    {{ formatTime(headerInfo.createTime, "yyyy-MM-dd") }}创建
                </div>
            </div>
            <div class="operate d-flex text-33 mb-8">
                <div class="play-all fs-2 d-flex ai-center mr-10" style="color:white" @click="playAll">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect-count mr-15 fs-2 d-flex ai-center" @click="collectSongList">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3" v-if="!headerInfo.subscribed"></i>
                    <i class="iconfont icon-gou- fs-7 mr-3" v-if="headerInfo.subscribed"></i>
                    <span>{{ headerInfo.subscribed ? "已收藏" : "收藏" }}</span>
                    <span>({{ headerInfo.subscribedCount }})</span>
                </div>
                <div class="share mr-15 fs-2 d-flex ai-center" @click="Message.error('暂无不支持>_<')">
                    <i class="iconfont icon-fenxiang2 mr-3"></i>
                    <span>分享</span>
                    <span>({{ headerInfo.shareCount }})</span>
                </div>
                <div class="download-all fs-2 d-flex ai-center" @click="Message.error('暂无不支持>_<')">
                    <i class="iconfont icon-xiazai mr-3 fs-6"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="other-info mt-12">
                <div class="other-info-label mb-3" v-if="headerInfo.tags.length">
                    <span class="fs-2 text-33">标&emsp;签：</span>
                    <span class="label-name fs-2 text-shadow_blue mr-3" v-for="(item, index) in headerInfo.tags"
                        :key="index">{{ item }}</span>
                </div>
                <div class="song-about d-flex fs-1 mb-3">
                    <div class="song-count mr-11">
                        <span class="text-33">歌曲数：</span>
                        <span class="text-99">{{ headerInfo.trackCount }}</span>
                    </div>
                    <div class="play-count fs-1">
                        <span class="text-33">播放数：</span>
                        <span class="text-99">{{ formatPlayCount(headerInfo.playCount) }}</span>
                    </div>
                </div>
                <div class="summary fs-1" v-if="headerInfo.description">
                    <span class="text-33">简&emsp;介：</span>
                    <span class="text-99">{{ headerInfo.description }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 歌单

import router from '@/router';
import { CollectSongListParams, HeaderInfo } from '@/service/api/music/types';
import { checkLogin, formatPlayCount, formatTime } from '@/utils';
import { collectOrCancelSongList, getSongListDetail } from "@/service/api/music"
import Message from "@/components/message"
import { Playlist_user } from '@/service/api/user/types';
import { ref } from 'vue';
import { useRoute } from "vue-router"

import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const loading = ref(false)
const route = useRoute()
const { isShowPlayPage, collectedSongList, useSideSongList, playSongList } = useMusicPlayRelation()

const emits = defineEmits<{
    (e: "changeState", query: { id: number, flag?: boolean }): void
}>()

// 歌手
const props = defineProps<{
    headerInfo: HeaderInfo
}>()

/**
 * 更新store数据
 * @param id 歌单id
 * @param type 1: 收藏 0: 取消收藏
 */
const updateSongList = async (id: number, type: number) => {
    const oldList = JSON.parse(JSON.stringify(collectedSongList.value)) as Playlist_user[]
    if (type === 1) {
        // 添加新的歌单数据
        const r = await getSongListDetail({ id })
        oldList.unshift(r.playlist as Playlist_user)
    } else {
        // 删除
        const idx = oldList.findIndex(item => item.id === id)
        oldList.splice(idx, 1)
    }

    useSideSongList.updateCollectedSongList(oldList)
}
// 歌单收藏 限制点击频次
const collectSongList = async () => {
    if (!checkLogin()) {
        return isShowPlayPage.value = true
    }
    if (loading.value) return Message.error("请勿频繁操作")
    loading.value = true
    const { subscribed, id } = props.headerInfo
    const _: CollectSongListParams = {
        t: subscribed ? 2 : 1,
        id
    }
    const r = await collectOrCancelSongList(_)
    loading.value = false
    if (r.code === 200) {
        subscribed ? Message.success("取消收藏成功") : Message.success("收藏成功")
        // getPersonSongList(0, 1, 0, 1)
        // 更新侧边栏数据
        updateSongList(id, subscribed ? 0 : 1)
        // 重新加载数据
        emits("changeState", { id: props.headerInfo.id, flag: true })
    }
}
const playAll = () => {
    const id = Number(route.params.id)
    playSongList(JSON.stringify(props.headerInfo.trackIds), id)
}
// 前往个人中心
const goPersonCenter = () => {
    router.push(`/personal-center/${props.headerInfo.creator.userId}`)
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
                @include creator-avatar(25px, 10px, 5px);
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
                border: 1px solid var(--theme-e5);
                border-radius: 18px;

                &:hover {
                    background-color: var(--theme-f2);
                    cursor: pointer;
                }
            }

            .play-all {
                background-color: rgba($color: #d33b31, $alpha: 0.9);
                padding: 4px 12px;
                border-radius: 18px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
