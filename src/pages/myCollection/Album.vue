<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" class=" pb-30" :items="list.data" :item-size="80" key-field="id" :buffer="1040"
            style="height: 100%;width: 100%;">
            <template #before>
                <div class="my-collection-wrapper">
                    <div class="title fs-3 text-33">
                        <span style="font-weight: bold;">收藏的专辑</span>
                        <span class="text-66 fs-2">&nbsp;({{ total }})</span>
                    </div>
                </div>
            </template>
            <template v-slot="{ item, index }">
                <div class="album-wrapper" @click="goAlbum(item.id)">
                    <!-- <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard> -->
                    <CommonItem :key="item.id + 1" :index="index">
                        <template #avatar>
                            <div class="avatar mr-15">
                                <img :src="formatPicUrl(item.picUrl, 60, 60)" alt="">
                            </div>
                        </template>
                        <template #name>
                            <div class="name fs-3 d-flex ai-center text-33">
                                {{ item.name }}
                            </div>
                        </template>
                        <template #collect-album-singername>
                            <div class="collect-album-singername fs-2 text-99" style="width:25%">
                                <span @click.stop="goSinger(item.artists[0].id)">{{
                                    item.artists[0].name
                                }}</span>
                            </div>
                        </template>
                        <template #collect-album-songcount>
                            <div class="collect-album-songcount fs-2 text-99" style="width:10%">
                                {{ item.size }}首
                            </div>
                        </template>
                    </CommonItem>
                </div>
            </template>
            <template #after>
                <loading v-show="isShowLoaidng"></loading>
            </template>
        </RecycleScroller>

    </DefaultLayout>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import CommonItem from "@/components/CommonItem.vue"
import { getCollectedAlbum } from '@/service/api/album';
import { CollectedAlbumResult } from "@/service/api/album/types"
import { debounce, formatPicUrl } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter()
const loading = ref(false)
const loaded = ref(false)
const isShowLoaidng = ref(false)
const total = ref(0)
const list = reactive({ data: [] as CollectedAlbumResult["data"] })
const pages = reactive({
    page: 1,
    limit: 30
})
// 前往歌手页
const goSinger = (id: number) => {
    router.push(`/singer-home/${id}`)
}
// 前往专辑页
const goAlbum = (id: number) => {
    router.push(`/album/${id}`)
}
const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    isShowLoaidng.value = true
    const queryInfo = {
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    const r = await getCollectedAlbum(queryInfo)
    loaded.value = !r.hasMore
    list.data = list.data.concat(...r.data)
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
    padding: 25px 30px;
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
</style>
