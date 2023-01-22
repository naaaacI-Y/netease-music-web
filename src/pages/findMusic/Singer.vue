<template>
    <RecycleScroller id="scroller" class="pb-30" :items="singerList.data" :item-size="225" key-field="id" :buffer="2250"
        style="height: 100%;width: 100%;">
        <template #before>
            <div class="filter-wrapper mb-20">
                <FilterItem :active-type="languageList[activeLanguageType]" :type-list="languageList"
                    :is-between="false" @change-active-type="changeLanguageActive">
                    <template #left-label>
                        <div class="filter-label fs-1 mr-8 text-33">语种：</div>
                    </template>
                </FilterItem>
                <FilterItem :active-type="categoryList[activeCategoryType]" :type-list="categoryList"
                    :is-between="false" @change-active-type="changeCategoryActive">
                    <template #left-label>
                        <div class="filter-label fs-1 mr-8 text-33">分类：</div>
                    </template>
                </FilterItem>
                <FilterItem :active-type="filterList[activeFilterType]" :type-list="filterList" label="筛选"
                    :is-between="false" @change-active-type="changeFilterActive">
                    <template #left-label>
                        <div class="filter-label fs-1 mr-8 text-33">筛选：</div>
                    </template>
                </FilterItem>
            </div>
        </template>
        <template v-slot="{ item }">
            <div class="d-flex flex-wrap jc-between singer-wrapper">
                <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard>
            </div>
        </template>
        <template #after>
            <div style="margin-top: -10px;">
                <Loading :is-need-show-scroll="false" :is-show-padding-top="false" v-show="loading"></Loading>
            </div>
        </template>
    </RecycleScroller>

</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';

import SingerCard from '@/components/singer/SingerCard.vue';
import FilterItem from '@/components/FilterItem.vue';
import { languageList, categoryList, filterList } from "@/utils/const"
import { Artist } from '@/service/api/singer/types';
import { getSingerByCategory } from '@/service/api/singer';
import { FormatList, formatListData } from '@/utils';
import { useScroll } from '@/hooks/useScroll';

const { listenListScroll, removeListener } = useScroll()
const activeLanguageType = ref("全部")
const activeCategoryType = ref("全部")
const activeFilterType = ref("热门")
const isShowLoading = ref(false) // 是否显示loading
const loading = ref(false)
const loaded = ref(false)
const pages = reactive({
    limit: 30,
    page: 1
})
const singerList = reactive({ data: [] as FormatList<Artist> })
const initData = () => {
    singerList.data = []
    pages.page = 1
    loading.value = false
    loaded.value = false
    getList()
}

// 过滤类型切换
const changeLanguageActive = (name: string) => {
    activeLanguageType.value = name
    initData()
}
const changeCategoryActive = (name: string) => {
    activeCategoryType.value = name
    initData()
}
const changeFilterActive = (name: string) => {
    activeFilterType.value = name
    initData()
}

const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    const queryInfo = {
        initial: filterList[activeFilterType.value],
        type: categoryList[activeCategoryType.value],
        area: languageList[activeLanguageType.value],
        limit: pages.limit,
        offset: (pages.page - 1) * pages.limit
    }
    const r = await getSingerByCategory(queryInfo)
    pages.page++
    loading.value = false
    const _ = formatListData<Artist>(r.artists, 6)
    loaded.value = !r.more
    singerList.data = singerList.data.concat(..._)
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
.filter-wrapper,
.singer-wrapper {
    width: 1040px;
    // padding: 20px calc(100% - 1040px) / 2 0;
    padding-top: 20px;
    margin: auto;
}

.singer-wrapper {
    height: 100%;
}
</style>
