<template>
    <div class="all-mv-wrapper">
        <FilterItem label="地区" :active-type="areaList[activeAreaType]" :type-list="areaList"
            @change-active-type="changeAreaActive"></FilterItem>
        <FilterItem label="类型" :active-type="typeList[activeTypeType]" :type-list="typeList"
            @change-active-type="changeTypeActive"></FilterItem>
        <FilterItem label="排序" :active-type="sortList[activeSortType]" :type-list="sortList"
            @change-active-type="changeSortActive"></FilterItem>
        <div class="all-mv-list-wrap d-flex flex-wrap jc-between mt-20">
            <RecommendMvCard v-for="item in allMvLists.data" :is-play-btn="true" :key="item.id"
                :recommend-mv-item="item"></RecommendMvCard>
        </div>
        <Pagination v-if="pages.total >= pages.size && paginationSHowFlag" :total="pages.total" :size="pages.size"
            :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30" :index="paginationIndex">
        </Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import FilterItem from '@/components/FilterItem.vue';
import RecommendMvCard from '@/components/RecommendMvCard.vue';
import { getAllMv } from '@/service/api/mv';
import { AllMvParam, MVItem } from '@/service/api/mv/types';
import { areaList, typeList, sortList } from "@/utils/const"
import { reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const activeAreaType = ref("全部")
const activeTypeType = ref("全部")
const activeSortType = ref("上升最快")
const allMvLists = reactive({ data: [] as MVItem[] })
const paginationSHowFlag = ref(true)
const paginationIndex = ref(0)
const pages = reactive({
    page: 1,
    size: 40,
    total: 0
})
const changeAreaActive = (name: string): void => {
    activeAreaType.value = name;
    // 重新构建分页 从1开始  如果当前页是1就不需要再重新构建了
    if (pages.page !== 1) {
        pages.page = 1
        paginationIndex.value++
    }
}
const changeTypeActive = (name: string): void => {
    activeTypeType.value = name;
    if (pages.page !== 1) {
        pages.page = 1
        paginationIndex.value++
    }
}
const changeSortActive = (name: string): void => {
    activeSortType.value = name;
    if (pages.page !== 1) {
        pages.page = 1
        paginationIndex.value++
    }
}
watchEffect(async () => {
    const queryInfo = {
        area: activeAreaType.value,
        type: activeTypeType.value,
        order: activeSortType.value,
        limit: pages.size,
        page: pages.page,
        offset: (pages.page - 1) * pages.size
    }
    // 首次加载无需请求
    if (queryInfo.area === "全部" && queryInfo.type === "全部" && queryInfo.order === "上升最快") {
        return
    }
    getMvLists(queryInfo)
})

// 初始化路径查询参数
const initQuery = () => {
    const { area, type, sort } = route.query
    activeAreaType.value = Object.keys(areaList)[Number(area)]
    activeTypeType.value = Object.keys(typeList)[Number(type)]
    activeSortType.value = Object.keys(sortList)[Number(sort)]
}
// 获取mv数据
const getMvLists = async (params: AllMvParam) => {
    const r = await getAllMv(params)
    pages.total = r.count! ?? pages.total
    allMvLists.data = r.data
}
// 处理分页页码变化
const handlePageChange = (num: number) => {
    pages.page = num
}
initQuery()
</script>
<style lang="scss" scoped>
.all-mv-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;

}
</style>
