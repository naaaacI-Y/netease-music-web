<template>
    <div class="wrapper d-flex">
        <div class="rand-card-wrapper mb-30">
            <div class="img-wrap mb-5">
                <img :src="rankItem.coverImgUrl" alt="">
                <div class="play-btn">
                    <div class="trangel"></div>
                </div>
                <slot name="playCount"></slot>
                <slot name="updateTime"></slot>
            </div>
            <slot name="songListName"></slot>
        </div>
        <div class="rank-card-right ml-30" v-if="isShowRight">
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
    </div>
</template>

<script lang="ts" setup>
import { RankList } from '@/service/api/rank/types';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import SongListItem from '@/components/song/SongListItem.vue';
import { HotSong } from '@/service/api/singer/types';
import { getSongListDetail } from '@/service/api/music';
import { TrackId } from '@/service/api/music/types';
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
const checkAll = () => {
    router.push(`/song-list/${props.rankItem.id}?rankType=${props.rankType}`)
}
const width = computed(() => {
    return props.cardWidth + "px"
})
const getRankDetail = async () => {
    const r = await getSongListDetail({ id: props.rankItem.id })
    randDetail.data = r.playlist.tracks.slice(0, 5)
    flagDetail.data = r.playlist.trackIds || []
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
