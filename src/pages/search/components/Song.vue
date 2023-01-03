<template>
    <div class="song-wrapper">
        <Header></Header>
        <SongListItem v-for="(item, index) in songs.data" :key="item.id" :index="index" :type="0" :item="item">
            <template #song>
                <div class="tns fs-2 text-89" v-if="item.tns">{{ item.tns[0] }}</div>
            </template>
        </SongListItem>
    </div>
</template>

<script lang="ts" setup>
import SongListItem from '@/components/song/SongListItem.vue';
import { searchByType } from '@/service/api/search';
import { SearchSongResult } from '@/service/api/search/types';
import { Song } from '@/service/api/singer/types';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from './Header.vue';
const songs = reactive({ data: [] as Song[] })
const total = ref(0)
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().query.keywords as string
const getSongs = async () => {
    const r = await searchByType({ keywords, type: 1 })
    const _ = r.result as unknown as SearchSongResult
    songs.data = _.songs
    total.value = _.songCount
    emits("changeTotal", _.songCount)
}
getSongs()
</script>
<style lang="scss" scoped>
.song-wrapper {
    padding: 0 30px;

    .tns {
        padding-left: 7.2%;
        padding-bottom: 10px;
    }
}
</style>
