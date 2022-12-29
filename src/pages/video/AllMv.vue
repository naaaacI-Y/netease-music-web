<template>
    <div class="all-mv-wrapper">
        <FilterItem label="地区" :active-type="activeAreaType" :type-list="areaList"
            @change-active-type="changeAreaActive"></FilterItem>
        <FilterItem label="类型" :active-type="activeTypeType" :type-list="typeList"
            @change-active-type="changeTypeActive"></FilterItem>
        <FilterItem label="排序" :active-type="activeSortType" :type-list="sortList"
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
const activeAreaType = ref(0)
const activeTypeType = ref(0)
const activeSortType = ref(0)
const allMvLists = reactive({ data: [] as MVItem[] })
const changeAreaActive = (num: number): void => {
    activeAreaType.value = num
}
const changeTypeActive = (num: number): void => {
    activeTypeType.value = num
}
const changeSortActive = (num: number): void => {
    activeSortType.value = num
}
watchEffect(async () => {
    const queryInfo = {
        area: areaList[activeAreaType.value], type: typeList[activeTypeType.value], order: sortList[activeSortType.value]
    }
    const r = await getAllMv(queryInfo)
    allMvLists.data = r.data
})
onMounted(() => {
    const { area, type, sort } = route.query
    activeAreaType.value = Number(area)
    activeTypeType.value = Number(type)
    activeSortType.value = Number(sort)
})
</script>
<style lang="scss" scoped>
.all-mv-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;

}
</style>
