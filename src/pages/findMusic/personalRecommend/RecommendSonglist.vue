<template>
    <div class="head mb-12" @click="router.push('/findMusic/songMenu')">推荐歌单 <i class="iconfont icon-xiangyou1"></i>
    </div>

    <div class="song-list-wrapper d-flex flex-wrap jc-between mb-20">
        <RecommendSongListCard v-for="item in 10" :key="item" @click="goSongList"></RecommendSongListCard>
    </div>
</template>

<script lang="ts" setup>
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
