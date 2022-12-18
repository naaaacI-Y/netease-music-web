<template>
    <div class="singer-wrapper">
        <div class="filter-wrapper mb-20">
            <FilterItem :active-type="activeLanguageType" :type-list="Object.keys(languageList)" label="语种"
                @change-active-type="changeLanguageActive"></FilterItem>
            <FilterItem :active-type="activeCategoryType" :type-list="Object.keys(categoryList)" label="分类"
                @change-active-type="changeCategoryActive"></FilterItem>
            <FilterItem :active-type="activeFilterType" :type-list="Object.keys(filterList)" label="筛选"
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
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Artist } from '@/service/api/singer/types';
import { getSingerByCategory } from '@/service/api/singer';
const router = useRouter()
const activeLanguageType = ref("全部")
const activeCategoryType = ref("全部")
const activeFilterType = ref("热门")
const pages = reactive({
    limit: 30,
    offset: 0,
})
const singerList = reactive<Record<string, Artist[]>>({ data: [] })

const goSingerPage = (id: number) => {
    router.push(`/singer-home?id=${id}`)
}
const changeLanguageActive = (name: string) => {
    activeLanguageType.value = name
}
const changeCategoryActive = (name: string) => {
    activeCategoryType.value = name
}
const changeFilterActive = (name: string) => {
    activeFilterType.value = name
}
const getSingerList = async () => {
    const queryInfo = {
        initial: filterList[activeFilterType.value],
        type: categoryList[activeCategoryType.value],
        area: languageList[activeLanguageType.value],
        ...pages
    }
    const r = await getSingerByCategory(queryInfo)
    singerList.data = r.artists
}
watchEffect(() => {
    getSingerList()
})
getSingerList()
</script>
<style lang="scss" scoped>
.singer-wrapper {
    width: 1040px;
    padding-top: 20px;
    margin: auto;
}
</style>
