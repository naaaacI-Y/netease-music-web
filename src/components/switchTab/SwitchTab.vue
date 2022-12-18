<template>
    <div class="tab-wrapper mt-30">
        <SwitchTabForSongList v-if="type === 0"></SwitchTabForSongList>
        <SwitchTabForSinger v-if="type === 1" :hot-song="HotSong"></SwitchTabForSinger>
        <SwitchTabForAlbum v-if="type === 2"></SwitchTabForAlbum>
    </div>
</template>

<script lang="ts" setup>
// 歌单 ==> 0
// 歌手 ==> 1
// 专辑 ==> 2
import SwitchTabForSongList from './SwitchTabForSongList.vue';
import SwitchTabForSinger from './SwitchTabForSinger.vue';
import SwitchTabForAlbum from "./SwicthTabForAlbum.vue"
import { HotSong } from '@/service/api/singer/types';

defineProps<{
    type: number
    hotSong?: HotSong[]
}>()
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
    .head {
        border-bottom: 1px solid #eee;

        .head-item {
            padding-bottom: 10px;

        }

        .isActive {
            border-bottom: 2px solid red;
            color: #d33b31;
        }
    }
}
</style>
