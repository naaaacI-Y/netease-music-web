<template>
    <div class="head mb-12">推荐歌单 <i class="iconfont icon-xiangyou1"></i></div>

    <div class="song-list-wrapper d-flex flex-wrap jc-between mb-20">
        <RecommendSongListCard v-for="item in 10" :key="item" @click="goSongList"></RecommendSongListCard>
    </div>
    <!-- <SongListItem v-for="item in 10" :index="item"></SongListItem> -->
</template>

<script lang="ts" setup>
import SongListItem from '@/components/SongListItem.vue';
import RecommendSongListCard from './components/RecommendSongListCard.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const goSongList = () => {
    router.push("/song-list")
}
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}
</style>
