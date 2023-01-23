<template>
    <div class="head mb-12 text-00" @click="router.push('/findMusic/song-menu')">推荐歌单 <i
            class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="song-list-wrapper d-flex flex-wrap jc-between mb-20">
        <DayRecommendCard :type="0" :song-list-item="{ name: '每日歌曲推荐' }">
            <template #canlender>
                <div class="canlender" style="color: white;">
                    <div class="day">{{ day }}</div>
                    <i class="iconfont icon-rili"></i>
                </div>
            </template>
        </DayRecommendCard>
        <DayRecommendCard v-for="item in recommendSongList.data" :key="item.id" :song-list-item="item" :type="1">
        </DayRecommendCard>
    </div>
</template>

<script lang="ts" setup>
import DayRecommendCard from './components/DayRecommendCard.vue';
import { Recommend } from '@/service/api/recommend/types';
import { useRouter } from 'vue-router';
import { getRecommendSongList } from '@/service/api/music';

const router = useRouter()
const recommendSongList = reactive({ data: [] as Recommend[] })
const day = new Date().getDate()

// 获取每日推荐歌单
const getSongListNotLogin = async () => {
    const r = await getRecommendSongList({ limit: 9 })
    recommendSongList.data = r.result
}

getSongListNotLogin()
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
