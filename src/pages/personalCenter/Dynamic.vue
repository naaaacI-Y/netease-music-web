<template>
    <DefaultLayout>
        <div class="home-dynamic-wrapper" v-if="dynamicList.data.length && !isShowLoading">
            <DynamicItem v-for="item in dynamicList.data" :key="item.id" :dynamic-item="item"></DynamicItem>
        </div>
        <div class="no-dynamic text-33 fs-2" v-if="!dynamicList.data.length && !isShowLoading">暂无动态</div>
        <Loading v-show="isShowLoading"></Loading>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading.vue";
import { Event } from "@/service/api/user/types"
import { getUserDynamic } from "@/service/api/user"
import DynamicItem from './components/DynamicItem.vue'
import { getQueryId } from '@/utils';
import { dynamicMap } from "@/utils/const";
const isShowLoading = ref(false)

const dynamicList = reactive({ data: [] as Event[] })
const id = getQueryId() as number

// 获取用户动态
const getDynamics = async () => {
    isShowLoading.value = true
    try {
        const r = await getUserDynamic({ uid: id })
        dynamicList.data = r.events.filter(item => {
            return Object.keys(dynamicMap).map(item => Number(item)).includes(item.type)
        })
        isShowLoading.value = false
    } catch (error) {
        isShowLoading.value = false
    }
}

getDynamics()
</script>
<style lang="scss" scoped>
.home-dynamic-wrapper {
    width: 100%;
    padding: 18px 30px;
    margin: auto;
}

.no-dynamic {
    padding-top: 100px;
    text-align: center;
}
</style>