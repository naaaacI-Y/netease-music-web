<template>
    <div class="head mb-12" @click="router.push('/findMusic/song-menu')">推荐歌单 <i class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="song-list-wrapper d-flex flex-wrap jc-between mb-20">
        <DayRecommend :type="0" :song-list-item="{ name: '每日歌曲推荐' }">
            <template #canlender>
                <div class="canlender text-white">
                    <div class="day">{{ day }}</div>
                    <i class="iconfont icon-rili"></i>
                </div>
            </template>
        </DayRecommend>
        <DayRecommend v-for="item in recommendSongList.data" :key="item.id" :song-list-item="item" :type="1"
            @click="goSongList(item.id!)">
        </DayRecommend>
    </div>
</template>

<script lang="ts" setup>
import DayRecommend from './components/DayRecommend.vue';
import { getDayRecommendSongList } from '@/service/api/recommend';
import { Recommend } from '@/service/api/recommend/types';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const recommendSongList = reactive({ data: [] as Recommend[] })
const day = new Date().getDate()
const goSongList = (id: number) => {
    router.push(`/song-list?id=${id}`)
}
const getRecommendSongList = async () => {
    const r = await getDayRecommendSongList()
    recommendSongList.data = r.recommend.slice(0, 9)
}
getRecommendSongList()
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}

.canlender {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    i {
        font-size: 90px;
    }

    .day {
        font-size: 35px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -24%);
    }
}
</style>
