<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" class=" pb-30" :items="list.data" :item-size="size" key-field="id"
            :buffer="size * 8" style="height: 100%;width: 100%;">
            <template #before>
                <div class="my-collection-wrapper">
                    <div class="title fs-3">
                        <span style="font-weight: bold;">收藏的{{ title }}</span>
                        <span class="text-66 fs-2">&nbsp;({{ count }})</span>
                    </div>
                </div>
            </template>
            <template v-slot="{ item }">
                <div class="d-flex flex-wrap jc-between singer-wrapper" v-if="title === '专辑'">
                    <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard>
                </div>
                <div class="d-flex flex-wrap jc-between singer-wrapper" v-if="title === '歌手'">
                    <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard>
                </div>
                <div class="d-flex flex-wrap jc-between singer-wrapper" v-if="title === '视频'">
                    <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard>
                </div>
            </template>
        </RecycleScroller>

    </DefaultLayout>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useRoute } from "vue-router"
import { onBeforeRouteUpdate } from 'vue-router';
import { getCollectedSinger } from '@/service/api/singer';
import { getCollectedAlbum } from '@/service/api/album';
import { getCollectedVideo } from '@/service/api/video';
import { CollectedSingerResult } from "@/service/api/singer/types"
import { CollectedAlbumResult } from "@/service/api/album/types"
import { CollectedVideoResult } from "@/service/api/video/types"
const route = useRoute()
const count = ref(0)
const size = ref(80) // 滚动项大小
const loading = ref(false)
const loaded = ref(false)
const isShowLoaidng = ref(false)
const list = reactive({ data: [] as CollectedSingerResult["data"] | CollectedAlbumResult["data"] | CollectedVideoResult["data"] })
const pages = reactive({
    page: 1,
    limit: 30
})
const title = computed(() => {
    const idx = Number(route.params.index)
    size.value = idx !== 3 ? 80 : 225
    return idx === 1 ? "专辑" : idx === 2 ? "歌手" : "视频"
})

const initQueryInfo = () => {
    pages.page = 1
    loading.value = false
    loaded.value = false

}
const getList = async () => {
    let r: CollectedVideoResult | CollectedSingerResult | CollectedAlbumResult
    if (loaded.value || loading.value) return
    loading.value = true
    isShowLoaidng.value = true
    const queryInfo = {
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    switch (route.params.index) {
        case "1":
            r = await getCollectedAlbum(queryInfo)
            loaded.value = !r.hasMore
            break;
        case "2":
            r = await getCollectedSinger()
            loaded.value = !r.hasMore
            break;
        case "3":
            r = await getCollectedVideo() // 需要区分是mv还是视频
            loaded.value = !r.hasMore
            break;
        default:
            break;
    }
    pages.page++
    loading.value = false
    isShowLoaidng.value = false
}
onBeforeRouteUpdate(() => {
    console.log("onBeforeRouteUpdate");

})
</script>
<style lang="scss" scoped>
.my-collection-wrapper {
    .title {
        padding: 25px 30px;
    }
}
</style>
