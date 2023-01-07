<template>
    <div class="song-menu-wrapper">
        <div class="head-card mt-15 d-flex mb-15" @click="goHighqualitySongList" v-if="bannerInfo.data">
            <div class="card-img mr-12" v-if="bannerInfo.data?.coverImgUrl">
                <img :src="bannerInfo.data?.coverImgUrl" alt="">
            </div>
            <div class="main-info d-flex flex-column jc-center">
                <div class="logo fs-3 mb-20">
                    <i class="iconfont icon-huangguan mr-3"></i>
                    <span>精品歌单</span>
                </div>
                <div class="main-label mb-6 fs-5" style="color:white">{{ bannerInfo.data.name }}</div>
                <div class="main-sub-label fs-2 text-c4" v-if="bannerInfo.data.copywriter">{{
                    bannerInfo.data.copywriter
                }}</div>
            </div>
        </div>
        <FilterItem :active-type="activeIndex" :type-list="songMenuTypes" @change-active-type="changeActiveType">
            <template #left-label>
                <div class="category-btn d-flex ai-center jc-center text-66">
                    <span class="fs-3 mr-5 ">{{ !activeType ? "全部歌单" : activeType }}</span>
                    <i class="iconfont icon-xiangyou2 fs-3"></i>
                </div>
            </template>
        </FilterItem>
        <div class="song-list d-flex flex-wrap jc-between">
            <RecommendSongListCard :is-out-side="false" v-for="item in songList.data" :key="item.id"
                @click="goSongList(item.id)" :song-list-item="item"></RecommendSongListCard>
        </div>
        <Pagination v-if="pages.total >= pages.limit" :total="pages.total" :size="pages.limit" :page="pages.page"
            @page-change="handlePageChange" class="mt-30 mb-30" :index="paginationIndex">
        </Pagination>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination.vue';
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import FilterItem from '@/components/FilterItem.vue';
import { songMenuTypes } from "@/utils/const"
import { computed, reactive, ref, watchEffect } from 'vue';
import { getSongList, getHighqualitySongList } from "@/service/api/music"
import { Playlist, SongListParams } from '@/service/api/music/types';
import { useRouter } from 'vue-router';
import { scrollToTop } from '@/utils';
const activeType = ref("")
const router = useRouter()
const paginationIndex = ref(0)
const pages = reactive({
    cat: !activeType.value ? "全部" : activeType.value,
    limit: 40,
    offset: 0,
    total: 0,
    page: 1
})
const songList = reactive({ data: [] as Playlist[] })
const bannerInfo = reactive({ data: {} as Playlist }) // 歌单banner信息 包括icon、介绍
const activeIndex = computed(() => {
    if (activeType.value === '') return -1
    return songMenuTypes[activeType.value]
})
// 获取网友精选歌单
const getList = async (params: SongListParams) => {
    const r = await getSongList(params)
    songList.data = r.playlists
    pages.total = r.total
    // 滚动到顶部
    scrollToTop()
}
// 获取歌单头部banner信息
const getbannerInfo = async () => {
    const queryInfo = {
        cat: !activeType.value ? "全部" : activeType.value,
        limit: 1
    }
    const r = await getHighqualitySongList(queryInfo)
    bannerInfo.data = r.playlists[0]
}
watchEffect(async () => {
    const queryInfo = {
        area: !activeType.value ? "全部" : activeType.value,
        limit: pages.limit,
        page: pages.page,
        offset: (pages.page - 1) * pages.limit
    }
    await getList(queryInfo)
    await getbannerInfo()
    // 重新构建分页，并且修改总页码 ==> 从1开始  如果当前页是1就不需要再重新构建了
    paginationIndex.value++
})
const changeActiveType = (name: string) => {
    activeType.value = name
    pages.page = 1
}
const handlePageChange = (num: number) => {
    pages.page = num
}

// 前往精品歌单页
const goHighqualitySongList = () => {
    router.push(`/high-qualtity-song-list?index=${activeType.value}`)
}
// 前往歌单页
const goSongList = (songListId: number) => {
    router.push(`/song-list/${songListId}`)
}

</script>
<style lang="scss" scoped>
.song-menu-wrapper {
    padding-top: 20px;
    width: 1040px;
    margin: auto;

    .category-btn {
        border: 1px solid var(--theme-e5);
        padding: 4px 0;
        width: 100px;
        border-radius: 20px;
    }

    .head-card {
        height: 170px;
        background-color: #9598a1;
        border-radius: 10px;
        padding: 15px;

        .card-img {
            width: 140px;
            height: 140px;
            border-radius: 10px;
            overflow: hidden;

            img {
                width: 100%;
            }

            // background-color: aqua;
        }

        .main-info {
            .logo {
                width: 100px;
                height: 30px;
                border-radius: 20px;
                border: 1px solid #deac67;
                color: #deac67;
                text-align: center;
                line-height: 30px;
            }
        }

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
