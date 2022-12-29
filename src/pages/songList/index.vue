<template>
    <DefaultLayout>
        <div class="song-list-wrapper">
            <!-- <Abbreviation></Abbreviation> -->
            <!-- 歌单 -->
            <SongListHeader :header-info="headerInfo"></SongListHeader>
            <div class="tab-wrapper mt-30">
                <SwitchTabForSongList :comment-count="headerInfo.commentCount"></SwitchTabForSongList>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongListHeader from '@/components/song/SongListHeader.vue';
// import Abbreviation from '@/components/Abbreviation.vue';
import SwitchTabForSongList from '@/components/switchTab/SwitchTabForSongList.vue';
import { getSongListDetail } from '@/service/api/music';
import { Creator, HeaderInfo, TrackId } from '@/service/api/music/types';
import { HotSong } from '@/service/api/singer/types';
import { getQueryId, throttle } from '@/utils';
import { provide, reactive, ref } from 'vue';
const queryId = getQueryId()
const songList = reactive({ data: [] as HotSong[] })
const songListInfo = reactive({ data: [] as TrackId[] })
// const songListComment = ref<HTMLElement | null>()
// TODO 丑陋
const headerInfo = reactive({
    id: 0,
    name: "",
    coverImgUrl: "",
    description: "",
    subscribedCount: 0,
    createTime: 0,
    userId: 0,
    trackCount: 0,
    shareCount: 0,
    commentCount: 0,
    creator: {} as Creator,
    tags: [] as string[],
    playCount: 0
})
// 注入songlist
provide("songList", songList)
// 注入榜单信息 上升 下降
provide("songListInfo", songListInfo)
const getDetail = async () => {
    const r = await getSongListDetail({ id: queryId })
    songList.data = r.playlist.tracks
    songListInfo.data = r.playlist.trackIds || []
    headerInfo.id = r.playlist.id
    headerInfo.name = r.playlist.name
    headerInfo.coverImgUrl = r.playlist.coverImgUrl
    headerInfo.description = r.playlist.description || ""
    headerInfo.createTime = r.playlist.createTime
    headerInfo.subscribedCount = r.playlist.subscribedCount
    headerInfo.userId = r.playlist.userId
    headerInfo.trackCount = r.playlist.trackCount
    headerInfo.commentCount = r.playlist.commentCount
    headerInfo.creator = r.playlist.creator
    headerInfo.tags = r.playlist.tags
    headerInfo.playCount = r.playlist.playCount
    headerInfo.shareCount = r.playlist.shareCount
}
getDetail()
</script>
<style lang="scss" scoped>
.song-list-wrapper {
    padding: 15px 30px;
}
</style>
