<template>
    <div class="song-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <Header></Header>
            <SongListItem v-for="(item, index) in songs.data" :key="item.id" :index="index + 1" :type="0" :item="item"
                :colorful="true">
                <template #song>
                    <div class="tns fs-2 text-89" v-if="item.tns">{{ item.tns[0] }}</div>
                </template>
            </SongListItem>
        </div>
        <Pagination v-if="pages.total >= pages.size && !isShowLoading && pages.total" :total="pages.total"
            :size="pages.size" :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>
        <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
            style="margin-top: 100px;">
            很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何单曲
        </div>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import SongListItem from '@/components/song/SongListItem.vue';
import { searchByType } from '@/service/api/search';
import { SearchSongResult } from '@/service/api/search/types';
import { Song } from '@/service/api/singer/types';
import { computed, provide, reactive, ref, watch } from 'vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';
import Header from '@/components/header/Header.vue';
import { scrollToTop } from '@/utils';

const route = useRoute()
const songs = reactive({ data: [] as Song[] })
const isShowLoading = ref(false)
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})

provide("songListInfo", [])
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = computed(() => {
    return route.params.keywords as string
})
watch(() => pages.total, (newVal) => {
    emits("changeTotal", newVal)
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
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords: keywords.value, type: 1, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchSongResult
    songs.data = _.songs
    pages.total = _.songCount
    isShowLoading.value = false
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }
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
