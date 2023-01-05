<template>
    <div class="album-wrapper">
        <CommonItem v-for="(item, index) in albumList.data" :key="item.id" :index="index">
            <template #avatar>
                <div class="avatar mr-15">
                    <img :src="item.picUrl" alt="">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    {{ item.name }}
                </div>
            </template>
            <template #author>
                <div class="author fs-1 d-flex ai-center">
                    <span class="text-74">{{ item.artist.name }}</span>
                    <span class="alia text-97" v-if="item.alias?.length">({{ item.alias[0] }})</span>
                </div>
            </template>
        </CommonItem>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </div>
</template>

<script lang="ts" setup name="Album">
import Pagination from '@/components/Pagination.vue';

import { reactive, ref } from 'vue';
import CommonItem from './CommonItem.vue';
import { Album } from "@/service/api/recommend/types"
import { useRoute } from 'vue-router';
import { searchByType } from '@/service/api/search';
import { SearchAlbumResult } from '@/service/api/search/types';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const keywords = useRoute().params.keywords as string
const albumList = reactive({ data: [] as Album[] })
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchAlbumList()
}
const getSearchAlbumList = async () => {
    const r = await searchByType({ keywords: keywords, type: 10, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchAlbumResult
    albumList.data = _.albums
    pages.total = _.albumCount
    emits("changeTotal", _.albumCount)
}
getSearchAlbumList()
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

.author {
    width: 45%;
}
</style>
