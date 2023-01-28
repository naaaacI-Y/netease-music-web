<template>
    <RecycleScroller id="scroller" class="pb-30" :items="allVideoLists.data" :item-size="217" key-field="id"
        :buffer="1906" style="height: 100%;width: 100%;">
        <template #before>
            <div class="filter-wrapper mb-20">
                <FilterItem :active-type="videoTypes[activeType]" :type-list="videoTypes"
                    @change-active-type="changeActiveType">
                    <template #left-label>
                        <div class="category-btn d-flex ai-center jc-center text-66">
                            <span class="fs-3 mr-5 ">{{ activeType }}</span>
                            <i class="iconfont icon-xiangyou2 fs-3"></i>
                        </div>
                    </template>
                </FilterItem>
            </div>
        </template>
        <template v-slot="{ item }">
            <div class="video-list-wrap d-flex flex-wrap jc-between">
                <VideoCard :is-play-btn="true" :is-show-time="true" v-for="(it, index) in item.dataList"
                    :video-item="it" :key="item.id + '' + index"></VideoCard>
            </div>

        </template>
        <template #after>
            <div class="loading-wrap" style="margin-top: -10px;">
                <Loading :is-need-show-scroll="false" :is-show-padding-top="false" v-show="loading"></Loading>
            </div>
        </template>
    </RecycleScroller>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import FilterItem from '@/components/FilterItem.vue';
import VideoCard from '@/components/VideoCard.vue';
import { getVideoByCategory, getVideoLabelList } from '@/service/api/video';
import { VideoByCategoryItem, VideoByCategoryRet, VideoGroupItem } from '@/service/api/video/types';
import { debounce, FormatList, formatListData } from '@/utils';
import { videoTypes } from '@/utils/const';
import { useScroll } from '@/hooks/useScroll';
const { listenListScroll, removeListener } = useScroll()
const allVideoLists = reactive({ data: [] as FormatList<VideoByCategoryItem> })
const labelList = reactive({ data: [] as VideoGroupItem[] })
const activeType = ref('现场')
// const isShowLoading = ref(true) // 类型切换的loading
// const isShowLoading4LoadMore = ref(false)
const loaded = ref(false)
const loading = ref(false)
const initState = () => {
    loading.value = false
    loaded.value = false
    // isShowLoading.value = true
    allVideoLists.data = []
}

watch(() => labelList.data, () => {
    getList()
})
// 类型切换
const changeActiveType = (name: string) => {
    activeType.value = name
    initState()
    getList()
}
// 获取视频标签
const getVideoLabel = async () => {
    try {
        const r = await getVideoLabelList()
        labelList.data = r.data.filter(item => item.name !== "MV")
    } catch (error) {

    }
}
// 给列表数据添加id === vid
const addIdPropertety = (videoDatas: Array<VideoByCategoryRet>) => {
    return videoDatas.map(item => {
        item.data.id = item.data.vid
        return item.data
    })
}
// 获取所有视频
const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    const idx = labelList.data.findIndex(item => item.name === activeType.value)
    const id = labelList.data[idx].id
    try {
        const r1 = await getVideoByCategory({ id })
        const r2 = await getVideoByCategory({ id })
        const r3 = await getVideoByCategory({ id })

        const _ = formatListData<VideoByCategoryItem>(addIdPropertety([...r1.datas, ...r2.datas, ...r3.datas]))
        allVideoLists.data = allVideoLists.data.concat(..._)
        loading.value = false
        loaded.value = !r3.hasmore
    } catch (error) {
        loading.value = false
    }
}

onMounted(() => {
    const scroller = document.getElementById("scroller")
    setTimeout(() => {
        // 这里不用定时的话 传递进去的值是在获取数据结束之前的
        listenListScroll(scroller!, [getList, loaded.value, loading.value])
    }, 1500)
})
onUnmounted(() => {
    const scroller = document.getElementById("scroller")
    removeListener(scroller!, [getList, loaded.value, loading.value])
})
getVideoLabel()
</script>
<style lang="scss" scoped>
.video-list-wrap,
.filter-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}

.category-btn {
    border: 1px solid var(--theme-e5);
    padding: 4px 0;
    width: 100px;
    border-radius: 20px;
}

.loading-wrap {
    height: 50px;
    // width: 100%;
}
</style>
