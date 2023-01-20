<template>
    <div class="radio-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <CommonItem v-for="(item, index) in radioList.data" :key="item.id" :index="index">
                <template #avatar>
                    <div class="avatar mr-15">
                        <img :src="item.picUrl" alt="">
                    </div>
                </template>
                <template #name>
                    <div class="name fs-3 d-flex ai-center text-33" v-html="keywordsColorful(item.name, keywords)">
                    </div>
                </template>
                <template #author>
                    <div class="author fs-1 d-flex ai-center text-cd">
                        <span class="by mr-5 text-bf">by</span>
                        <span class="auth">{{ item.dj.nickname }}</span>
                    </div>
                </template>
            </CommonItem>
        </div>
        <Pagination v-if="pages.total >= pages.size && !isShowLoading && pages.total" :total="pages.total"
            :size="pages.size" :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>
        <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
            style="margin-top: 100px;">
            很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何电台
        </div>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import { DjRadio, SearchRadioResult } from '@/service/api/search/types';
import { reactive, ref, watch } from 'vue';
import { useRoute } from "vue-router"
import { defineEmits } from 'vue';
import Loading from '@/components/Loading.vue';
import CommonItem from '../../../components/CommonItem.vue';
import { searchByType } from '@/service/api/search';
import { scrollToTop } from '@/utils';
import { keywordsColorful } from '@/utils';

const isShowLoading = ref(false)
const keywords = useRoute().params.keywords as string
const radioList = reactive({ data: [] as DjRadio[] })
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})

watch(() => pages.total, () => {
    emits("changeTotal", pages.total)
})
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()

// 处理页码变化
const handlePageChange = (num: number) => {
    pages.page = num
    getSearchRadioList()
}

// 获取电台列表
const getSearchRadioList = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords, type: 1009, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchRadioResult
    pages.total = _.djRadiosCount
    radioList.data = _.djRadios
    isShowLoading.value = false
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }
}
getSearchRadioList()
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}

.author .auth:hover {
    color: var(--theme-61);
    cursor: pointer;
}
</style>
