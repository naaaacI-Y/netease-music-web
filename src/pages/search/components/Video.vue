<template>
    <div class="video-wrapper d-flex flex-wrap">
        <div class="wrap d-flex flex-wrap" v-show="!isShowLoading && pages.total">
            <VideoCard v-for="(item, index) in videoList.data" :key="item.vid" :video-item="item" :count="5"
                :colorful="true" :is-show-time="true" class="video-item">
                <template #mv-flag>
                    <div class="mv-flag mr-8 text-primary_red_4 fs-1">MV</div>
                </template>
            </VideoCard>
        </div>
        <Pagination v-if="pages.total >= pages.size && !isShowLoading && pages.total" :total="pages.total"
            :size="pages.size" :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"
            style="width:100%"></Pagination>
    </div>
    <Loading v-show="isShowLoading"></Loading>
    <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
        style="margin-top: 100px;">
        很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何视频
    </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import VideoCard from '@/components/VideoCard.vue';
import { searchByType } from '@/service/api/search';
import { SearchVideoResult, Video } from '@/service/api/search/types';
import { scrollToTop } from '@/utils';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const isShowLoading = ref(false)
const keywords = useRoute().params.keywords as string
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const videoList = reactive({ data: [] as Video[] })


// isShowTime:true isOneline: false
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
watch(() => pages.total, (newVal) => {
    emits("changeTotal", newVal)
})


const handlePageChange = (num: number) => {
    pages.page = num
    getSearchVideoList()
}
const getSearchVideoList = async () => {
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords, type: 1014, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchVideoResult
    videoList.data = _.videos
    pages.total = _.videoCount
    isShowLoading.value = false
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }

}
getSearchVideoList()
</script>
<style lang="scss" scoped>
.video-wrapper {
    padding: 0 30px;

    .video-item {
        margin-right: 18px;

        .mv-flag {
            border: 1px solid #c3473a;
            padding: 0px 5px;
            text-align: center;
            line-height: 15px;
            border-radius: 4px;
        }
    }

    .video-item:nth-child(5n) {
        margin-right: 0;
    }
}
</style>
