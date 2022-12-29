<template>
    <div class="song-list-wrapper">
        <div class="head text-black_13 fs-2 d-flex ai-center">
            <div class="music-title" :style="{ width: rankType === -1 ? '34.8%' : '42.8%' }">音乐标题</div>
            <div class="rate" v-if="rankType === -1">飙升率</div>
            <div class="music-singer">歌手</div>
            <div class="music-album">专辑</div>
            <div class="music-time">时长</div>
        </div>
        <div class="song-wrapper" v-if="list?.data?.length">
            <SongListItem v-for="(item, index) in list.data" :index="index + 1" :type="0" :item="item" :key="item.id">
                <template #flagInside>
                    <div class="flag d-flex ai-center jc-center" v-if="!info!.data[index].ratio">
                        <i class="iconfont icon-new text-new" v-if="info!.data[index].lr === undefined"></i>
                        <div class="no-change" v-if="info!.data[index].lr === 0 || info!.data[index].lr === index">
                            <span>-</span>
                        </div>
                        <i class="iconfont icon-xiangshangjiantou text-primary_red_4"
                            v-if="info!.data[index].lr! > index"></i>
                        <i class="iconfont icon-xiangxiajiantou text-deep_blue"
                            v-if="info!.data[index].lr! < index"></i>
                    </div>
                </template>
                <template #rate v-if="rankType === -1">
                    <div class="rate d-flex ai-center">{{ info!.data[index].ratio }}%</div>
                </template>
            </SongListItem>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TrackId } from '@/service/api/music/types';
import { HotSong } from '@/service/api/singer/types';
import { inject, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import SongListItem from './SongListItem.vue';
const injectSongList = inject<{ data: HotSong[] }>("songList")
const injectSongListInfo = inject<{ data: TrackId[] }>("songListInfo")
const list = reactive({ data: [] as HotSong[] })
const info = inject<{ data: TrackId[] }>("songListInfo")
const rankType = Number(useRoute().query.rankType)
watchEffect(() => {
    if (injectSongList?.data?.length) {
        list.data = injectSongList?.data
    }
    if (injectSongListInfo?.data?.length) {
        info!.data = injectSongListInfo?.data || []
    }
})
</script>
<style lang="scss" scoped>
.song-list-wrapper {
    width: 100%;

    .head {
        height: 35px;
        padding-left: 7.2%;

        .music-title {
            width: 42.8%;
        }

        .rate {
            width: 8%;
        }

        .music-singer {
            width: 20.7%;
        }

        .music-album {
            width: 25.7%;
        }

        .music-time {
            width: 9.6%;
        }
    }

    .flag {
        width: 25px;
    }

    .no-change span {
        font-size: 12px;
        transform: scale(0.7);
        display: inline-block;
    }

    .song-wrapper {
        .rate {
            color: #565656;
            width: 8%;
        }
    }

}
</style>
