<template>
    <DefaultLayout>
        <div class="search-result-detail-wrapper">
            <div class="head d-flex">
                <div class="keywords">{{ keywords }}</div>
                <div class="total">找到{{ total }}{{ showWord }}</div>
            </div>
            <div class="switch-tab-wrap d-flex">
                <div class="switch-tab-item" v-for="item in Object.keys(searchTypeList)">{{ item }}</div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { searchTypeList } from "@/utils/const"
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const keywords = useRoute().query.keywords || "我们"
const activeIndex = ref(0)
const total = ref(50)
const showWord = computed(() => {
    const type = Object.keys(searchTypeList)[activeIndex.value] as keyof typeof searchTypeList
    return searchTypeList[type].unit + type
})
</script>
<style lang="scss" scoped>
.search-result-detail-wrapper {
    width: 100%;
    padding: 0 30px 100px;
}
</style>
