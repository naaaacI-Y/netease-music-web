<template>
    <DefaultLayout>
        <div class="home-fans-wrapper d-flex jc-between flex-wrap pt-10">
            <FocusAndFansItem v-for="item in fansList.data" :key="item.userId" :item="item"></FocusAndFansItem>

        </div>
        <Pagination v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';

import { getFansList } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import { getQueryId, scrollToTop } from '@/utils';
import { reactive, watch } from 'vue';
import FocusAndFansItem from './components/FocusAndFansItem.vue';
const fansList = reactive({ data: [] as Follow[] })
const id = getQueryId() as number
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
watch(() => pages.page, async () => {
    await getFanList()
    // 滚动到顶部
    scrollToTop()
})
const handlePageChange = (num: number) => {
    pages.page = num
}
const getFanList = async () => {
    const _ = {
        uid: id, limit: pages.size, offset: (pages.page - 1) * pages.size
    }
    const r = await getFansList(_)
    fansList.data = r.followeds
    pages.total = r.size
}
getFanList()
</script>
<style lang="scss" scoped>

</style>
