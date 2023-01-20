<template>
    <DefaultLayout>
        <div class="song-list-wrapper" :class="{ isShowPadding: isShowHeadInfo }">
            <!-- <Abbreviation v-if="isShowHeadInfo" :name="headerInfo.name"></Abbreviation> -->
            <!-- 歌单 -->
            <SongListHeader :header-info="headerInfo" @change-state="getDetail"></SongListHeader>
            <div class="tab-wrapper mt-30">
                <SwitchTabForSongList :comment-count="headerInfo.commentCount" :is-show-loading="isShowLoading"
                    @update-info="getDetail">
                </SwitchTabForSongList>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongListHeader from '@/components/song/SongListHeader.vue';
import Abbreviation from '@/components/Abbreviation.vue';
import SwitchTabForSongList from '@/components/switchTab/SwitchTabForSongList.vue';
import { getSongListDetail } from '@/service/api/music';
import { Creator, HeaderInfo, TrackId } from '@/service/api/music/types';
import { HotSong } from '@/service/api/singer/types';
import { getQueryId } from '@/utils';
import { provide, reactive, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { Playlist_user } from '@/service/api/user/types';
import { useMusicPlayRelation } from "@/hooks/useMusicPlayRelation"
const { checkMusicCopyright } = useMusicPlayRelation()
const queryId = getQueryId() as number
const songList = reactive({ data: [] as HotSong[] })
const songListInfo = reactive({ data: [] as TrackId[] })
const isShowHeadInfo = ref(true)
const isShowLoading = ref(false)
const headerInfo = reactive<HeaderInfo>({
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
    playList: {} as Playlist_user,
    creator: {} as Creator,
    tags: [],
    playCount: 0,
    trackIds: [],
    subscribed: false
})
// 注入songlist
provide("songList", songList)
// 注入榜单信息 上升 下降
provide("songListInfo", songListInfo)
/**
 * 获取歌单详情
 * @param query {id: 歌单id, flag: 是否需要loading}
 */
const getDetail = async (query: { id: number, flag?: boolean }) => {
    if (!query.flag) {
        isShowLoading.value = true
    }
    const r = await getSongListDetail({ id: query.id })
    songList.data = r.playlist.tracks // 这里的音乐列表可能会比实际的少，不想在发起多次请求获取实际的列表
    let key: keyof HeaderInfo
    for (key in headerInfo) {
        if (key === "trackIds") {
            const result: TrackId[] = []
            r.playlist.trackIds?.slice(0, songList.data.length).map((item, index) => {
                const _ = songList.data[index]
                if (checkMusicCopyright(_.fee, !_.noCopyrightRcmd)) {
                    result.push(item)
                }
            })
            headerInfo[key] = result
            songListInfo.data = result
            continue
        }
        if (key === "playList") {
            (headerInfo[key] as any) = r.playlist
            continue
        }
        (headerInfo[key] as any) = r.playlist[key]
    }
    isShowLoading.value = false
}
onBeforeRouteUpdate((to, from, next) => {
    getDetail({ id: Number(to.params.id) })
    next()
})
getDetail({ id: queryId })
</script>
<style lang="scss" scoped>
.song-list-wrapper {
    padding: 15px 30px;
}
</style>
