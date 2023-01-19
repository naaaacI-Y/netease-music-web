<template>
    <DefaultLayout>
        <div class="album-wrapper">
            <AlbumHeader :album-info="albumInfo.data" :album-count-info="albumCountInfo.data"
                @change-collection-count="getAlbumCountInfo"></AlbumHeader>
            <SwicthTabForAlbum :comment-count="commentCount" :album-detail-info="detailInfo"
                :is-show-loading="isShowLoading"></SwicthTabForAlbum>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import AlbumHeader from '@/components/header/AlbumHeader.vue';
import SwicthTabForAlbum from '@/components/switchTab/SwicthTabForAlbum.vue';
import { getAlbumInfo, getAlbumDynamicInfo } from "@/service/api/album"
import { provide, reactive, ref } from 'vue';
import { HotAlbum, HotSong } from '@/service/api/singer/types';
import { AlbumDynamicInfoResult, Info } from '@/service/api/album/types';
import { getQueryId } from '@/utils';

const albumInfo = reactive({ data: {} as HotAlbum & { info: Info } }) // 专辑信息
const albumCountInfo = reactive({ data: {} as AlbumDynamicInfoResult }) // 专辑动态相关信息  点赞、分享数量
const commentCount = ref(0) // 评论数量
const detailInfo = ref("") // 专辑详情
const albumSongList = reactive({ data: [] as HotSong[] })
const queryId = getQueryId() as number // 查询参数id
const isShowLoading = ref(false)
provide("songList", albumSongList)
provide("songListInfo", [])
// 获取专辑详情
const getAlbumDetailInfo = async () => {
    isShowLoading.value = true
    const r = await getAlbumInfo({ id: queryId })
    albumInfo.data = r.album
    detailInfo.value = r.album.description
    albumSongList.data = r.songs
    isShowLoading.value = false
}
// 获取专辑数量相关 收藏、分享
const getAlbumCountInfo = async () => {
    const r = await getAlbumDynamicInfo({ id: queryId })
    albumCountInfo.data = r
    // 同步外部的评论数量
    commentCount.value = r.commentCount
}
getAlbumDetailInfo()
getAlbumCountInfo()

</script>
<style lang="scss" scoped>
.album-wrapper {
    padding: 15px 30px;
}
</style>
