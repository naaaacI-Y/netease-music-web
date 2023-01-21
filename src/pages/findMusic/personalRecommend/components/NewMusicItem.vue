<template>
    <div class="new-music-item-wrapper d-flex ai-center"
        :style="{ paddingLeft: `${!isOutSide ? '30px' : ''}`, backgroundColor: isShowBackground }"
        v-on:dblclick="playSingle">
        <div class="index mr-12 fs-2" v-if="!isOutSide">{{ paddingLeft(index) }}</div>

        <div class="song-cover mr-12" @click="playSingle">
            <img :src="formatPicUrl(musicItem.picUrl, 60, 60)" alt="">
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="index fs-2 mr-12" v-if="isOutSide && !isPlaying">{{ paddingLeft(index) }}</div>
        <div class="index fs-2 mr-12" v-if="isOutSide && isPlaying">
            <i class="iconfont icon-yinlianglabashengyin" style="color: #c3473a"></i>
        </div>
        <div class="music-name d-flex flex-column jc-center ai-start flex-1">
            <div class="name fs-3">
                <span class="mr-4 text-00">{{ musicItem.name }}</span>
                <span v-if="musicItem.song.alias.length" class="text-93">({{ musicItem.song.alias[0] }})</span>
            </div>
            <div class="music-author d-flex ai-center" v-if="isOutSide">
                <div class="text-primary_red_4  mr-4 sq" v-if="musicItem.song.sqMusic">
                    <span>SQ</span>
                </div>
                <div class="fs-2" @click="router.push(`/singer-home/${musicItem?.song?.artists[0]?.id}`)">{{
                    musicItem.song.artists[0].name
                }}</div>
            </div>
        </div>
        <!-- <div class="music-author fs-2 " v-if="!isOutSide">歌曲演唱者</div> -->
        <div class="music-album fs-2" v-if="!isOutSide">{{ musicItem.song.album.name }}</div>
        <div class="music-time fs-2" v-if="!isOutSide">{{ musicItem.song.duration }}</div>
    </div>
</template>

<script lang="ts" setup>
import { RecommendNewMusicRet } from '@/service/api/recommend/types';
import { formatPicUrl, paddingLeft } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import Message from "@/components/message"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';

const router = useRouter()
const route = useRoute()
const { player, usePlayer, playSingleMusic, messageTip } = useMusicPlayRelation()
const props = withDefaults(defineProps<{
    isOutSide?: boolean,
    index?: number
    musicItem: RecommendNewMusicRet
}>(), {
    isOutSide: true,
    index: 1
})
const isPlaying = computed(() => {
    return !player.value.isPersonalFM && player.value.currentTrack.id === props.musicItem?.song?.id
})
// 是否显示背景颜色 区分与首页的最新音乐以及最新音乐列表
const isShowBackground = computed(() => {
    if (!props.isOutSide) {
        return props.index ? (props.index % 2 === 0 ? "" : "#fafafa") : ""
    }
    return ""
})

const playSingle = () => {
    // 检查否有播放权限
    const isShowTip = messageTip()
    if (isShowTip) return
    playSingleMusic([], props.musicItem.song.id, -1)
}


// 播放单曲或是所有的最新音乐列表
const playSongAllOrSingle = () => {
    if (route.path === "/findMusic/personal-recommend") {
        // // 播放单曲，追加到当前正在播放的音乐后面，如果当前没有正在播放的音乐列表（例如，播放私人fm）,就只添加一首到列表中
        // const list = player.value.list
        // if (list.length) {
        //     const idx = player.value.current
        //     // 插入到当前播放之后
        //     if (idx < list.length - 1) {
        //         player.value.list.splice(idx, 0, props.musicItem.id);
        //     } else {
        //         player.value.list.unshift(props.musicItem.id)
        //     }
        //     // return usePlayer.playNextTrack()
        // }
        // // 可能会有问题  play
        // player.value.list.push(props.musicItem.id)
        // // 播放下一首 也就是当前点击的歌曲
        // usePlayer.playNextTrack()
    }

    // 最新音乐列表的播放


}
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
            @include SQ(0px, 0.5px, 7.5px);
        }
    }

    .music-album {
        width: 250px;
    }

    .music-album,
    .music-author {
        color: var(--theme-3f);

    }

    .music-album:hover,
    .music-author:hover {
        color: var(--theme-66);
        cursor: pointer;
    }

    .music-time {
        width: 85px;
        color: #969696;
    }

}
</style>
