<template>
    <RecycleScroller id="scroller" class=" pb-30" :items="singerList.data" :item-size="220" key-field="id"
        :buffer="1540" style="height: 100%;width: 100%;">
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
                <Loading v-show="isShowLoading && pages.page === 1"></Loading>
            </div>
        </template>
        <template v-slot="{ item }">
            <div class="d-flex flex-wrap jc-between singer-wrapper">
                <SingerCard v-for="it in item.dataList" :key="it.id + 1" :singer-item="it"></SingerCard>
            </div>
        </template>
    </RecycleScroller>
    <!-- <div class="d-flex flex-wrap jc-between" v-show="!isShowLoading">
            <SingerCard v-for="item in singerList.data" :key="item.id" :singer-item="item"></SingerCard>
        </div> -->

</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';

import SingerCard from '@/components/singer/SingerCard.vue';
import FilterItem from '@/components/FilterItem.vue';
import { languageList, categoryList, filterList } from "@/utils/const"
import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Artist } from '@/service/api/singer/types';
import { getSingerByCategory } from '@/service/api/singer';
import { debounce, FormatList, formatListData } from '@/utils';
const router = useRouter()
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



// 监听歌手列表滚动
const handleListener = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部了 加载更多
        if (!loaded.value && !loading.value) {
            getList()
        }
    }

}

// 获取歌手列表
const getList = async () => {
    if (loaded.value || loading.value) return
    isShowLoading.value = true
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
    const _ = formatListData<Artist>(r.artists, 6)
    loaded.value = !r.more
    singerList.data = singerList.data.concat(..._)
    isShowLoading.value = false
    loading.value = false
}
const handleFn = debounce(handleListener, 100)
console.log(handleFn);

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
getList()
</script>
<style lang="scss" scoped>
.singer-wrapper,
.filter-wrapper {
    width: 1040px;
    // padding: 20px calc(100% - 1040px) / 2 0;
    padding-top: 20px;
    margin: auto;
}
</style>
