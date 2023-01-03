<template>
    <div class="video-wrapper d-flex flex-wrap">
        <VideoCard v-for="(item, index) in videoList.data" :key="item.vid" :video-item="item" :count="5"
            :is-show-time="true" class="video-item">
            <template #mv-flag>
                <div class="mv-flag mr-8 text-primary_red_4 fs-1">MV</div>
            </template>
        </VideoCard>
    </div>
</template>

<script lang="ts" setup>
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
const videoList = reactive({ data: [] as Video[] })
const total = ref(0)
const getSearchVideoList = async () => {
    const r = await searchByType({ keywords, type: 1014 })
    const _ = r.result as unknown as SearchVideoResult
    videoList.data = _.videos
    total.value = _.videoCount
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
