<template>
    <div class="album-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <CommonItem v-for="(item, index) in albumList.data" :key="item.id" :index="index"
                @click="router.push(`/album/${item.id}`)">
                <template #avatar>
                    <div class="avatar mr-15">
                        <img :src="item.picUrl" alt="">
                    </div>
                </template>
                <template #name>
                    <div class="name fs-3 d-flex ai-center text-33" v-html="keywordsColorful(item.name, keywords)">
                    </div>
                </template>
                <template #author>
                    <div class="author fs-1 d-flex ai-center">
                        <span class="text-74" v-html="keywordsColorful(item.artist.name, keywords)"></span>
                        <span class="alia text-97" v-if="item.alias?.length">({{ item.alias[0] }})</span>
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
        很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何专辑
    </div>
</template>

<script lang="ts" setup name="Album">
import Pagination from '@/components/Pagination.vue';
import { keywordsColorful } from '@/utils';
import CommonItem from '@/components/CommonItem.vue';
import { Album } from "@/service/api/recommend/types"
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';
import { searchByType } from '@/service/api/search';
import { SearchAlbumResult } from '@/service/api/search/types';
import { scrollToTop } from '@/utils';

const router = useRouter()
const isShowLoading = ref(false)
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
watch(() => pages.total, () => {
    emits("changeTotal", pages.total)
})
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchAlbumList()
}
const getSearchAlbumList = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords: keywords, type: 10, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchAlbumResult
    albumList.data = _.albums
    isShowLoading.value = false
    pages.total = _.albumCount
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }
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
