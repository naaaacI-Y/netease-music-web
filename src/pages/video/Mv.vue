<template>
    <div class="mv-wrap">
        <div class="head-wrap d-flex jc-between ai-center">
            <div class="head mb-12" @click="goAllMv(activeType + 1, 0, 2)">最新MV <i class="iconfont icon-xiangyou1"></i>
            </div>
            <CommonBtn :types="types" :active-type="activeType" @change-active-type="changeActiveType"
                :is-show-btn="false"></CommonBtn>
        </div>
        <div class="new-mv-list-wrap d-flex flex-wrap jc-between">
            <RecommendMvCard v-for="item in 8" :is-play-btn="true"></RecommendMvCard>
        </div>
        <div class="head mb-12" @click="goAllMv(0, 0, 1)">热播MV <i class="iconfont icon-xiangyou1"></i></div>
        <div class="hot-mv-list-wrap d-flex flex-wrap jc-between">
            <RecommendMvCard v-for="item in 8" :is-play-btn="true"></RecommendMvCard>
        </div>
        <div class="head mb-12" @click="goAllMv(0, 4, 2)">网易出品 <i class="iconfont icon-xiangyou1"></i></div>
        <div class="wangyi-mv-list-wrap d-flex flex-wrap jc-between">
            <RecommendMvCard v-for="item in 8" :is-play-btn="true" :is-oneline="true"></RecommendMvCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CommonBtn from '@/components/global/CommonBtn.vue';
import RecommendMvCard from '@/components/RecommendMvCard.vue';
import { areaList } from "@/utils/const"
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const types = areaList.slice(1)
const activeType = ref(0)
const router = useRouter()
const changeActiveType = (num: number) => {
    activeType.value = num
}
const goAllMv = (area: number, type: number, sort: number) => {
    router.push(`/video/all-mv?area=${area}&type=${type}&sort=${sort}`)
}
</script>
<style lang="scss" scoped>
.mv-wrap {
    padding-top: 25px;
    width: 1040px;
    margin: auto;

    .head:hover {
        cursor: pointer;
    }

    .new-mv-list-wrap {
        margin-bottom: 60px;
    }

}
</style>
