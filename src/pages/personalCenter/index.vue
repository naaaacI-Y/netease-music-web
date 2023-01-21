<template>
    <DefaultLayout>
        <div class="persoanl-center-wrapper">
            <UserHeader :is-self="isSelf" :uid="id"></UserHeader>
            <div class="song-list-wrapper mb-30">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title">
                        <span class="fs-5 text-33" style="font-weight: bold;">{{ isSelf? '我创建的歌单': '歌单' }}</span>
                        <span class="text-66 fs-2">({{ songList.data.length }})</span>
                    </div>
                    <div class="type-change d-flex">
                        <div class="type1 mr-2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                            <i class="iconfont icon-datu fs-9 text-66"></i>
                        </div>
                        <div class="type2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'table' }" @click="songListShowType = 'table'">
                            <i class="iconfont icon-liebiao fs-5 text-66"></i>
                        </div>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap" v-if="songListShowType === 'card'">
                        <RecommendSongListCard v-for="(item) in songList.data" :is-oneline="true"
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
                    <!-- <Pagination v-if="pages4Self.total >= pages4Self.size" :total="pages4Self.total" :size="pages4Self.size" :page="pages4Self.page"
                        @page-change="handlePageChange4Self" class="mt-30 mb-30"></Pagination> -->
                    <!-- <div class="content-type2" v-if="songListShowType === 'table'">
                        <SongForList v-for="item in 4"></SongForList>
                    </div> -->
                </div>
            </div>
            <div class="song-list-wrapper" v-if="collectSongList.data.length">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title">
                        <span class="fs-5 text-33" style="font-weight: bold;">{{ isSelf? '我收藏的歌单': '收藏' }}</span>
                        <span class="text-66 fs-2">({{ collectSongList.data.length }})</span>
                    </div>
                    <div class="type-change d-flex">
                        <div class="type1 mr-2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                            <i class="iconfont icon-datu fs-9 text-66"></i>
                        </div>
                        <div class="type2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'table' }" @click="songListShowType = 'table'">
                            <i class="iconfont icon-liebiao fs-5 text-66"></i>
                        </div>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap " v-if="songListShowType === 'card'">
                        <RecommendSongListCard v-for="(item) in collectSongList.data" :is-oneline="true"
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
                    <!-- <Pagination v-if="pages4Collect.total >= pages4Collect.size" :total="pages4Collect.total" :size="pages4Collect.size" :page="pages4Collect.page"
                        @page-change="handlePageChange4Collection" class="mt-30 mb-30"></Pagination> -->
                    <!-- <div class="content-type2" v-if="songListShowType === 'table'">
                        <SongForList v-for="item in 4"></SongForList>
                    </div> -->
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';

import UserHeader from '@/components/header/UserHeader.vue';
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import SongForList from '@/components/SongForList.vue';
import { getSongList } from '@/service/api/user';
import { Playlist_user } from '@/service/api/user/types';
import useStore from '@/store';

import { checkLogin, getQueryId } from '@/utils';
const songListShowType = ref("card") // card | table
const songList = reactive({ data: [] as any[] }) // 创建的歌单
const collectSongList = reactive({ data: [] as any[] }) // 收藏的歌单
const id = getQueryId() as number
const isSelf = computed(() => {
    if (!checkLogin()) return false
    const store = useStore()
    const uid = store.userProfile.userFile?.userId
    if (uid === id) return true
    return false
})
// 歌单分页 TODO
const pages4Self = reactive({
    page: 1,
    size: 30,
    total: 0
})
const pages4Collect = reactive({
    page: 1,
    size: 30,
    total: 0
})
// 自建歌单分页触发
const handlePageChange4Self = (num: number) => {
    pages4Self.page = num
}
// 收藏歌单分页触发
const handlePageChange4Collection = (num: number) => {
    pages4Collect.page = num
}
const getList = async () => {
    const r = await getSongList({ uid: id })
    songList.data = r.playlist.filter(item => item.creator.userId === id)

    collectSongList.data = r.playlist.filter(item => item.creator.userId !== id)
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
