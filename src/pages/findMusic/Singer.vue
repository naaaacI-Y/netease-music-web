<template>
    <div class="singer-wrapper">
        <div class="filter-wrapper mb-20">
            <FilterItem :active-type="activeLanguageType" :type-list="languageList" label="语种"
                @change-active-type="changeLanguageActive"></FilterItem>
            <FilterItem :active-type="activeCategoryType" :type-list="categoryList" label="分类"
                @change-active-type="changeCategoryActive"></FilterItem>
            <FilterItem :active-type="activeFilterType" :type-list="filterList" label="筛选"
                @change-active-type="changeFilterActive"></FilterItem>
        </div>
        <div class="singer-list-wrapper d-flex flex-wrap jc-between">
            <SingerCard v-for="item in singerList.data" @click="goSingerPage(item.id)" :key="item.id"
                :singer-item="item"></SingerCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SingerCard from '@/components/singer/SingerCard.vue';
import FilterItem from '@/components/FilterItem.vue';
import { languageList, categoryList, filterList } from "@/utils/const"
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Artist } from '@/service/api/singer/types';
import { getSingerByCategory } from '@/service/api/singer';
const router = useRouter()
const activeLanguageType = ref(0)
const activeCategoryType = ref(0)
const activeFilterType = ref(0)
const pages = reactive({
    limit: 30,
    offset: 0,
    initial: -1,
    type: -1,
    area: -1
})
const singerList = reactive<Record<string, Artist[]>>({ data: [] })
const goSingerPage = (id: number) => {
    router.push(`/singer-home?id=${id}`)
}
const changeLanguageActive = (num: number) => {
    activeLanguageType.value = num
}
const changeCategoryActive = (num: number) => {
    activeCategoryType.value = num
}
const changeFilterActive = (num: number) => {
    activeFilterType.value = num
}
const getSingerList = async () => {
    const r = await getSingerByCategory(pages)
    singerList.data = r.artists
}
getSingerList()
</script>
<style lang="scss" scoped>
.singer-wrapper {
    width: 1040px;
    padding-top: 20px;
    margin: auto;
}
</style>
