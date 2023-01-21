<template>
    <CommonHead play-type="personal">
        <template #img-wrap>
            <div class="img-wrap">
                <div class="img">
                    <img :src="formatPicUrl(player.personalFMTrack.album.picUrl, 270, 270)" alt="">

                </div>
                <div class="playing" v-show="player.isPersonalFM && player.playing" @click="musicPlay()">
                    <i class="iconfont icon-zanting01 text-primary_red_4"></i>
                </div>
                <div class="pause" v-show="player.isPersonalFM && !player.playing" @click="musicPlay()">
                    <div class="trangel"></div>
                </div>
            </div>
        </template>
        <template #operate-wrap>
            <div class="operate-wrap d-flex ai-center text-4b">
                <div class="collect" @click="likeMusic(player.currentTrack.id, !isLike)">
                    <i class="iconfont icon-aixin fs-9 text-4b" v-show="!isLike"></i>
                    <i class="iconfont icon-aixin_shixin fs-9 text-primary_red_4" style="color: #c3473a"
                        v-show="isLike"></i>
                </div>
                <div class="delete" @click="delete2PlayNext()">
                    <i class="iconfont icon-shanchu fs-9"></i>
                </div>
                <div class="next" @click="playNextSong">
                    <i class="iconfont icon-xiayigexiayishou fs-7"></i>
                </div>
                <div class="other" @click="Message.error('暂不支持')">
                    <i class="iconfont icon-shenglvehao fs-9"></i>
                </div>
            </div>
        </template>
    </CommonHead>
</template>

<script lang="ts" setup>
import CommonHead from './CommonHead.vue';
import Message from "@/components/message"
import { onMounted } from 'vue';
import { formatPicUrl } from '@/utils';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const { likeMusic, isLike, player, delete2PlayNext, playPersonalFm, playNextSong, musicPlay } = useMusicPlayRelation()
const emits = defineEmits<{
    (e: "getPersonalComment", id: number): void
}>()
const initPersonalSong = () => {
    // 如果当前没有播放歌曲 && 不是私人fm
    if (!player.value.playing && !player.value.isPersonalFM) {
        // 播放私人fm
        playPersonalFm()
    }
    // 如果当前正在播放

    // 加载评论
    emits("getPersonalComment", player.value.personalFMTrack.id)
}

// initPersonalSong()
onMounted(() => {
    initPersonalSong()
})
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
        // background-color: #313131;

        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
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
        background-color: var(--theme-f5);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            color: var(--theme-31);
        }

        &:hover {
            background-color: var(--theme-eb);
            cursor: pointer;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
