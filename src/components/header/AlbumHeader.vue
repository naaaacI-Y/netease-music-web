<template>
    <div class="album-header-wrapper d-flex">
        <div class="album-left">
            <LazyLoadImg :src="albumInfo?.picUrl" v-if="albumInfo?.picUrl"></LazyLoadImg>
        </div>
        <div class="album-right">
            <div class="base-info d-flex ai-center mb-20">
                <div class="type mr-10 fs-1 text-primary_red_4">专辑</div>
                <div class="name fs-9 text-33" style="font-weight:bold">{{ albumInfo?.name }}
                </div>
            </div>
            <div class="operate d-flex text-33 mb-20">
                <div class="play-all fs-3 d-flex ai-center mr-10" style="color: white;" @click="playAllAlbumSong">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect-count mr-15 fs-3 d-flex ai-center" @click="collect">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3" v-show="!albumCountInfo.isSub"></i>
                    <i class="iconfont icon-gou- fs-7 mr-3" v-show="albumCountInfo.isSub"></i>
                    <span>{{ albumCountInfo.isSub ? "已收藏" : "收藏" }}</span>
                    <span>({{ albumCountInfo?.subCount }})</span>
                </div>
                <div class="share mr-15 fs-3 d-flex ai-center" @click="Message.error('暂不支持>_<')">
                    <i class="iconfont icon-fenxiang2 mr-3"></i>
                    <span>分享</span>
                    <span>({{ albumCountInfo?.shareCount }})</span>
                </div>
                <div class="download-all fs-3 d-flex ai-center" @click="Message.error('暂不支持>_<')">
                    <i class="iconfont icon-xiazai mr-3 fs-6"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="singer fs-1 mb-8">
                <span class="text-33">歌手：</span>
                <span class="text-shadow_blue" @click="goSingerPage">{{ albumInfo?.artist?.name }}</span>
            </div>
            <div class="time fs-1 text-33">
                <span>时间：</span>
                <span>{{ formatTime(albumInfo?.publishTime, "yyyy-MM-dd") }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LazyLoadImg from '../LazyLoadImg.vue';
import { HotAlbum, HotSong } from '@/service/api/singer/types';
import { checkLogin, formatTime } from '@/utils';
import { AlbumDynamicInfoResult, Info } from '@/service/api/album/types';
import Message from "@/components/message"
import useGlobalStore from '@/store/globalStore';
import { useRoute, useRouter } from 'vue-router';
import { CollectOrCancelAlbum } from "@/service/api/album"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';


const { playSongList, checkMusicCopyright } = useMusicPlayRelation()
const globalState = useGlobalStore()
const router = useRouter()
const route = useRoute()
const songList = inject<{ data: HotSong[] }>("songList")

const props = defineProps<{
    albumInfo: HotAlbum & { info: Info }
    albumCountInfo: AlbumDynamicInfoResult
}>()
const emits = defineEmits<{
    (e: "changeCollectionCount"): void
}>()

// 收藏
const collect = async () => {
    if (!checkLogin()) {
        return globalState.isShowLoginBox = true
    }
    const liked = props.albumCountInfo.isSub
    const _ = {
        id: props.albumInfo.id,
        t: liked ? 0 : 1
    }
    const r = await CollectOrCancelAlbum(_)
    if (r.code === 200) {
        liked ? Message.success("取消收藏成功") : Message.success("收藏成功")
        emits("changeCollectionCount")
    }
}

// 播放所有专辑歌曲
const playAllAlbumSong = () => {
    const id = Number(route.params.id)
    const ids = songList?.data.filter(item => {
        return checkMusicCopyright(item.fee, !item.noCopyrightRcmd, item.copyright)
    }).map(item => item.id)
    if (!ids?.length) {
        return Message.error("惊不惊喜，一首都不让你听>_<")
    }
    playSongList(JSON.stringify(ids), id)
}

// 前往歌手页
const goSingerPage = () => {
    router.push(`/singer-home/${props.albumInfo.artist.id}`)
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
                border: 1px solid var(--theme-e5); // dark: #4545454
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
