<template>
    <div class="video-wrapper d-flex flex-wrap">
        <VideoCard v-for="(item, index) in videoList.data" :key="item.vid" :video-item="item" :count="5"
            :is-show-time="true" class="video-item">
            <template #mv-flag>
                <div class="mv-flag mr-8 text-primary_red_4 fs-1">MV</div>
            </template>
        </VideoCard>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30" style="width:100%"></Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import VideoCard from '@/components/VideoCard.vue';
import { searchByType } from '@/service/api/search';
import { SearchVideoResult, Video } from '@/service/api/search/types';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
// isShowTime:true isOneline: false
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().params.keywords as string
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const videoList = reactive({ data: [] as Video[] })
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchVideoList()
}
const getSearchVideoList = async () => {
    const r = await searchByType({ keywords, type: 1014, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchVideoResult
    videoList.data = _.videos
    pages.total = _.videoCount
    emits("changeTotal", _.videoCount)
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
