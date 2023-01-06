<template>
    <div class="song-list-wrapper">
        <CommonItem v-for="(item, index) in songList.data" :index="item.id" :key="index">
            <template #avatar>
                <div class="avatar mr-15">
                    <img :src="item.coverImgUrl" alt="">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center text-33">
                    {{ item.name }}
                </div>
            </template>
            <template #song-count>
                <div class="song-count fs-1 text-c7">
                    {{ item.trackCount }}首
                </div>
            </template>
            <template #author>
                <div class="author fs-1 text-c7">
                    <span class="by mr-5">by</span>
                    <span class="auth" v-if="item.creator">{{ item.creator?.nickname }}</span>
                </div>
            </template>
        </CommonItem>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import { searchByType } from "@/service/api/search";
import { Playlist, SearchSongListResult } from "@/service/api/search/types"
import { reactive } from 'vue';
import { useRoute } from "vue-router";
import CommonItem from './CommonItem.vue';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().params.keywords as string
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const songList = reactive({ data: [] as Playlist[] })
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchSongList()
}
const getSearchSongList = async () => {
    const r = await searchByType({ keywords: keywords, type: 1000, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchSongListResult
    songList.data = _.playlists
    pages.total = _.playlistCount
    emits("changeTotal", _.playlistCount)
}
getSearchSongList()
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}

.song-count {
    width: 15%;
}

.author {
    width: 20%;

    .auth:hover {
        cursor: pointer;
        color: var(--theme-85);
    }
}
</style>
