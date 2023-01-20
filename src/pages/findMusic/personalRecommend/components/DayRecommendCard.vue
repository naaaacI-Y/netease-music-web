<template>
    <div class="recommend-songlist-card-wrapper" @click="goSongList">
        <div class="img-wrapper mb-6" :class="{ isNotDayRecomnend: songListItem.picUrl }"
            :style="{ backgroundColor: type === 0 ? '#d33b31' : '' }">
            <slot name="canlender"></slot>
            <LazyLoadImg :src="formatPicUrl(songListItem.picUrl, 190, 190)" v-if="songListItem.picUrl"></LazyLoadImg>
            <div class="mask" v-if="type === 1"></div>
            <div class="play-count d-flex ai-center fs-1" v-if="type === 1">
                <i class="iconfont icon-bofang1 fs-7" style="color:white"></i>
                {{ formatPlayCount(songListItem.playCount!) }}
            </div>
            <div class="play-btn" @click.stop="playAllSongList">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="songlist-name fs-3 text-4e">{{ songListItem.name }}</div>
    </div>

</template>

<script lang="ts" setup>
import { formatPicUrl } from '@/utils';
import LazyLoadImg from '@/components/LazyLoadImg.vue';
import { RecommendSongListRet } from '@/service/api/music/types';
import { formatPlayCount } from '@/utils';
import { useRouter } from 'vue-router';
import Message from "@/components/message"
import { getDayRecommend, getSongListDetail } from '@/service/api/music';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const { checkMusicCopyright, playSongList } = useMusicPlayRelation()
const router = useRouter()
const props = defineProps<{
    songListItem: RecommendSongListRet
    type: number // 0: 每日歌曲推荐 1： 普通歌单
}>()

// 播放所有歌单歌曲 需要过滤
const playAllSongList = async () => {
    // 获取详情
    // 资源id 如果是每日推荐写死100
    let ids: number[] = []
    let sourceId = 100
    if (props.type === 0) {
        // 每日歌曲推荐
        const r = await getDayRecommend()
        ids = r.data.dailySongs.filter(item => checkMusicCopyright(item.fee, !item.noCopyrightRcmd)).map(it => it.id)
    }
    if (props.type === 1) {
        sourceId = props.songListItem.id!
        const r = await getSongListDetail({ id: props.songListItem.id! })
        ids = r.playlist.tracks.filter(item => checkMusicCopyright(item.fee, !item.noCopyrightRcmd)).map(it => it.id)
    }
    if (!ids.length) {
        return Message.error("惊不惊喜，一首都不让你听>_<")
    }
    playSongList(JSON.stringify(ids), sourceId)
}
// 前往歌单页
const goSongList = () => {
    if (props.type === 1) { // 普通歌单
        return router.push(`/song-list/${props.songListItem.id}`)
    }
    // 每日歌曲推荐
    router.push('/day-recommend')
}
</script>
<style lang="scss" scoped>
.recommend-songlist-card-wrapper {
    width: calc(20% - 18px);
    margin-bottom: 45px;


    .img-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        // border: 1px solid #eee;
        // background-color: #d33b31;

        img {
            width: 100%;
            // height: 100%;
        }

        .mask {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 100%;
            height: 30px;
            background-image: linear-gradient(rgba(#000, 0.3), rgba(#000, 0));
        }

        .play-count {
            position: absolute;
            right: 5px;
            top: 5px;
            color: white;
            // background-color: rgba($color: #000000, $alpha: 0.1);
        }

        .play-btn {
            @include common-play-btn(30px, 7px, 10px);
            bottom: -5px;
            right: -5px;
            display: none;
        }

        .isCenter {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        &:hover {
            cursor: pointer;

            .play-btn {
                display: block;

            }
        }

    }

    .isNotDayRecomnend {
        background-color: var(--theme-dc);
    }

    .songlist-name {
        word-break: break-all;


        &:hover {
            color: var(--theme-3a);
            cursor: pointer;
        }
    }

}
</style>
