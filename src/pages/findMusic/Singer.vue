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
            <SingerCard v-for="item in 60" @click="goSingerPage"></SingerCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SingerCard from '@/components/SingerCard.vue';
import FilterItem from '@/components/FilterItem.vue';
import { languageList, categoryList, filterList } from "@/utils/const"
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const activeLanguageType = ref(0)
const activeCategoryType = ref(0)
const activeFilterType = ref(0)
const goSingerPage = () => {
    router.push("/singer-home")
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
</script>
<style lang="scss" scoped>
.singer-wrapper {
    width: 1040px;
    padding-top: 20px;
    margin: auto;
}
</style>
