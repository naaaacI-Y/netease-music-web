<template>
    <div class="head mb-12 d-flex ai-center text-00" @click="router.push('/video/mv')">推荐MV <i
            class="iconfont icon-xiangyou1 ml-4"></i></div>
    <div class="recommend-card-wrapper d-flex jc-between">
        <RecommendMvCard v-for="(item, index) in recommendMvList.data" :key="index" :recommend-mv-item="item">
        </RecommendMvCard>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import RecommendMvCard from '@/components/RecommendMvCard.vue';
import { MVItem } from '@/service/api/mv/types';
import { reactive } from 'vue';
import { getRecommendMv } from '@/service/api/mv';
const router = useRouter()
const recommendMvList = reactive<Record<string, MVItem[]>>({ data: [] })
const getrecommendMvList = async () => {
    const r = await getRecommendMv()
    console.log(r, "rrrr");
    if (r.code === 200) {
        recommendMvList.data = r.result
    }
}
getrecommendMvList()
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}
</style>
