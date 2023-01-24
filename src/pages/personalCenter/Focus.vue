<template>
    <DefaultLayout>
        <div class="home-focus-wrapper pt-10" v-if="focusList.data.length">
            <FocusAndFansItem v-for="item in focusList.data" :key="item.userId" :item="item"></FocusAndFansItem>
        </div>
        <div class="no-focus text-66 fs-1 d-flex jc-center" v-if="!focusList.data.length">还没有关注</div>
        <Pagination id="pagination" v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size"
            :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import { getFocusList } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import { getQueryId, scrollToTop } from '@/utils';
import { useRoute } from 'vue-router';
import FocusAndFansItem from './components/FocusAndFansItem.vue';

const focusList = reactive({ data: [] as Follow[] })
const pages = reactive({
    page: 1,
    size: 30,
    total: Number(useRoute().query.focus)
})
const id = getQueryId() as number

watch(() => pages.page, async () => {
    await getFocuList()
    // 滚动到顶部
    scrollToTop()
})
const handlePageChange = (num: number) => {
    pages.page = num
}

// 获取关注列表
const getFocuList = async () => {
    const _ = {
        uid: id, limit: pages.size, offset: (pages.page - 1) * pages.size
    }
    const r = await getFocusList(_)
    focusList.data = r.follow

}
getFocuList()
</script>
<style lang="scss" scoped>
.home-focus-wrapper {
    @include grid-between(395px);
}

.no-focus {
    padding-top: 100px;
}
</style>