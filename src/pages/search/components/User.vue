<template>
    <div class="user-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <CommonItem v-for="(item, index) in userList.data" :key="item.userId" :index="index"
                @click="router.push(`/personal-center/${item.userId}`)">
                <template #avatar>
                    <div class="avatar mr-15">
                        <img :src="item.avatarUrl" alt="">
                        <div class="flag" v-if="item.avatarDetail">
                            <img :src="item.avatarDetail.identityIconUrl" alt="">
                        </div>
                    </div>
                </template>
                <template #name>
                    <div class="name fs-3 d-flex ai-center">
                        <span class="mr-10 text-33" v-html="keywordsColorful(item.nickname, keywords)"></span>
                        <div class="sex d-flex ai-center jc-center"
                            :style="{ backgroundColor: item.gender === 1 ? '#d2f2f1' : '#f9d0e7' }" v-if="item.gender">
                            <i class="iconfont icon-nanxing text-male fs-2" v-if="item.gender === 1"></i>
                            <i class="iconfont icon-nvxing text-female fs-2" v-if="item.gender === 2"></i>
                        </div>
                    </div>
                </template>
                <template #user-title v-if="item.description">
                    <div class="user-title fs-2 text-89">
                        {{ item.description }}
                    </div>
                </template>
            </CommonItem>
        </div>
        <Pagination v-if="pages.total >= pages.size && !isShowLoading && pages.total" :total="pages.total"
            :size="pages.size" :page="pages.page" @page-change="handlePageChange" class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>
        <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
            style="margin-top: 100px;">
            很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何用户
        </div>
    </div>

</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';
import CommonItem from '../../../components/CommonItem.vue';
import { SearchUserResult, Userprofile } from '@/service/api/search/types';
import { useRoute, useRouter } from 'vue-router';
import { searchByType } from '@/service/api/search';
import { scrollToTop } from '@/utils';
import { keywordsColorful } from '@/utils';

const router = useRouter()
const isShowLoading = ref(false)
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const userList = reactive({ data: [] as Userprofile[] })

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = computed(() => {
    return useRoute().params.keywords as string
})

watch(() => keywords.value, () => {
    getSearchUserList()
})
watch(() => pages.total, () => {
    emits("changeTotal", pages.total)
})

const handlePageChange = (num: number) => {
    pages.page = num
    getSearchUserList()
}
const getSearchUserList = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    const r = await searchByType({ keywords: keywords.value, type: 1002, limit: pages.size, offset: (pages.page - 1) * pages.size })
    const _ = r.result as unknown as SearchUserResult
    pages.total = _.userprofileCount
    userList.data = _.userprofiles
    isShowLoading.value = false
    if (pages.total === 0) {
        emits("changeTotal", pages.total)
    }
}
getSearchUserList()
</script>
<style lang="scss" scoped>
.user-wrapper {
    .avatar {
        position: relative;
        width: 60px;
        height: 60px;

        // overflow: hidden;

        img {
            width: 100%;
            border-radius: 50%;
            height: 100%;
        }

        .flag {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            bottom: 2px;
            right: 0px;
            // overflow: hidden;

            img {
                width: 100%;
                height: 100%;

            }
        }
    }

    .name .sex {
        @include radius(15px);
    }
}
</style>
