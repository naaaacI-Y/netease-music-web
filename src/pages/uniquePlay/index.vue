<template>
    <DefaultLayout>
        <div class="unique-play-wrapper d-flex flex-wrap jc-between">
            <UniqueCard v-for="(item, index) in  uniqueList.data" :card-width="230" :card-height="86"
                :unique-item="item" :key="index"></UniqueCard>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import UniqueCard from '../findMusic/personalRecommend/components/UniqueCard.vue';
import { getUniquereCommendList } from "@/service/api/recommend"
import { reactive, ref } from 'vue';
import { UniqueRecommendRet } from '@/service/api/recommend/type';
const uniqueList = reactive<Record<string, UniqueRecommendRet[]>>({ data: [] })
const pages = reactive({
    limit: 20,
    offset: 1
})
const loaded = ref(false)
const getUniqeuList = async () => {
    const r = await getUniquereCommendList(pages)
    uniqueList.data = r.result
    loaded.value = r.more
}
getUniqeuList()
</script>
<style lang="scss" scoped>
.unique-play-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}
</style>
