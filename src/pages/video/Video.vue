<template>
    <div class="video-wrapper">
        <FilterItem :active-type="videoTypes[activeType]" :type-list="videoTypes"
            @change-active-type="changeActiveType">
            <template #left-label>
                <div class="category-btn d-flex ai-center jc-center text-66">
                    <span class="fs-3 mr-5 ">{{ videoTypes[activeType] }}</span>
                    <i class="iconfont icon-xiangyou2 fs-3"></i>
                </div>
            </template>
        </FilterItem>
        <div class="video-list-wrap d-flex flex-wrap jc-between">
            <VideoCard :is-play-btn="true" :is-show-time="true" v-for="item in allVideoLists.data"
                :video-item="item.data" :key="item.data.vid"></VideoCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterItem from '@/components/FilterItem.vue';
import VideoCard from '@/components/VideoCard.vue';
import { getVideoByCategory, getVideoLabelList } from '@/service/api/video';
import { VideoByCategoryRet, VideoGroupItem } from '@/service/api/video/types';
import { videoTypes } from '@/utils/const';
import { reactive, ref, watchEffect } from 'vue';
const allVideoLists = reactive({ data: [] as VideoByCategoryRet[] })
const labelList = reactive({ data: [] as VideoGroupItem[] })
const activeType = ref('内地')
const changeActiveType = (name: string) => {
    activeType.value = name
}
// 获取视频标签
const getVideoLabel = async () => {
    const r = await getVideoLabelList()
    labelList.data = r.data
}
watchEffect(async () => {
    const idx = labelList.data.findIndex(item => item.name === activeType.value)
    if (idx !== -1) {
        const id = labelList.data[idx].id
        const r = await getVideoByCategory({ id })
        allVideoLists.data = r.datas
    }

})
// 获取所有视频
// const getAllVideoLists = async () => {
//     const r = await getVideoByCategory({ id: 2103 })
//     allVideoLists.data = r.datas
// }
getVideoLabel()
// getAllVideoLists()
</script>
<style lang="scss" scoped>
.video-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}
</style>
