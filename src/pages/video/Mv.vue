<template>
    <div class="mv-wrap">
        <div class="head-wrap d-flex jc-between ai-center mb-2">
            <FilterItem :type-list="types" :active-type="types[activeType]" @change-active-type="changeActiveType">
                <template #left-label>
                    <div class="head text-33" @click="goAllMv(types[activeType], 0, 2)">
                        最新MV
                        <i class="iconfont icon-xiangyou1"></i>
                    </div>
                </template>
            </FilterItem>
        </div>
        <div class="new-mv-list-wrap" style="height: 400px;margin-bottom: 60px;">
            <div class="new-mv-wrap d-flex flex-wrap jc-between" v-show="!isShowLoading">
                <RecommendMvCard v-for="item in newMvList.data" :is-play-btn="true" :recommend-mv-item="item"
                    :key="item.id"></RecommendMvCard>
            </div>
            <div class="loading-wrap" v-show="isShowLoading">
                <Loading></Loading>
            </div>
        </div>
        <div class="head mb-12 text-33" @click="goAllMv(0, 0, 1)">热播MV <i class="iconfont icon-xiangyou1"></i></div>
        <div class="hot-mv-list-wrap d-flex flex-wrap jc-between" style="margin-bottom: 20px;">
            <RecommendMvCard v-for="item in hotMvList.data" :is-play-btn="true" :key="item.id" :recommend-mv-item="item">
            </RecommendMvCard>
        </div>
        <div class="head mb-12 text-33" @click="goAllMv(0, 4, 2)">网易出品 <i class="iconfont icon-xiangyou1"></i></div>
        <div class="wangyi-mv-list-wrap d-flex flex-wrap jc-between">
            <RecommendMvCard v-for="item in netProMvList.data" :is-play-btn="true" :is-oneline="true"
                :recommend-mv-item="item" :key="item.id"></RecommendMvCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterItem from '@/components/FilterItem.vue';
import RecommendMvCard from '@/components/RecommendMvCard.vue';
import { getAllMv, getNetProdMV, getNewMv } from '@/service/api/mv';
import { MVItem } from '@/service/api/mv/types';
import { areaList } from "@/utils/const"
import Loading from '@/components/Loading.vue';
import { useRouter } from 'vue-router';
const types = Object.fromEntries(Object.entries(areaList).filter(item => item[0] !== '全部'))
const activeType = ref("内地")
const router = useRouter()
const isShowLoading = ref(true)
const newMvList = reactive({ data: [] as MVItem[] })
const hotMvList = reactive({ data: [] as MVItem[] })
const netProMvList = reactive({ data: [] as MVItem[] })
watch(() => activeType.value, () => {
    // 重新获取mv数据
    getNewMvs()
})
const changeActiveType = (name: string) => {
    activeType.value = name
}
const goAllMv = (area: number, type: number, sort: number) => {
    router.push(`/video/all-mv?area=${area}&type=${type}&sort=${sort}`)
}
// 最新mv
const getNewMvs = async () => {
    try {
        isShowLoading.value = true
        const r = await getNewMv({ area: activeType.value, limit: 8 })
        newMvList.data = r.data
        isShowLoading.value = false
    } catch (error) {
        isShowLoading.value = false
    }
}
// // 热播mv
const getHotMv = async () => {
    try {
        const r = await getAllMv({ limit: 8 })
        hotMvList.data = r.data
    } catch (error) {

    }
}
// 网易出品mv
const getNetMv = async () => {
    try {
        const r = await getNetProdMV({ limit: 8 })
        netProMvList.data = r.data
    } catch (error) {

    }
}
getNewMvs()
getNetMv()
getHotMv()
</script>
<style lang="scss" scoped>
.mv-wrap {
    padding-top: 25px;
    width: 1040px;
    margin: auto;

    .head:hover {
        cursor: pointer;
    }

}
</style>
