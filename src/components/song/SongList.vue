<template>
    <div class="song-list-wrapper">
        <div class="head text-99 fs-2 d-flex ai-center">
            <div class="music-title" :style="{ width: rankType === -1 ? '34.8%' : '42.8%' }">音乐标题</div>
            <div class="rate" v-if="rankType === -1">飙升率</div>
            <div class="music-singer">歌手</div>
            <div class="music-album">专辑</div>
            <div class="music-time">时长</div>
        </div>
        <div class="song-wrapper" v-if="list?.data?.length && !isShowLoading">
            <SongListItem v-for="(item, index) in list.data" :index="index + 1" :type="0" :item="item" :key="item.id"
                @update-song-list-header-info="emits('updateHeaderInfo')">
                <template #flagInside>
                    <div class="flag d-flex ai-center jc-center" v-if="!info!.data[index]?.ratio">
                        <i class="iconfont icon-new text-new" v-if="info!.data[index]?.lr === undefined"></i>
                        <div class="no-change" v-if="info!.data[index]?.lr === 0 || info!.data[index]?.lr === index">
                            <span class="text-99">-</span>
                        </div>
                        <i class="iconfont icon-xiangshangjiantou text-primary_red_4"
                            v-if="info!.data[index]?.lr! > index"></i>
                        <i class="iconfont icon-xiangxiajiantou text-deep_blue"
                            v-if="info!.data[index]?.lr! < index"></i>
                    </div>
                </template>
                <template #rate v-if="rankType === -1">
                    <div class="rate d-flex ai-center">{{ info!.data[index]?.ratio }}%</div>
                </template>
            </SongListItem>
        </div>
        <Loading v-show="isShowLoading"></Loading>
    </div>
</template>

<script lang="ts" setup>
import Loading from '../Loading.vue';
import { TrackId } from '@/service/api/music/types';
import { HotSong } from '@/service/api/singer/types';
import { inject, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import SongListItem from './SongListItem.vue';
import { getMusicDetail } from '@/service/api/music';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const injectSongList = inject<{ data: HotSong[] }>("songList")
const injectSongListInfo = inject<{ data: TrackId[] }>("songListInfo")
// 取消收藏会更改列表数据
const list = reactive({ data: [] as HotSong[] })
const info = inject<{ data: TrackId[] }>("songListInfo")
const route = useRoute()
const rankType = Number(route.query.rankType)
const { likedList, player, createdSongList } = useMusicPlayRelation()
defineProps<{
    isShowLoading: boolean
}>()
const emits = defineEmits<{
    (e: "updateListInfo"): void
    (e: "updateHeaderInfo"): void
}>()
watchEffect(() => {
    if (injectSongList?.data?.length) {
        list.data = injectSongList?.data
    }
    if (injectSongListInfo?.data?.length) {
        info!.data = injectSongListInfo?.data || []
    }
})
// 如果当前界面在我喜欢的界面，喜欢或者取消喜欢都需要更新列表
watch(() => likedList.value.length, async (newVal, oldVal) => {
    const idx = createdSongList.value.findIndex(item => item.id == Number(route.params.id))
    if (idx !== -1) {
        if (oldVal > newVal) {
            return list.data = list.data.filter(item => likedList.value.includes(item.id))
        }
        // 构建一条新数据插入
        if (player.value.isPersonalFM) {
            // 需要重新获取歌曲详情
            const r = await getMusicDetail(String(player.value.personalFMTrack.id))
            return list.data.unshift(r.songs[0])
        }
        list.data.unshift(player.value.currentTrack)
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
