<template>
    <DefaultLayout>
        <div class="singer-homepage-wrapper">
            <SingerHeader :singer-info="singerInfo.data" @change-collect-state="getSingeInfo(singerId)"></SingerHeader>
            <div class="tab-wrapper mt-30">
                <SwitchTabForSinger></SwitchTabForSinger>
            </div>
        </div>
    </DefaultLayout>

</template>

<script lang="ts" setup>
import { Artist, HotSong } from '@/service/api/singer/types';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import SingerHeader from '@/components/header/SingerHeader.vue';
import SwitchTabForSinger from '@/components/switchTab/SwitchTabForSinger.vue';
import { getSingelSingerSong } from "@/service/api/singer"
const { params } = useRoute()
const singerId = ref(Number(params.id)) // 歌手id
const singerInfo = reactive({ data: {} as Artist }) // 歌手信息
const hotSonList = reactive<Record<string, HotSong[]>>({ data: [] })
// 获取歌手信息以及top50歌曲信息
onBeforeRouteUpdate((to, from, next) => {
    getSingeInfo(Number(to.params.id))
    next()
})
const getSingeInfo = async (id: number) => {
    const r = await getSingelSingerSong({ id })
    hotSonList.data = r.hotSongs
    singerInfo.data = r.artist
}
getSingeInfo(singerId.value)
</script>
<style lang="scss" scoped>
.singer-homepage-wrapper {
    padding: 15px 30px;
}
</style>
