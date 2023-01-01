<template>
    <div class="footer-wrapper">
        <div class="progressBar">
            <vue-slider v-model="player.progress" :min="0" :max="player.currentTrackDuration" :interval="1"
                :drag-on-click="true" :duration="0" :dot-size="12" :height="2" tooltip='none' :lazy="true"
                :silent="true"></vue-slider>
        </div>
        <div class="footer-content d-flex ai-center">
            <div class="left d-flex">
                <div class="img mr-10">
                    <img :src="player.currentTrack?.al?.picUrl" alt="">
                    <div class="mask-show d-flex ai-center jc-center" @click="changePlayPage" v-if="!isShowPlay">
                        <i class="iconfont icon-quanping3-xianxing text-white"></i>
                    </div>
                    <div class="mask-hide d-flex ai-center jc-center" v-if="isShowPlay" @click="changePlayPage">
                        <i class="iconfont icon-quanping4-xianxing text-white"></i>
                    </div>
                </div>
                <div class="song-info d-flex flex-column jc-center">
                    <div class="name">
                        <span class="fs-3">{{ player.currentTrack?.name }}</span>
                        <!-- <span class="fs-1 text-black_6"> - {{ player.currentTrack?.ar[0]?.name }}</span> -->
                    </div>
                    <div class="time d-flex ai-center fs-1 text-black_6">
                        <div class="start mr-4">{{ progress }}</div>
                        {{ player.progress }}
                        <div class="mr-4">/</div>
                        <div class="total">{{ formatSongTime(player.currentTrack?.dt) }}</div>
                    </div>
                </div>
            </div>
            <div class="middle d-flex ai-center">
                <i class="iconfont icon-24gl-heart fs-9 text-4b mr-30"></i>
                <i class="iconfont icon-diyiyeshouyeshangyishou text-primary_red_1 fs-10 mr-25"></i>
                <i class="iconfont icon-zanting2x text-primary_red_1  mr-25" style="font-size: 40px;"
                    @click="player.playOrPause()" v-if="player.playing"></i>
                <i class="iconfont icon-zanting1 text-primary_red_1  mr-25" style="font-size: 40px;"
                    @click="player.playOrPause()" v-if="!player.playing"></i>
                <i class="iconfont icon-zuihouyiyemoyexiayishou text-primary_red_1 fs-10 mr-30"></i>
                <i class="iconfont icon-24gl-trash2 text-4b fs-6" v-if="player.isPersonalFM"></i>
                <i class="iconfont icon-fenxiang1 text-black_1" v-if="!player.isPersonalFM"></i>
            </div>
            <div class="right text-4b d-flex ai-center mr-15">

                <div class="song-list d-flex ai-center" v-if="!player.isPersonalFM" @click="switchMode">
                    <i class="iconfont icon-24gl-repeatOnce2 text-4b mr-15 fs-7" v-if="player.repeatMode === 'one'"></i>
                    <i class="iconfont icon-24gl-indent text-4b mr-15 fs-5" v-if="player.repeatMode === 'off'"></i>
                    <i class="iconfont icon-24gl-repeat2 text-4b mr-15 fs-7" v-if="player.repeatMode === 'on'"></i>

                </div>
                <i class="iconfont icon-24gl-playlist text-4b mr-15 fs-5" v-if="!player.isPersonalFM"></i>
                <div class="volume" @click="player.mute()">
                    <i class="iconfont icon-24gl-volumeZero text-4b fs-7" v-if="player.volume !== 0"></i>
                    <i class="iconfont icon-24gl-volumeDisable fs-7" v-if="player.volume === 0"></i>

                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import VueSlider from 'vue-slider-component'
import "@/assets/slider.css";
import { storeToRefs } from 'pinia';
import usePlayerState from '@/store/player';
import { formatSongTime, initPlayer } from '@/utils';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute()
withDefaults(defineProps<{
    isShowPlay?: boolean
}>(), {
    isShowPlay: false,
})
const emits = defineEmits<{
    (e: "showPlayPage", id: number): void
}>()
// initPlayer()
const { player } = storeToRefs(usePlayerState())
console.log(player, "playerplayerplayerplayer");

const timeCalc = (time: number) => {
    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor(time / 1000) % 60
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
}
const progress = computed(() => {
    console.log("player.value._progress", player.value.progress);

    return timeCalc(player.value.progress * 1000)
})
watch(() => player.value._progress, () => {
    console.log(player.value.progress, "player.value.progress");
})
const switchMode = () => {
    const list = ["one", "on", "off"]
    let index = list.indexOf(player.value.repeatMode)
    player.value.repeatMode = list[++index > 2 ? 0 : index]
}
const changePlayPage = () => {
    if (player.value.isPersonalFM && route.path !== '/personal-fm') {
        // 如果是正在播放私人fm的歌曲 并且当前页面不是私人fm
        router.push(`/personal-fm?id=${player.value.currentTrack.id}`)
    }
    if (!player.value.isPersonalFM) {
        emits("showPlayPage", player.value.currentTrack.id)
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
    background-color: white;

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
