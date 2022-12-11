<template>
    <div class="song-list-wrapper">
        <div class="head text-black_13 fs-2 d-flex ai-center">
            <div class="music-title">音乐标题</div>
            <div class="music-singer">歌手</div>
            <div class="music-album">专辑</div>
            <div class="music-time">时长</div>
        </div>
        <div class="song-wrapper">
            <SongListItem v-for="item in 20" :index="item"></SongListItem>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SongListItem from './SongListItem.vue';
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
