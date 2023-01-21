<template>
    <DefaultLayout>
        <!-- <RecycleScroller id="scroller" class=" pb-30" :items="list.data" :item-size="315" key-field="id" :buffer="900"
            style="height: 100%;width: 100%;padding: 0 30px;">
            <template #before>
                <div class="my-collection-wrapper">
                    <div class="title fs-3 text-33">
                        <span style="font-weight: bold;">收藏的视频</span>
                        <span class="text-66 fs-2">&nbsp;({{ total }})</span>
                    </div>
                </div>
            </template>
            <template v-slot="{ item, index }">
                <div class="d-flex flex-wrap jc-between singer-wrapper">
                    <VideoCard v-for="it in item.dataList" :video-item="it" :is-show-time="true" :count="5"
                        :key="it.id + 1">
                        <template #mv-flag v-if="Number(it.vid)">
                            <div class="mv-flag mr-8 text-primary_red_4 fs-1">MV</div>
                        </template>
                    </VideoCard>
                </div>
            </template>
            <template #after>
                <loading v-show="isShowLoaidng"></loading>
            </template>
        </RecycleScroller> -->
        <DynamicScroller :items="list.data" :min-item-size="225" id="scroller"
            style="height: 100%;width: 100%;padding: 0 30px;" class="scroller">
            <template #before>
                <div class="my-collection-wrapper">
                    <div class="title fs-3 text-33">
                        <span style="font-weight: bold;">收藏的视频</span>
                        <span class="text-66 fs-2">&nbsp;({{ total }})</span>
                    </div>
                </div>
            </template>
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.message]"
                    :data-index="index">
                    <div class="d-flex flex-wrap jc-between singer-wrapper">
                        <VideoCard v-for="it in item.dataList" :video-item="it" :is-show-time="true" :count="5"
                            :key="it.id + 1">
                            <template #mv-flag v-if="Number(it.vid)">
                                <div class="mv-flag mr-8 text-primary_red_4 fs-1">MV</div>
                            </template>
                        </VideoCard>
                    </div>
                </DynamicScrollerItem>
            </template>
            <template #after>
                <loading v-show="isShowLoaidng"></loading>
            </template>
        </DynamicScroller>

    </DefaultLayout>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import Loading from '@/components/Loading.vue';
import VideoCard from '@/components/VideoCard.vue';
import { getCollectedVideo } from '@/service/api/video';
import { CollectedVideoData } from "@/service/api/video/types"
import { debounce, FormatList, formatListData } from '@/utils';
const route = useRoute()

const loading = ref(false)
const loaded = ref(false)
const isShowLoaidng = ref(false)
const total = ref(0)
const list = reactive({ data: [] as FormatList<CollectedVideoData> })
const pages = reactive({
    page: 1,
    limit: 30
})
// 给列表数据添加id === vid
const addIdPropertety = (videoDatas: Array<CollectedVideoData>) => {
    return videoDatas.map(item => {
        item.id = item.vid
        return item
    })
}
const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    isShowLoaidng.value = true
    const queryInfo = {
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    const r = await getCollectedVideo(queryInfo) // 需要区分是mv还是视频
    // 格式化数据

    const _ = formatListData<CollectedVideoData>(addIdPropertety(r.data), 5)
    list.data = list.data.concat(..._)
    loaded.value = !r.hasMore
    total.value = r.count
    pages.page++
    loading.value = false
    isShowLoaidng.value = false
}
const handleListener = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
        // 加载更多
        console.log("触底加载");
        if (!loaded.value && !loading.value) {
            getList()
        }
    }
}
const handleFn = debounce(handleListener, 100)
const listenListScroll = (scroller: HTMLElement) => {
    scroller?.addEventListener("scroll", handleFn)
}
const removeListener = (scroller: HTMLElement) => {
    scroller?.removeEventListener("scroll", handleFn)
}
onMounted(() => {
    const scroller = document.getElementById("scroller")
    listenListScroll(scroller!)
})
onUnmounted(() => {
    const scroller = document.getElementById("scroller")
    removeListener(scroller!)
})
getList()
</script>
<style lang="scss" scoped>
.title {
    padding-top: 25px;
    margin-bottom: 25px;
}

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

.mv-flag {
    border: 1px solid #c3473a;
    padding: 0px 5px;
    text-align: center;
    line-height: 15px;
    border-radius: 4px;
}
</style>
