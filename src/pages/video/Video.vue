<template>
    <div class="video-wrapper">
        <CommonBtn :types="videoTypes" :active-type="activeType" @change-active-type="changeActiveType"></CommonBtn>
        <div class="video-list-wrap d-flex flex-wrap jc-between">
            <VideoCard :is-play-btn="true" :is-show-time="true" v-for="item in allVideoLists.data" :video-item="item"
                :key="item.data.vid"></VideoCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CommonBtn from '@/components/global/CommonBtn.vue';
// import RecommendMvCard from '@/components/RecommendMvCard.vue';
import VideoCard from '@/components/VideoCard.vue';
import { getVideoByCategory, getVideoLabelList } from '@/service/api/video';
import { VideoByCategoryRet, VideoGroupItem } from '@/service/api/video/types';
import { videoTypes } from '@/utils/const';
import { reactive, ref, watchEffect } from 'vue';
const allVideoLists = reactive({ data: [] as VideoByCategoryRet[] })
const labelList = reactive({ data: [] as VideoGroupItem[] })
const activeType = ref(0)
const changeActiveType = (num: number) => {
    activeType.value = num
}
// 获取视频标签
const getVideoLabel = async () => {
    const r = await getVideoLabelList()
    labelList.data = r.data
}
watchEffect(async () => {
    const idx = labelList.data.findIndex(item => item.name === videoTypes[activeType.value])
    console.log(idx, "idxxxxxxxxxx");

    const id = labelList.data[idx].id
    const r = await getVideoByCategory({ id })
    allVideoLists.data = r.datas
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
