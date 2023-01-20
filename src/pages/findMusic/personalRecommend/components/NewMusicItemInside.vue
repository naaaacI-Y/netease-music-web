<template>
    <div class="new-music-item-wrapper d-flex ai-center" :class="{ odd: index % 2 !== 0 }" v-on:dblclick="playMusic"
        :style="{ paddingLeft: `${!isOutSide ? '30px' : ''}` }">
        <div class="index mr-12 fs-2" v-show="isPlaying">
            <i class="iconfont icon-yinlianglabashengyin" style="color: #c3473a"></i>
        </div>
        <div class="index text-c4 mr-12 fs-2" v-show="!isPlaying">{{ paddingLeft(index) }}</div>
        <div class="song-cover mr-12" @click.stop="playMusic">
            <lazy-load-img :src="formatPicUrl(musicItem.album.picUrl, 60, 60)"></lazy-load-img>
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="index fs-2 mr-12" v-if="isOutSide">{{ paddingLeft(index) }}</div>

        <div class="music-name d-flex flex-column jc-center ai-start flex-1">
            <div class="name fs-3">
                <span class="mr-4 text-33" :class="[isPlaying ? 'isPlaying' : '']">{{ musicItem.name }}</span>
                <span v-if="musicItem.album.alias.length" class="text-99">({{ musicItem.album.alias[0] }})</span>
            </div>
            <div class="music-author" v-if="isOutSide">
                <!-- <span class="text-primary_red_4 fs-1 mr-4 sq" v-if="musicItem.song.sqMusic">SQ</span> -->
                <span class="fs-2">{{ musicItem.artists[0].name }}</span>
            </div>
        </div>
        <div class="music-author fs-2 text-64 " v-if="!isOutSide" @click="goAuthor">{{ musicItem.artists[0].name }}
        </div>
        <div class="music-album fs-2 text-64" v-if="!isOutSide" @click="goAlbum">{{ musicItem.album.name }}</div>
        <div class="music-time fs-2 text-96" v-if="!isOutSide">{{ formatSongTime(musicItem.duration) }}</div>
    </div>
</template>

<script lang="ts" setup>
import { formatPicUrl, formatSongTime } from "@/utils/index"
import LazyLoadImg from '@/components/LazyLoadImg.vue';
import { computed } from 'vue';
import { paddingLeft } from "@/utils";
import { NewMusicRet } from '@/service/api/music/types';
import { useRouter } from "vue-router";
import { useMusicPlayRelation } from "@/hooks/useMusicPlayRelation";
const { player, messageTip, checkMusicCopyright } = useMusicPlayRelation()
const router = useRouter()
const props = withDefaults(defineProps<{
    isOutSide?: boolean,
    index?: number
    musicItem: NewMusicRet
}>(), {
    isOutSide: true,
    index: 1
})
const emits = defineEmits<{
    (e: "playSingelMusic", id: number): void
}>()

// 是否正在播放
const isPlaying = computed(() => {
    return !player.value.isPersonalFM && player.value.currentTrack.id === props.musicItem?.id
})

// 播放单曲
const playMusic = () => {
    const isShowTip = messageTip()
    if (isShowTip) return
    emits('playSingelMusic', props.musicItem.id)
}

// 前往作者界面
const goAuthor = () => {
    router.push(`/singer-home/${props.musicItem.artists[0].id}`)
}
// 前往专辑界面
const goAlbum = () => {
    router.push(`/album/${props.musicItem.album.id}`)
}

checkMusicCopyright(props.musicItem.fee, props.musicItem.copyrightId)
</script>
<style lang="scss" scoped>
.new-music-item-wrapper {
    height: 80px;
    padding: 10px 0;

    .index {
        color: #969696;
    }

    .music-name .name {
        @include no-wrap(413px);
    }

    .song-cover {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        // background-color: aqua;

        img {
            width: 100%;
            height: 100%;
        }

        .play-btn {
            @include common-play-btn(25px, 6px, 8px);
            top: 50%;
            left: 50%;
        }
    }

    .music-author {
        width: 185px;

        .sq {
            border: 1px solid #d33b31;
            border-radius: 4px;
            padding: 0 3px;
        }
    }

    .music-album {
        @include no-wrap(240px);
        padding-right: 10px;
    }


    .music-album:hover,
    .music-author:hover {
        color: var(--theme-4c);
        cursor: pointer;
    }

    .music-time {
        width: 85px;
    }
}

.odd {
    background-color: var(--theme-fa);
}
</style>
