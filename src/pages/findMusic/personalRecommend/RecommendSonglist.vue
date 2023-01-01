<template>
    <div class="head mb-12" @click="router.push('/findMusic/song-menu')">推荐歌单 <i class="iconfont icon-xiangyou1"></i>
    </div>
    <div class="song-list-wrapper d-flex flex-wrap jc-between mb-20">
        <DayRecommendCard :type="0" :song-list-item="{ name: '每日歌曲推荐' }" @click="goSongList()" v-if="isLogin">
            <template #canlender>
                <div class="canlender text-white">
                    <div class="day">{{ day }}</div>
                    <i class="iconfont icon-rili"></i>
                </div>
            </template>
        </DayRecommendCard>
        <DayRecommendCard v-for="item in recommendSongList.data" :key="item.id" :song-list-item="item" :type="1"
            @click="goSongList(item.id!)">
        </DayRecommendCard>
    </div>
</template>

<script lang="ts" setup>
import DayRecommendCard from './components/DayRecommendCard.vue';
import { getDayRecommendSongList } from '@/service/api/recommend';
import { Recommend } from '@/service/api/recommend/types';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecommendSongList } from '@/service/api/music';
import { checkLogin } from '@/utils';
const route = useRoute()
const router = useRouter()
const isLogin = checkLogin()
const recommendSongList = reactive({ data: [] as Recommend[] })
const day = new Date().getDate()
const goSongList = (id?: number) => {
    if (id) { // 普通歌单
        return router.push(`/song-list?id=${id}`)
    }
    // 每日歌曲推荐
    router.push('/day-recommend')
}
const getSongListNotLogin = async () => {
    const limit = { limit: isLogin ? 9 : 10 }
    const r = await getRecommendSongList(limit)
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
