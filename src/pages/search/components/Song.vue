<template>
    <div class="song-wrapper">
        <Header></Header>
        <SongListItem v-for="(item, index) in songs.data" :key="item.id" :index="index + 1" :type="0" :item="item">
            <template #song>
                <div class="tns fs-2 text-89" v-if="item.tns">{{ item.tns[0] }}</div>
            </template>
        </SongListItem>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import SongListItem from '@/components/song/SongListItem.vue';
import { searchByType } from '@/service/api/search';
import { SearchSongResult } from '@/service/api/search/types';
import { Song } from '@/service/api/singer/types';
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/header/Header.vue';
const route = useRoute()
const songs = reactive({ data: [] as Song[] })
// const total = ref(0)
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = computed(() => {
    return route.params.keywords as string
})
watch(() => keywords.value, () => {
    pages.page = 1
    getSongs()
})
const handlePageChange = (num: number) => {
    pages.page = num
    getSongs()
}
const getSongs = async () => {
    const r = await searchByType({ keywords: keywords.value, type: 1, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchSongResult
    songs.data = _.songs
    pages.total = _.songCount
    emits("changeTotal", _.songCount)
    // pages.page++
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
