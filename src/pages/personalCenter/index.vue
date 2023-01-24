<template>
    <DefaultLayout>
        <div class="persoanl-center-wrapper">
            <UserHeader :is-self="isSelf" :uid="id"></UserHeader>

            <!--创建的歌单-->
            <div class="song-list-wrapper mb-30">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title" ref="titleSongList">
                        <span class="fs-5 text-33" style="font-weight: bold;">{{ isSelf? '我创建的歌单': '歌单' }}</span>
                        <span class="text-66 fs-2">({{ songList.data.length }})</span>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap"
                        v-if="!createdPages.isShowLoading && showSongList.data.length">
                        <RecommendSongListCard v-for="(item) in showSongList.data" :is-oneline="true"
                            class="recommedn-list-card" :song-list-item="item" :key="item.id">
                            <template #songlist-name>
                                <div class="songlist-name fs-3 text-4e isOneLine">
                                    {{ item.name }}
                                </div>
                            </template>
                            <template #songCount>
                                <div class="text-66 fs-2">{{ item.trackCount }}首</div>
                            </template>
                        </RecommendSongListCard>
                    </div>
                    <Pagination v-if="createdPages.total >= createdPages.limit && !createdPages.isShowLoading"
                        id="created-pagination" :total="createdPages.total" :size="createdPages.limit"
                        :page="createdPages.page" @page-change="handlePageChange4Self" class="mt-30 mb-30"
                        :index="createdPages.paginationIndex">
                    </Pagination>
                    <!-- <Loading v-show="createdPages.isShowLoading"></Loading> -->
                </div>
            </div>
            <!--收藏的歌单-->
            <div class="song-list-wrapper">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title" ref="titleCollectedList">
                        <span class="fs-5 text-33" style="font-weight: bold;">{{ isSelf? '我收藏的歌单': '收藏' }}</span>
                        <span class="text-66 fs-2">({{ collectSongList.data.length }})</span>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap "
                        v-if="!collectedPages.isShowLoading && showCollectSongList.data.length">
                        <RecommendSongListCard v-for="(item) in showCollectSongList.data" :is-oneline="true"
                            class="recommedn-list-card" :song-list-item="item" :key="item.id">
                            <template #songlist-name>
                                <div class="songlist-name fs-3 text-4e isOneLine">
                                    {{ item.name }}
                                </div>
                            </template>
                            <template #songCount>
                                <div class="text-66 fs-2">{{ item.trackCount }}首</div>
                            </template>
                        </RecommendSongListCard>
                    </div>
                    <Pagination v-if="collectedPages.total >= collectedPages.limit && !collectedPages.isShowLoading"
                        id="collected-pagination" :total="collectedPages.total" :size="collectedPages.limit"
                        :page="collectedPages.page" @page-change="handlePageChange4Collection" class="mt-30 mb-30"
                        :index="collectedPages.paginationIndex">
                    </Pagination>
                    <Loading v-show="collectedPages.isShowLoading"></Loading>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
// import Pagination from '@/components/Pagination.vue';

import UserHeader from '@/components/header/UserHeader.vue';
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import { getSongList } from '@/service/api/user';
import useStore from '@/store';
import { checkLogin, getQueryId, scrollToTop } from '@/utils';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';


const createdPages = reactive({ // 创建的歌单
    page: 1,
    limit: 20,
    total: 0,
    isShowLoading: true,
    paginationIndex: 0
})
const collectedPages = reactive({ // 收藏的歌单
    page: 1,
    limit: 20,
    total: 0,
    isShowLoading: true,
    paginationIndex: 0
})
const titleSongList = ref<HTMLElement | null>()
const titleCollectedList = ref<HTMLElement | null>()
const songListShowType = ref("card") // card | table
const songList = reactive({ data: [] as any[] }) // 创建的歌单
const showSongList = reactive({ data: [] as any[] }) // 展示的创建的歌单
const collectSongList = reactive({ data: [] as any[] }) // 收藏的歌单
const showCollectSongList = reactive({ data: [] as any[] }) // 展示的收藏的歌单
const id = getQueryId() as number
const isSelf = computed(() => {
    if (!checkLogin()) return false
    const store = useStore()
    const uid = store.userProfile.userFile?.profile?.userId
    if (uid === id) return true
    return false
})

// 自建歌单分页触发
const handlePageChange4Self = (num: number) => {
    createdPages.page = num
    showSongList.data = songList.data.slice((createdPages.page - 1) * createdPages.limit, createdPages.limit * createdPages.page)
    // 滚动到标题处
    titleSongList.value?.scrollIntoView()
}

// 收藏歌单分页触发
const handlePageChange4Collection = (num: number) => {
    collectedPages.page = num
    showCollectSongList.data = collectSongList.data.slice((collectedPages.page - 1) * collectedPages.limit, collectedPages.limit * collectedPages.page)
    // 滚动到标题处
    titleCollectedList.value?.scrollIntoView()
}

// 获取所有歌单
const getList = async () => {
    createdPages.isShowLoading = true
    collectedPages.isShowLoading = true
    try {
        const r = await getSongList({ uid: id, limit: 1000 })
        songList.data = r.playlist.filter(item => item.creator.userId === id)
        showSongList.data = songList.data.slice(0, createdPages.limit)
        createdPages.total = songList.data.length
        collectSongList.data = r.playlist.filter(item => item.creator.userId !== id)
        showCollectSongList.data = collectSongList.data.slice(0, collectedPages.limit)
        collectedPages.total = collectSongList.data.length
        createdPages.isShowLoading = false
        collectedPages.isShowLoading = false
    } catch (error) {
        createdPages.isShowLoading = false
        collectedPages.isShowLoading = false
    }
}
getList()
</script>
<style lang="scss" scoped>
.persoanl-center-wrapper {
    padding: 15px 30px;
}

.song-list-wrapper {
    .head {
        .type-change {

            .type1,
            .type2 {
                width: 25px;
                height: 20px;
                background-color: var(--theme-f2);
            }

            .type1 {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .type2 {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            .isActive {
                background-color: var(--theme-bf);

                i {
                    color: white;
                }
            }
        }
    }
}

.songlist-name {
    word-break: break-all;

    &:hover {
        color: var(--theme-3a);
        cursor: pointer;
    }
}

.isOneLine {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.recommedn-list-card:not(:nth-child(5n)) {
    margin-right: calc(5% / 4);
}
</style>
