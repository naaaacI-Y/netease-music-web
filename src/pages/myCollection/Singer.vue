<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" class="pb-30" :items="list.data" :item-size="80" key-field="id" :buffer="880"
            style="height: 100%;width: 100%;">
            <template #before>
                <div class="my-collection-wrapper">
                    <div class="title fs-3 text-33">
                        <span style="font-weight: bold;">收藏的歌手</span>
                        <span class="text-66 fs-2">&nbsp;({{ total }})</span>
                    </div>
                </div>
            </template>
            <template v-slot="{ item, index }">
                <div class="singer-wrapper" @click="goSinger(item.id)">
                    <CommonItem :key="item.id + 1" :index="index">
                        <template #avatar>
                            <div class="avatar mr-15">
                                <img :src="formatPicUrl(item.picUrl, 60, 60)" alt="">
                            </div>
                        </template>
                        <template #name>
                            <div class="name fs-3 d-flex ai-center text-33">
                                <span>{{ item.name }}</span>
                                <span class="alias text-66" v-if="item.alias.length">&nbsp;({{ item.alias[0] }})</span>
                            </div>
                        </template>
                        <template #collect-singer-albumcount>
                            <div class="collect-singer-albumcount text-99 fs-2" style="width:25%">
                                专辑：{{ item.albumSize }}
                            </div>
                        </template>
                        <template #collect-singer-mvcount>
                            <div class="collect-singer-mvcount text-99 fs-2" style="width:10%">MV：{{ item.mvSize }}
                            </div>
                        </template>
                    </CommonItem>
                </div>
            </template>
            <template #after>
                <div style="margin-top: -10px;">
                    <Loading :is-need-show-scroll="false" :is-show-padding-top="false" v-show="loading"></Loading>
                </div>
            </template>
        </RecycleScroller>

    </DefaultLayout>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import Loading from '@/components/Loading.vue';
import CommonItem from "@/components/CommonItem.vue"
import { getCollectedSinger } from '@/service/api/singer';
import { CollectedSingerResult } from "@/service/api/singer/types"
import { formatPicUrl } from '@/utils';
import { useScroll } from '@/hooks/useScroll';

const { listenListScroll, removeListener } = useScroll()


const router = useRouter()
const loading = ref(false)
const loaded = ref(false)
const total = ref(0)
const list = reactive({ data: [] as CollectedSingerResult["data"] })
const pages = reactive({
    page: 1,
    limit: 30
})
const goSinger = (id: number) => {
    router.push(`/singer-home/${id}`)
}
const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    const queryInfo = {
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    try {
        const r = await getCollectedSinger(queryInfo)
        list.data = list.data.concat(...r.data)
        loaded.value = !r.hasMore
        total.value = r.count
        pages.page++
        loading.value = false
    } catch (error) {
        loading.value = false
    }
}

onMounted(() => {
    const scroller = document.getElementById("scroller")
    setTimeout(() => {
        // 这里不用定时的话 传递进去的值是在获取数据结束之前的
        listenListScroll(scroller!, [getList, loaded.value, loading.value])
    }, 200)
})
onUnmounted(() => {
    const scroller = document.getElementById("scroller")

    removeListener(scroller!, [getList, loaded.value, loading.value])
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
