<template>
    <div class="wrapper d-flex">
        <div class="rand-card-wrapper mb-30" @click="goGlobalRank(rankItem.id)">
            <div class="img-wrap mb-5">
                <img :src="rankItem.coverImgUrl" alt="">
                <div class="play-btn" @click.stop="playAll">
                    <div class="trangel"></div>
                </div>
                <slot name="playCount"></slot>
                <slot name="updateTime"></slot>
            </div>
            <slot name="songListName"></slot>
        </div>
        <div class="rank-card-right ml-30" v-if="isShowRight">
            <div class="song-item-wrap" v-if="randDetail.data.length">
                <SongListItem :type="3" :index="index + 1" v-for="(item, index) in randDetail.data" :item="item">
                    <template #flag>
                        <div class="flag text-c4 d-flex ai-center jc-center" v-if="flagDetail.data[index].ratio">
                            <span class="mini-size">{{ flagDetail.data[index].ratio }}%</span>
                        </div>
                        <div class="flag d-flex ai-center jc-center" v-if="!flagDetail.data[index].ratio">
                            <i class="iconfont icon-new text-new" v-if="flagDetail.data[index].lr === undefined"></i>
                            <div class="no-change"
                                v-if="flagDetail.data[index].lr === 0 || flagDetail.data[index].lr === index">
                                <span class="text-99">-</span>
                            </div>
                            <i class="iconfont icon-xiangshangjiantou text-primary_red_4"
                                v-if="flagDetail.data[index].lr! > index"></i>
                            <i class="iconfont icon-xiangxiajiantou text-deep_blue"
                                v-if="flagDetail.data[index].lr! < index"></i>
                        </div>
                    </template>
                </SongListItem>
                <div class="check-all mt-4 pl-8" @click="checkAll">
                    <span class="fs-1 text-66">查看全部</span>
                    <i class="iconfont icon-xiangyou2 fs-1 text-66"></i>
                </div>
            </div>
            <div class="no-data" v-show="!randDetail.data.length" style="height:200px;">
                <Loading></Loading>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Loading from './Loading.vue';
import { RankList } from '@/service/api/rank/types';
import { computed, provide, reactive } from 'vue';
import { useRouter } from 'vue-router';
import SongListItem from '@/components/song/SongListItem.vue';
import { HotSong } from '@/service/api/singer/types';
import { getSongListDetail } from '@/service/api/music';
import { TrackId } from '@/service/api/music/types';
import Message from "@/components/message"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const { checkMusicCopyright, playSongList, player } = useMusicPlayRelation()
const songListInfo = reactive({ data: [] as TrackId[] })
const router = useRouter()
const props = withDefaults(defineProps<{
    cardWidth: number
    rankItem: RankList
    isShowRight?: boolean
    rankType: number // -1： 飙升榜 1：普通榜单
}>(), {
    isShowRight: false

})
const randDetail = reactive({ data: [] as HotSong[] })
const flagDetail = reactive({ data: [] as TrackId[] })

provide("songListInfo", songListInfo) // 注入歌单列表数据 TrackId[] 只注入可以播放的

// 查看全部
const checkAll = () => {
    router.push(`/song-list/${props.rankItem.id}?rankType=${props.rankType}`)
}

const width = computed(() => {
    return props.cardWidth + "px"
})

// 播放全部
const playAll = async () => {
    if (player.value.playing && player.value.playlistSource.id === props.rankItem.id) return
    try {
        await getRankDetail()
        const ids = songListInfo.data.map(item => item.id)
        if (!ids.length) {
            return Message.error("惊不惊喜，一首都不让你听>_<")
        }
        playSongList(JSON.stringify(ids), props.rankItem.id)
    } catch (error) {
    }
}

// 获取排行榜详情
const getRankDetail = async () => {
    try {
        const r = await getSongListDetail({ id: props.rankItem.id })
        randDetail.data = r.playlist.tracks.slice(0, 5)

        songListInfo.data = r.playlist.trackIds?.slice(0, r.playlist.tracks.length)?.filter((_item, index) => {
            const _: HotSong = r.playlist.tracks[index]
            return checkMusicCopyright(_.fee, !_.noCopyrightRcmd, _.copyright)
        }) || []
        flagDetail.data = r.playlist.trackIds || []
    } catch (error) {
    }
}

// 排行榜跳转
const goGlobalRank = (id: number) => {
    router.push(`/song-list/${id}?rankType=1`)
}

props.isShowRight && getRankDetail()
</script>
<style lang="scss" scoped>
.rank-card-right {
    width: calc(100% - 202px);
    height: 100%;

    .check-all:hover {
        cursor: pointer;
        color: #222;
    }

    .flag {
        width: 25px;
    }

    .mini-size,
    .no-change span {
        font-size: 12px;
        transform: scale(0.7);
        display: inline-block;
    }
}

.rand-card-wrapper {
    .img-wrap {
        width: v-bind(width);
        height: v-bind(width);
        border-radius: 5px;
        position: relative;
        // background-color: #d33b31;

        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
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

}
</style>
