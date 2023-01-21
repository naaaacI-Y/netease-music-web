<template>
    <!-- router.push('/findMusic/newest-music') -->
    <div class="head mb-12 d-flex ai-center text-00" @click="router.push('/findMusic/newest-music')">最新音乐 <i
            class="iconfont icon-xiangyou1 ml-4"></i></div>

    <div class="new-music-wrapper d-flex ai-center jc-between mb-30">

        <div class="new-music-left">
            <div class="new-music-item" v-for="(item, index) in newMusicList.data.slice(0, 5)" :key="index">
                <NewMusicItem :index="index + 1" :music-item="item"></NewMusicItem>
            </div>

        </div>
        <div class="new-music-right">
            <div class="new-music-item" v-for="(item, index) in newMusicList.data.slice(5)" :key="index">
                <NewMusicItem :index="index + 1 + 5" :music-item="item"></NewMusicItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import NewMusicItem from './components/NewMusicItem.vue';
import { getRecommendNewMusic } from "@/service/api/recommend/index"
import { RecommendNewMusicRet } from '@/service/api/recommend/types';
const router = useRouter()
const newMusicList = reactive<Record<string, RecommendNewMusicRet[]>>({ data: [] })
const getRecommendMusic = async () => {
    const r = await getRecommendNewMusic()

    newMusicList.data = r.result
}
getRecommendMusic()
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}

.new-music-wrapper {

    .new-music-left,
    .new-music-right {
        width: 513px;

        .new-music-item {
            border-top: 1px solid var(--theme-ee);

            &:hover {
                background-color: var(--theme-f5);
            }
        }

        // .new-music-item
    }
}
</style>
