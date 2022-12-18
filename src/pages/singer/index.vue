<template>
    <DefaultLayout>
        <div class="singer-homepage-wrapper">
            <SingerHeader :singer-info="singerInfo.data"></SingerHeader>
            <SwitchTab :type="1" :hot-song="hotSonList.data"></SwitchTab>
        </div>
    </DefaultLayout>

</template>

<script lang="ts" setup>
import { Artist, HotSong } from '@/service/api/singer/types';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import SingerHeader from '../../components/singer/SingerHeader.vue';
import SwitchTab from '../../components/switchTab/SwitchTab.vue';
import { getSingelSingerSong } from "@/service/api/singer"
const { query } = useRoute()
const singerId = Number(query.id) // 歌手id
const singerInfo = reactive({ data: {} as Artist }) // 歌手信息
const hotSonList = reactive<Record<string, HotSong[]>>({ data: [] })
// 获取歌手信息以及top50歌曲信息
const getSingeInfo = async () => {
    const r = await getSingelSingerSong({ id: singerId })
    hotSonList.data = r.hotSongs
    singerInfo.data = r.artist
}
getSingeInfo()
</script>
<style lang="scss" scoped>
.singer-homepage-wrapper {
    padding: 15px 30px;
}
</style>
