<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" :items="uniqueList.data" :item-size="170" key-field="id"
            style="height: 100%;width: 100%;" :buffer="680">
            <template v-slot="{ item }">
                <div class="unique-play-wrapper d-flex flex-wrap jc-between">
                    <UniqueCard v-for="(it, index) in item.dataList" :card-width="230" :card-height="86"
                        :unique-item="it" :key="index"></UniqueCard>
                </div>
            </template>
            <template #after>
                <Loading v-show="loading"></Loading>
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
const uniqueList = reactive({ data: [] as FormatList<UniqueRecommendRet> })
const loaded = ref(false) // 是否还有更多数据
const loading = ref(false) // 是否在加载中
const pages = reactive({
    limit: 40,
    page: 1
})
// 监听列表滚动
const handleListener = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部了 加载更多
        if (loaded.value && !loading.value) {
            getList()
        }

    }
}
const handleFn = debounce(handleListener, 100)
// 滚动监听
const listenListScroll = () => {
    const wrapper = document.getElementById("scroller")
    wrapper?.addEventListener("scroll", handleFn)
}
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
    loaded.value = r.more


}

// 初始化滚动监听
onMounted(() => {
    listenListScroll()
})
// 移除滚动监听
onUnmounted(() => {
    const wrapper = document.getElementById("scroller")
    wrapper?.removeEventListener("scroll", handleFn)
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
