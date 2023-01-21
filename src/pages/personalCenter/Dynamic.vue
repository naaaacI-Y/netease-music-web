<template>
    <DefaultLayout>
        <div class="home-dynamic-wrapper">
            <DynamicItem v-for="item in dynamicList.data" :key="item.id" :dynamic-item="item"></DynamicItem>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { Event } from "@/service/api/user/types"
import { getUserDynamic } from "@/service/api/user"
import DynamicItem from './components/DynamicItem.vue'
import { getQueryId } from '@/utils';
const dynamicList = reactive({ data: [] as Event[] })
const id = getQueryId() as number
const getDynamics = async () => {
    const r = await getUserDynamic({ uid: id })
    dynamicList.data = r.events
}
getDynamics()
</script>
<style lang="scss" scoped>
.home-dynamic-wrapper {
    width: 100%;
    padding: 18px 30px;
    margin: auto;
}
</style>