<template>
    <div class="common-head-wrapper d-flex">
        <div class="music-left d-flex flex-column jc-end ai-center"
            :class="playType === 'personal' ? 'personal-left' : 'song-left'">
            <slot name="img-wrap"></slot>
            <slot name="operate-wrap"></slot>
        </div>
        <div class="music-right d-flex flex-column" :class="playType === 'personal' ? 'personal-right' : 'song-right'">
            <div class="music-name d-flex mb-10 ai-center">
                <div class="fs-9 mr-10 text-33">{{ trackName }}</div>
                <!-- <div class="mv fs-2 ">MV</div> -->
            </div>
            <div class="other-info d-flex fs-2 text-66 ai-center mb-20">
                <div class="album  flex-1 mr-10">
                    <span>专辑：</span>
                    <span class="text-shadow_blue" @click="goAlbum">{{ album }}</span>
                </div>
                <div class="singer flex-1">
                    <span>歌手：</span>
                    <span class="text-shadow_blue" @click="goSinger">{{ singerName }}</span>
                </div>
                <div class="from flex-1">
                    <!-- <span>来源：</span>
                    <span class="text-shadow_blue">来源来源来源来源来源来源来源来源</span> -->
                </div>
            </div>
            <div class="lyric-wrapper flex-1">
                <div class="wrap" id="lyric" v-if="lyric.data?.lyric?.length">
                    <div class="lyric-item fs-3 text-66 mb-15" v-for="(item, index) in lyric.data.lyric"
                        :key="item.time" :id="`line${index + 1}`" :class="{ isActive: activeLine === index + 1 }">
                        <div v-for="it in item.content.split('&&')" class="mb-5">
                            {{ it }}
                        </div>
                    </div>
                </div>
                <div class="pure-music text-33" v-if="!lyric.data?.lyric?.length" style="font-weight: bold;">
                    纯音乐，请欣赏
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
import { getLyric } from '@/service/api/music';
import { useRoute, useRouter } from 'vue-router';
import { binarySearch, lyricParser, ParseResult } from '@/utils/lyrics';

const router = useRouter()
const route = useRoute()
const { player, isShowPlayPage } = useMusicPlayRelation()
const lyric = reactive({ data: {} as ParseResult }) // 歌词,
const activeLine = ref(-1)

const props = defineProps<{
    playType: "personal" | "songList"
}>()
// 动态获取当前正在播放歌曲的id
const cId = computed(() => {
    if (props.playType === 'personal') {
        return player.value.personalFMTrack.id
    }
    return player.value.currentTrack.id
})
// 当前歌词正在播放的某一行
watch(() => player.value.progress, () => {
    // 如果当前是私人fm页面 播放的不是私人fm的歌
    if ((!player.value.isPersonalFM && route.path === "/personal-fm") || !isShowPlayPage) {
        return
    }
    getActive()
})
// 监听播放歌曲id的改变，更新歌词
watch(() => cId.value, () => {
    // 如果当前是私人fm页面 播放的不是私人fm的歌
    if ((!player.value.isPersonalFM && route.path === "/personal-fm") || !isShowPlayPage) {
        return
    }
    getlyric()
})
// 监听播放到第几行  歌词滚动
watch(() => activeLine.value, () => {
    if (player.value.progress > 0) {
        const lyric = document.getElementById(`lyric`)
        const el = document.getElementById(`line${activeLine.value}`)
        const activeLineOffsetHeight = el?.offsetTop! // 当前播放行滚动的距离
        lyric?.scrollTo({ top: activeLineOffsetHeight - lyric.offsetTop })
    }
})
const trackName = computed(() => {
    return props.playType === 'personal' ? player.value.personalFMTrack.name : player.value.currentTrack.name
})
const singerName = computed(() => {
    return props.playType === 'personal' ? player.value.personalFMTrack.artists[0].name : player.value.currentTrack.ar[0].name
})
const album = computed(() => {
    return props.playType === 'personal' ? player.value.personalFMTrack.album.name : player.value.currentTrack.al.name
})

// 获取当前播放到第几行
const getActive = () => {
    const active = binarySearch(lyric.data?.lyric, undefined, player.value.progress)
    activeLine.value = active
}

// 获取歌词 获取进度对应的某一行
const getlyric = async () => {
    const id = props.playType === 'personal' ? player.value.personalFMTrack.id : player.value.currentTrack.id
    try {
        const r = await getLyric({ id })
        lyric.data = lyricParser(r)
        // 如果没有歌词的音乐 不获取
        if (!lyric.data.lyric.length) {
            return
        }
        // 如果当前是私人fm页面 播放的不是私人fm的歌
        if ((!player.value.isPersonalFM && route.path === "/personal-fm") || !isShowPlayPage) {
            return
        }
        // 如果当前不是播放界面 不必动态加载歌词的行数
        getActive()
    } catch (error) {
    }
}

// 前往专辑页
const goAlbum = () => {
    const albumId = props.playType === 'personal' ? player.value.personalFMTrack.album.id : player.value.currentTrack.al.id
    if (isShowPlayPage.value) {
        isShowPlayPage.value = false
    }
    router.push(`/album/${albumId}`)
}

// 前往歌手页
const goSinger = () => {
    if (isShowPlayPage.value) {
        isShowPlayPage.value = false
    }
    const singerId = props.playType === 'personal' ? player.value.personalFMTrack.artists[0].id : player.value.currentTrack.ar[0].id
    router.push(`/singer-home/${singerId}`)
}

getlyric()
</script>
<style lang="scss" scoped>
.common-head-wrapper {
    height: 450px;

    .music-right {

        // border: 1px solid black;
        .mv {
            width: 30px;
            height: 20px;
            border: 1px solid #c44c3f;
            border-radius: 3px;
            text-align: center;
            line-height: 20px;
            color: #c44c3f;
        }

        .lyric-wrapper {
            width: 378px;
            height: 330px;
            border-right: 1px solid var(--theme-f2);

            .wrap {
                height: 100%;
                width: 100%;
                overflow-y: scroll;
            }
        }

        .isActive {
            color: var(--theme-00);
            font-weight: bold;
        }

        .other-info {
            div {
                width: 33.33333%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .album,
            .singer {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .song-left {
        width: 335px;
        margin-right: 75px;
    }

    .personal-left {
        width: 310px;
        margin-right: 50px;
        justify-content: center;
    }

    .song-right {
        padding-top: 50px;
        width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .personal-right {
        width: calc(100% - 360px);
        height: 100%;
    }
}
</style>
