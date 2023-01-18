<template>
    <div class="common-head-wrapper d-flex">
        <div class="music-left d-flex flex-column jc-end ai-center"
            :class="playType === 'personal' ? 'personal-left' : 'song-left'">
            <slot name="img-wrap"></slot>
            <slot name="operate-wrap"></slot>
        </div>
        <div class="music-right" :class="playType === 'personal' ? 'personal-right' : 'song-right'">
            <div class="music-name d-flex mb-10 ai-center">
                <div class="fs-9 mr-10 text-33">{{ player.currentTrack.name }}</div>
                <div class="mv fs-2 ">MV</div>
            </div>
            <div class="other-info d-flex fs-2 text-66 ai-center mb-20">
                <div class="album  flex-1">
                    <span>专辑：</span>
                    <span class="text-shadow_blue">{{ player.currentTrack?.al?.name }}</span>
                </div>
                <div class="singer flex-1">
                    <span>歌手：</span>
                    <span class="text-shadow_blue">{{ player.currentTrack?.ar[0].name }}</span>
                </div>
                <div class="from flex-1">
                    <!-- <span>来源：</span>
                    <span class="text-shadow_blue">来源来源来源来源来源来源来源来源</span> -->
                </div>
            </div>
            <div class="lyric" id="lyric">
                <div class="lyric-item fs-3 text-66 mb-15" v-for="(item, index) in lyric.data.lyric" :key="item.time"
                    :id="`line${index + 1}`" :class="{ isActive: activeLine === index + 1 }">
                    <div v-for="it in item.content.split('&&')" class="mb-5">
                        {{ it }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getLyric } from '@/service/api/music';
import useStore from '@/store';
import { binarySearch, lyricParser, ParseResult } from '@/utils/lyrics';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';

const { usePlayer } = useStore()
const { player, likedList } = storeToRefs(usePlayer)
const lyric = reactive({ data: {} as ParseResult }) // 歌词,
const activeLine = ref(-1)

defineProps<{
    playType: "personal" | "songList"
}>()

// 当前歌词正在播放的某一行
watch(() => player.value.progress, () => {
    getActive()
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
const getActive = () => {
    const active = binarySearch(lyric.data?.lyric, undefined, player.value.progress)
    activeLine.value = active

}
// 获取歌词 获取进度对应的某一行
const getlyric = async () => {
    const r = await getLyric({ id: player.value.currentTrack.id })
    lyric.data = lyricParser(r)
    getActive()
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

        .lyric {
            width: 378px;
            // flex: 1;
            height: 320px;
            overflow-y: scroll;
            border-right: 1px solid var(--theme-f2);
        }

        .isActive {
            color: vat(--theme-00);
            font-weight: bold;
        }

        .other-info {
            div {
                width: 33.33333%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
