<template>
    <div class="head mb-12 d-flex ai-center" @click="router.push('/unique-play')">独家放送 <i
            class="iconfont icon-xiangyou1 ml-4"></i></div>
    <div class="unique-wrapper d-flex jc-between mb-30">
        <UniqueCard v-for="(item, index) in recommendList.data" :key="index" :unique-item="item"></UniqueCard>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import UniqueCard from './components/UniqueCard.vue';
import { getUniquereCommend } from "@/service/api/recommend"
import { reactive } from 'vue';
import { UniqueRecommendRet } from '@/service/api/recommend/type';
const router = useRouter()
const recommendList = reactive<Record<string, UniqueRecommendRet[]>>({ data: [] })
const getRecommend = async () => {
    const r = await getUniquereCommend()
    recommendList.data = r.result
}
getRecommend()
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}
</style>
