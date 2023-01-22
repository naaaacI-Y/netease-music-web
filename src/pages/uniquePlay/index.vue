<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" class="pb-30" :items="uniqueList.data" :item-size="170" key-field="id"
            style="height: 100%;width: 100%;" :buffer="1700">
            <template v-slot="{ item }">
                <div class="unique-play-wrapper d-flex flex-wrap jc-between">
                    <UniqueCard v-for="(it, index) in item.dataList" :card-width="230" :card-height="86"
                        :unique-item="it" :key="index"></UniqueCard>
                </div>
            </template>
            <template #after>
                <div style="margin-top: -100px;">
                    <Loading v-show="loading"></Loading>
                </div>
            </template>
        </RecycleScroller>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading.vue"
import { formatListData, FormatList, debounce } from "@/utils"
import UniqueCard from '../findMusic/personalRecommend/components/UniqueCard.vue';
import { getUniquereCommendList } from "@/service/api/recommend"
import { UniqueRecommendRet } from '@/service/api/recommend/types';
import { useScroll } from '@/hooks/useScroll';

const { listenListScroll, removeListener } = useScroll()

const uniqueList = reactive({ data: [] as FormatList<UniqueRecommendRet> })
const loaded = ref(false) // 是否还有更多数据
const loading = ref(false) // 是否在加载中
const pages = reactive({
    limit: 40,
    page: 1
})


// 获取独家放送列表
const getList = async () => {
    loading.value = true
    const queryInfo = {
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    const r = await getUniquereCommendList(queryInfo)
    loading.value = false
    pages.page++
    const _ = formatListData<UniqueRecommendRet>(r.result)

    uniqueList.data = uniqueList.data.concat(..._)
    loaded.value = !r.more


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
.unique-play-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}
</style>
