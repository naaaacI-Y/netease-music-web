<template>
    <DefaultLayout>
        <div class="home-fans-wrapper pt-10" v-if="fansList.data.length">
            <FocusAndFansItem v-for="item in fansList.data" :key="item.userId" :item="item"></FocusAndFansItem>
        </div>
        <div class="no-fans text-66 fs-1 d-flex jc-center" v-if="!fansList.data.length">还没有粉丝</div>
        <Pagination id="pagination" v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size"
            :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';

import { getFansList } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import { getQueryId, scrollToTop } from '@/utils';
import FocusAndFansItem from './components/FocusAndFansItem.vue';
const fansList = reactive({ data: [] as Follow[] })
const id = getQueryId() as number
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
watch(() => pages.page, async () => {
    try {
        await getFanList()
        // 滚动到顶部
        scrollToTop()
    } catch (error) {

    }
})
const handlePageChange = (num: number) => {
    pages.page = num
}
const getFanList = async () => {
    const _ = {
        uid: id, limit: pages.size, offset: (pages.page - 1) * pages.size
    }
    try {
        const r = await getFansList(_)
        fansList.data = r.followeds
        pages.total = r.size
    } catch (error) {

    }
}
getFanList()
</script>
<style lang="scss" scoped>
.home-fans-wrapper {
    @include grid-between(395px);
}

.no-fans {
    padding-top: 100px;
}
</style>
