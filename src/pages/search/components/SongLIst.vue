<template>
    <div class="song-list-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <CommonItem v-for="(item, index) in songList.data" :index="item.id" :key="index"
                @click="router.push(`/song-list/${item.id}`)">
                <template #avatar>
                    <div class="avatar mr-15">
                        <img :src="item.coverImgUrl" alt="">
                    </div>
                </template>
                <template #name>
                    <div class="name fs-3 d-flex ai-center text-33" v-html="keywordsColorful(item.name, keywords)">
                    </div>
                </template>
                <template #song-count>
                    <div class="song-count fs-1 text-c7">
                        {{ item.trackCount }}首
                    </div>
                </template>
                <template #author>
                    <div class="author fs-1 text-c7">
                        <span class="by mr-5">by</span>
                        <span class="auth" v-if="item.creator">{{ item.creator?.nickname }}</span>
                    </div>
                </template>
            </CommonItem>
        </div>
        <Pagination id="pagination" v-if="pages.total >= pages.size && !isShowLoading && pages.total"
            :total="pages.total" :size="pages.size" :page="pages.page" @page-change="handlePageChange"
            class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>
    </div>
    <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
        style="margin-top: 100px;">
        很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何歌单
    </div>
</template>

<script lang="ts" setup>
import { keywordsColorful } from "@/utils"
import Pagination from '@/components/Pagination.vue';
import { searchByType } from "@/service/api/search";
import { Playlist, SearchSongListResult } from "@/service/api/search/types"
import { useRoute, useRouter } from "vue-router";
import CommonItem from '../../../components/CommonItem.vue';
import Loading from '@/components/Loading.vue';
import { scrollToTop } from '@/utils';

const isShowLoading = ref(false)
const keywords = useRoute().params.keywords as string
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})
const songList = reactive({ data: [] as Playlist[] })
const router = useRouter()

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()



watch(() => pages.total, () => {
    emits("changeTotal", pages.total)
})

const handlePageChange = (num: number) => {
    pages.page = num
    getSearchSongList()
}
const getSearchSongList = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    try {
        const r = await searchByType({ keywords: keywords, type: 1000, limit: pages.size, offset: (pages.page - 1) * pages.size })
        const _ = r.result as unknown as SearchSongListResult
        songList.data = _.playlists
        pages.total = _.playlistCount
        isShowLoading.value = false
        if (pages.total === 0) {
            emits("changeTotal", pages.total)
        }
    } catch (error) {
        isShowLoading.value = false

    }
}
getSearchSongList()
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

.song-count {
    width: 15%;
}

.author {
    width: 20%;

    .auth:hover {
        cursor: pointer;
        color: var(--theme-85);
    }
}
</style>
