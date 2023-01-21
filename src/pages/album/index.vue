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
import { HotAlbum, HotSong } from '@/service/api/singer/types';
import { AlbumDynamicInfoResult, Info } from '@/service/api/album/types';
import { getQueryId } from '@/utils';
import { TrackId } from '@/service/api/music/types';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';

const { checkMusicCopyright } = useMusicPlayRelation()
const albumInfo = reactive({ data: {} as HotAlbum & { info: Info } }) // 专辑信息
const albumCountInfo = reactive({ data: {} as AlbumDynamicInfoResult }) // 专辑动态相关信息  点赞、分享数量
const commentCount = ref(0) // 评论数量
const detailInfo = ref("") // 专辑详情
const albumSongList = reactive({ data: [] as HotSong[] })
const songListInfo = reactive({ data: [] as TrackId[] })
const queryId = getQueryId() as number // 查询参数id
const isShowLoading = ref(false)

// 注入的列表数据是用来展示的
provide("songList", albumSongList)

// 这里的列表数据是过滤后的数据，用于播放，不在列表中的数据播放会直接跳过，不用再去比对是否有权限，直接注入也不用逐级向下传递
provide("songListInfo", songListInfo)

// 获取专辑详情
const getAlbumDetailInfo = async () => {
    isShowLoading.value = true
    const r = await getAlbumInfo({ id: queryId })
    albumInfo.data = r.album
    detailInfo.value = r.album.description
    albumSongList.data = r.songs
    songListInfo.data = r.songs.filter(item => {
        return checkMusicCopyright(item.fee, !item.noCopyrightRcmd)
    }).map(item => {
        return { id: item.id }
    })
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
