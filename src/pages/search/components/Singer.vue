<template>
    <div class="song-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <CommonItem v-for="(item, index) in singerList.data" :key="item.id" :index="index">
                <template #avatar>
                    <div class="avatar mr-15">
                        <img :src="item.picUrl" alt="">
                    </div>
                </template>
                <template #name>
                    <div class="name fs-3 d-flex ai-center text-33" v-html="keywordsColorful(item.name, keywords)">
                    </div>
                </template>
                <template #singer-flag v-if="item.accountId">
                    <div class="singer-flag d-flex ai-center jc-center" style="color: white;">
                        <i class="iconfont icon-iconfontyonghuming fs-2"></i>
                    </div>
                </template>
            </CommonItem>
        </div>
        <Pagination v-if="pages.total >= pages.size && !isShowLoading && pages.total" :total="pages.total"
            :size="pages.size" :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>

    </div>
    <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
        style="margin-top: 100px;">
        很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何歌手
    </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import { searchByType } from '@/service/api/search';
import { useRoute } from "vue-router"
import { Artist, SearchSingerResult } from '@/service/api/search/types';
import { reactive, ref, watch } from 'vue';
import CommonItem from '@/components/CommonItem.vue';
import { scrollToTop } from '@/utils';
import { keywordsColorful } from '@/utils';

const singerList = reactive({ data: [] as Artist[] })
const isShowLoading = ref(false)
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const keywords = useRoute().params.keywords as string

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
watch(() => pages.total, (newVal) => {
    emits("changeTotal", newVal)
})

const handlePageChange = (num: number) => {
    pages.page = num
    getSearchSinger()
}
const getSearchSinger = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords: keywords, type: 100, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchSingerResult
    singerList.data = _.artists
    pages.total = _.artistCount
    isShowLoading.value = false
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }
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
