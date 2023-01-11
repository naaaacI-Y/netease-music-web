<template>
    <RecycleScroller id="scroller" class="pb-30" :items="allVideoLists.data" :item-size="217" key-field="id"
        :buffer="1038" style="height: 100%;width: 100%;">
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
                <Loading v-show="isShowLoading"></Loading>
            </div>
        </template>
        <template v-slot="{ item }">
            <div class="video-list-wrap d-flex flex-wrap jc-between">
                <VideoCard :is-play-btn="true" :is-show-time="true" v-for="(it, index) in item.dataList"
                    :video-item="it" :key="item.id + '' + index"></VideoCard>
            </div>

        </template>
        <template #after>
            <Loading :is-need-show-scroll="false" :is-show-padding-top="false" v-if="isShowLoading4LoadMore"></Loading>
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
import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue';
const allVideoLists = reactive({ data: [] as FormatList<VideoByCategoryItem> })
const labelList = reactive({ data: [] as VideoGroupItem[] })
const activeType = ref('现场')
const isShowLoading = ref(true) // 类型切换的loading
const isShowLoading4LoadMore = ref(false)
const loaded = ref(false) // 抽离出去 连同滚动的部分 卡片顶部和底部白色的文字看不清，增加遮罩 TODO
const loading = ref(false)
const initState = () => {
    loading.value = false
    loaded.value = false
    isShowLoading.value = true
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
    const r = await getVideoLabelList()
    labelList.data = r.data.filter(item => item.name !== "MV")
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
    const r1 = await getVideoByCategory({ id })
    const r2 = await getVideoByCategory({ id })
    const r3 = await getVideoByCategory({ id })

    const _ = formatListData<VideoByCategoryItem>(addIdPropertety([...r1.datas, ...r2.datas, ...r3.datas]))
    allVideoLists.data = allVideoLists.data.concat(..._)
    loading.value = false
    isShowLoading4LoadMore.value = false
    loaded.value = !r3.hasmore
    isShowLoading.value = false
}
// 监听歌手列表滚动
const handleListener = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部了 加载更多
        console.log("触底了======");
        isShowLoading4LoadMore.value = true
        if (!loaded.value && !loading.value) {
            getList()
        }
    }

}

const handleFn = debounce(handleListener, 100)
const listenListScroll = () => {
    const wrapper = document.getElementById("scroller")
    wrapper?.addEventListener("scroll", handleFn)
}
onMounted(() => {
    listenListScroll()
})
onUnmounted(() => {
    const wrapper = document.getElementById("scroller")
    wrapper?.removeEventListener("scroll", handleFn)
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
