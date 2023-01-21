<template>
    <div class="footer-wrapper">
        <div class="progressBar">
            <vue-slider v-model="player.progress" :min="0" :max="currentTrackDuration" :interval="1"
                :drag-on-click="true" :duration="0" :dot-size="12" :height="2" tooltip='none' :lazy="true"
                :silent="true"></vue-slider>
        </div>
        <div class="footer-content d-flex ai-center">
            <div class="left d-flex">
                <div class="img mr-10" style="color: white;" v-if="player.enabled">
                    <img :src="player.currentTrack?.al?.picUrl" alt="">
                    <div class="mask-show d-flex ai-center jc-center" @click="changePlayPage" v-show="!isShowPlayPage">
                        <i class="iconfont icon-quanping3-xianxing"></i>
                    </div>
                    <div class="mask-hide d-flex ai-center jc-center" v-show="isShowPlayPage" @click="changePlayPage">
                        <i class="iconfont icon-quanping4-xianxing"></i>
                    </div>
                </div>
                <div class="song-info d-flex flex-column jc-center" v-if="player.enabled">
                    <div class="name" @click="goSinger">
                        <span class="fs-3 text-33">{{ player.currentTrack?.name }}</span>
                        <span class="fs-1 text-97"> - {{
                            player.isPersonalFM ?
                                player.personalFMTrack?.artists[0]?.musicSize : player.currentTrack?.ar[0]?.name
                        }}</span>
                    </div>
                    <div class="time d-flex ai-center fs-1 text-97">
                        <div class="start mr-4">{{ progress }}</div>
                        <div class="mr-4">/</div>
                        <div class="total">{{
                            formatSongTime(player.isPersonalFM ? player.personalFMTrack?.duration
                                : player.currentTrack?.dt)
                        }}</div>
                    </div>
                </div>
            </div>
            <div class="middle d-flex ai-center">
                <!--喜欢-->
                <i class="iconfont icon-24gl-heart fs-9 text-4b mr-30"
                    @click="likeMusic(player.isPersonalFM ? player.personalFMTrack?.id : player.currentTrack?.id, true)"
                    v-show="!isLike">
                </i>
                <i class="iconfont icon-aixin_shixin fs-9 text-primary_red_4 mr-30"
                    @click="likeMusic(player.isPersonalFM ? player.personalFMTrack.id : player.currentTrack.id, false)"
                    v-show="isLike">
                </i>
                <!--上一首-->
                <i class="iconfont icon-diyiyeshouyeshangyishou text-primary_red_4 fs-10 mr-25" @click="playPrevTrack"
                    v-show="!player.isPersonalFM"></i>
                <i class="iconfont icon-diyiyeshouyeshangyishou text-fbg fs-10 mr-25" v-show="player.isPersonalFM"></i>
                <!--播放中-->
                <i class="iconfont icon-zanting2x text-primary_red_4  mr-25" style="font-size: 40px;" @click="musicPlay"
                    v-show="player.playing">
                </i>
                <!--暂停-->
                <i class="iconfont icon-zanting1 text-primary_red_4  mr-25" style="font-size: 40px;" @click="musicPlay"
                    v-show="!player.playing"></i>
                <!--下一首-->
                <i class="iconfont icon-zuihouyiyemoyexiayishou text-primary_red_4 fs-10 mr-30" @click="playNextSong">
                </i>
                <!--删除-->
                <i class="iconfont icon-shanchu text-4b fs-6" v-show="player.isPersonalFM" @click="delete2PlayNext"></i>
                <!--分享-->
                <i class="iconfont icon-fenxiang1 text-3a" v-show="!player.isPersonalFM"
                    @click="Message.error('暂不支持>_<')"></i>
            </div>
            <div class="right text-4b d-flex ai-center mr-15">

                <div class="song-list d-flex ai-center" v-show="!player.isPersonalFM" @click="switchMode">
                    <i class="iconfont icon-24gl-repeatOnce2 text-4b mr-15 fs-7"
                        v-show="player.repeatMode === 'one'"></i>
                    <i class="iconfont icon-24gl-indent text-4b mr-15 fs-5" v-show="player.repeatMode === 'off'"></i>
                    <i class="iconfont icon-24gl-repeat2 text-4b mr-15 fs-7" v-show="player.repeatMode === 'on'"></i>

                </div>
                <i class="iconfont icon-24gl-playlist text-4b mr-15 fs-5" v-show="!player.isPersonalFM"></i>
                <div class="volume" @click="mute">
                    <i class="iconfont icon-24gl-volumeZero text-4b fs-7" v-show="player.volume !== 0"></i>
                    <i class="iconfont icon-24gl-volumeDisable fs-7" v-show="player.volume === 0"></i>

                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VueSlider from 'vue-slider-component'
import "@/assets/slider.css";
import { formatSongTime } from '@/utils';
import { useRoute } from 'vue-router';
import router from '@/router';
import Message from "@/components/message"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const {
    isShowPlayPage,
    isLike,
    player,
    currentTrackDuration,
    likeMusic,
    delete2PlayNext,
    playNextSong,
    mute,
    musicPlay,
    switchMode,
    playPrevTrack
} = useMusicPlayRelation()

const route = useRoute()
withDefaults(defineProps<{
    isShowPlay?: boolean
}>(), {
    isShowPlay: false,
})
const emits = defineEmits<{
    (e: "showPlayPage", id: number): void
}>()

// 播放进度
const progress = computed(() => {
    return timeCalc(player.value.progress * 1000)
})

/**
 * 进度时间格式化
 * @param time
 */
const timeCalc = (time: number) => {
    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor(time / 1000) % 60
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
}

// 更改页面展示
const changePlayPage = () => {
    if (player.value.isPersonalFM && route.path !== '/personal-fm') {
        // 如果是正在播放私人fm的歌曲 并且当前页面不是私人fm
        router.push(`/personal-fm`)
    }
    if (!player.value.isPersonalFM) {
        emits("showPlayPage", player.value.currentTrack.id)
    }
}

// 前往歌手页
const goSinger = () => {
    if (isShowPlayPage.value) {
        isShowPlayPage.value = false
    }
    const singerId = player.value.isPersonalFM ? player.value.personalFMTrack.artists[0].id : player.value.currentTrack.ar[0].id
    if (Number(route.params.id) !== singerId) {
        router.push(`/singer-home/${singerId}`)
    }
}
</script>
<style lang="scss" scoped>
.footer-wrapper {
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: var(--theme-white);

    .progressBar {
        height: 2px;
        // background-color: #d33b31;
    }

    .footer-content {
        height: 100%;
        padding: 0 10px;

        .left {
            .img {
                width: 40px;
                height: 40px;
                position: relative;

                .mask-hide,
                .mask-show {
                    display: none;
                    background-color: rgba($color: #000000, $alpha: 0.2);
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 40px;

                    i {
                        font-size: 35px;
                    }
                }

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }

                &:hover {
                    cursor: pointer;

                    .mask-hide,
                    .mask-show {
                        display: block;
                    }
                }
            }

            .song-info .name:hover {
                cursor: pointer;
                color: var(--theme-4c);
            }
        }

        .middle {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .right {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
