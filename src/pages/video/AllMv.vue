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
    </div>
</template>

<script lang="ts" setup>
import FilterItem from '@/components/FilterItem.vue';
import RecommendMvCard from '@/components/RecommendMvCard.vue';
import { getAllMv } from '@/service/api/mv';
import { MVItem } from '@/service/api/mv/types';
import { areaList, typeList, sortList } from "@/utils/const"
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const activeAreaType = ref("全部")
const activeTypeType = ref("全部")
const activeSortType = ref("上升最快")
const allMvLists = reactive({ data: [] as MVItem[] })
const changeAreaActive = (name: string): void => {
    activeAreaType.value = name
}
const changeTypeActive = (name: string): void => {
    activeTypeType.value = name
}
const changeSortActive = (name: string): void => {
    activeSortType.value = name
}
watchEffect(async () => {
    const queryInfo = {
        area: activeAreaType.value, type: activeTypeType.value, order: activeSortType.value
    }
    const r = await getAllMv(queryInfo)
    allMvLists.data = r.data
})
onMounted(() => {
    const { area, type, sort } = route.query
    activeAreaType.value = Object.keys(areaList)[Number(area)]
    activeTypeType.value = Object.keys(typeList)[Number(type)]
    activeSortType.value = Object.keys(sortList)[Number(sort)]
})
</script>
<style lang="scss" scoped>
.all-mv-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;

}
</style>
