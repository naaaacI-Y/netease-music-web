<template>
    <commonHead play-type="personal">
        <template #img-wrap>
            <div class="img-wrap">
                <div class="img">
                    <img :src="player.personalFMTrack?.al?.picUrl" alt="">

                </div>
                <div class="playing">
                    <i class="iconfont icon-zanting01 text-primary_red_4"></i>
                </div>
                <div class="pause">
                    <div class="trangel"></div>
                </div>
            </div>
        </template>
        <template #operate-wrap>
            <div class="operate-wrap d-flex ai-center text-4b">
                <div class="collect" @click="likeMusic(player.currentTrack.id, !isLike)">
                    <i class="iconfont icon-aixin fs-9"></i>
                </div>
                <div class="delete" @click="delete2Next">
                    <i class="iconfont icon-shanchu fs-9"></i>
                </div>
                <div class="next" @click="playNextFmSong">
                    <i class="iconfont icon-xiayigexiayishou fs-7"></i>
                </div>
                <div class="other" @click="Message.error('暂不支持')">
                    <i class="iconfont icon-shenglvehao fs-9"></i>
                </div>
            </div>
        </template>
    </commonHead>
</template>

<script lang="ts" setup>
import commonHead from './commonHead.vue';
import Message from "@/components/message"
import { storeToRefs } from 'pinia';
import useLikeMusic from '@/hooks/useLikeMusic';
import useStore from '@/store';
import { computed } from 'vue';
const { usePlayer } = useStore()
const { player } = storeToRefs(usePlayer)
const { likeMusic, isLike } = useLikeMusic()

// const initPersonalSong = () => {
//     // 如果当前没有播放歌曲,没有播放私人fm
//     if (!player.value.playing && !player.value.isPersonalFM) {
//         // 播放私人fm

//     }
// }
// 删除当前播放下一首
const delete2Next = () => {
}

// 播放下一首
const playNextFmSong = () => {

}
</script>
<style lang="scss" scoped>
.img-wrap {
    height: 272px;
    width: 272px;
    margin-bottom: 50px;
    position: relative;

    .img {
        width: 100%;
        height: 100%;
        background-color: #313131;

        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }

    .pause {
        left: 50%;
        top: 50%;
        @include common-play-btn(55px, 15px, 22px);
    }

    .playing {
        bottom: -10px;
        right: -10px;
        @include common-play-btn(40px, 15px, 22px);

        i {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px
        }
    }

}

.operate-wrap {
    div {
        @include radius(40px);
        margin-right: 40px;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            color: #313131;
        }

        &:hover {
            background-color: #ebebeb;
            cursor: pointer;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
