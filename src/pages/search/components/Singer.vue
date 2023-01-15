<template>
    <div class="song-wrapper">
        <CommonItem v-for="(item, index) in singerList.data" :key="item.id" :index="index">
            <template #avatar>
                <div class="avatar mr-15">
                    <img :src="item.picUrl" alt="">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center text-33">
                    {{ item.name }}
                </div>
            </template>
            <template #singer-flag v-if="item.accountId">
                <div class="singer-flag d-flex ai-center jc-center" style="color: white;">
                    <i class="iconfont icon-iconfontyonghuming fs-2"></i>
                </div>
            </template>
        </CommonItem>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import { searchByType } from '@/service/api/search';
import { useRoute } from "vue-router"
import { Artist, SearchSingerResult } from '@/service/api/search/types';
import { reactive } from 'vue';
import CommonItem from '@/components/CommonItem.vue';
const singerList = reactive({ data: [] as Artist[] })

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const keywords = useRoute().params.keywords as string
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchSinger()
}
const getSearchSinger = async () => {
    const r = await searchByType({ keywords: keywords, type: 100, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchSingerResult
    singerList.data = _.artists
    pages.total = _.artistCount
    emits("changeTotal", _.artistCount)
}
getSearchSinger()
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

.singer-flag {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #c3473a;
}
</style>
