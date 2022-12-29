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
                <div class="main-label text-white mb-6 fs-5">{{ bannerInfo.data.name }}</div>
                <div class="main-sub-label fs-2 text-c4" v-if="bannerInfo.data.copywriter">{{ bannerInfo.data.copywriter
                }}</div>
            </div>
        </div>
        <CommonBtn :active-type="activeType" :types="songMenuTypes" @change-active-type="changeActiveType"></CommonBtn>
        <div class="song-list d-flex flex-wrap jc-between">
            <RecommendSongListCard :is-out-side="false" v-for="item in songList.data" :key="item.id"
                @click="goSongList(item.id)" :song-list-item="item"></RecommendSongListCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import CommonBtn from '@/components/global/CommonBtn.vue';
import { songMenuTypes } from "@/utils/const"
import { reactive, ref, watch } from 'vue';
import { getSongList, getHighqualitySongList } from "@/service/api/music"
import { Playlist } from '@/service/api/music/types';
import { useRouter } from 'vue-router';
const activeType = ref(-1)
const router = useRouter()
const total = ref(0)
const pages = reactive({
    cat: activeType.value === -1 ? "全部" : songMenuTypes[activeType.value],
    limit: 30,
    offset: 0
})
const songList = reactive({ data: [] as Playlist[] })
const bannerInfo = reactive({ data: {} as Playlist }) // 歌单banner信息 包括icon、介绍
watch(activeType, () => {
    pages.cat = songMenuTypes[activeType.value]
    getList()
    getbannerInfo()
})
const changeActiveType = (num: number) => {
    activeType.value = num
}
// 前往精品歌单页
const goHighqualitySongList = () => {
    router.push(`/high-qualtity-song-list?index=${activeType.value}`)
}
// 前往歌单页
const goSongList = (songListId: number) => {
    router.push(`/song-list?id=${songListId}`)
}
// 获取网友精选歌单
const getList = async () => {
    const r = await getSongList(pages)
    songList.data = r.playlists
    total.value = r.total
}
// 获取歌单头部banner信息
const getbannerInfo = async () => {
    const queryInfo = {
        cat: pages.cat,
        limit: 1
    }
    const r = await getHighqualitySongList(queryInfo)
    bannerInfo.data = r.playlists[0]
}
getList()
getbannerInfo()
</script>
<style lang="scss" scoped>
.song-menu-wrapper {
    padding-top: 20px;
    width: 1040px;
    margin: auto;

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
