<template>
    <div class="song-list-wrapper">
        <div class="head text-black_13 fs-2 d-flex ai-center">
            <div class="music-title">音乐标题</div>
            <div class="music-singer">歌手</div>
            <div class="music-album">专辑</div>
            <div class="music-time">时长</div>
        </div>
        <div class="song-wrapper" v-if="list?.data?.length">
            <SongListItem v-for="(item, index) in list.data" :index="index + 1" :type="0" :item="item" :key="item.id">
            </SongListItem>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotSong } from '@/service/api/singer/types';
import { inject, reactive, watchEffect } from 'vue';
import SongListItem from './SongListItem.vue';
const injectSongList = inject<{ data: HotSong[] }>("songList")
const list = reactive({ data: [] as HotSong[] })
watchEffect(() => {
    if (injectSongList?.data?.length) {
        list.data = injectSongList?.data
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
}
</style>
