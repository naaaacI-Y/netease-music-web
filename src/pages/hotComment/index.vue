<template>
    <DefaultLayout>
        <div class="hot-comment-wrapper">
            <CommentItem v-for="item in allHotComment.data" :key="item.commentId" :comment-content="item" :type="type">
            </CommentItem>
            <Pagination id="pagination" v-if="pages.total >= pages.size" :total="pages.total" :size="pages.size"
                :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import CommentItem from '@/components/CommentItem.vue';
import Pagination from '@/components/Pagination.vue';
import { getHotComment } from '@/service/api/comment';
import { HotComment, list } from '@/service/api/comment/types';
import { getQueryId, scrollToTop } from '@/utils';
import { useRoute } from 'vue-router';
const route = useRoute()
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
watch(() => pages.page, async () => {

    try {
        await getAllHotComment()
        // 滚动到顶部
        scrollToTop()
    } catch (error) {

    }
})
const id = getQueryId() as number
const type = Number(route.params.type) as list
const allHotComment = reactive({ data: [] as HotComment[] })
const handlePageChange = (num: number) => {
    pages.page = num
}
const getAllHotComment = async () => {
    const _ = {
        id,
        type,
        limit: pages.size,
        offset: (pages.page - 1) * pages.size
        // before:  // 如果评论大于5000的时候只需要添加，暂时不考虑
    }
    try {
        const r = await getHotComment(_)
        allHotComment.data = r.hotComments
        pages.total = r.total
    } catch (error) {

    }
}
getAllHotComment()
</script>
<style lang="scss" scoped>
.hot-comment-wrapper {
    padding: 30px;
}
</style>
