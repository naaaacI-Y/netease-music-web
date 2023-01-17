<template>
    <div class="song-list-music-wrapper d-flex">
        <div class="music-left d-flex flex-column jc-end ai-center">
            <div class="img-wrap">
                <div class="niddle" :class="player.playing ? '' : 'no-play'"></div>
                <div class="pan">
                    <div class="card">
                        <div class="imageWrapper">
                            <div class="img" :class="player.playing ? 'rotateCircle' : ''">
                                <img :src="player.currentTrack?.al?.picUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate-wrap d-flex ai-center">
                <div class="like" @click="likeMusic(player.currentTrack.id, !isLike)">
                    <i class="iconfont icon-aixin fs-9 text-4b" v-show="!isLike"></i>
                    <i class="iconfont icon-aixin_shixin fs-9 text-primary_red_4" style="color: #c3473a"
                        v-show="isLike"></i>
                </div>
                <div class="collect" @click="noSupport">
                    <i class="iconfont icon-xinjianwenjianjia fs-9"></i>
                </div>
                <div class="donwnload" @click="noSupport">
                    <i class="iconfont icon-xiazai fs-9"></i>
                </div>
                <div class="share" @click="noSupport">
                    <i class="iconfont icon-fenxiang fs-9"></i>
                </div>
            </div>
        </div>
        <div class="music-right">
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
            <div class="lyric">
                <div class="lyric-item fs-3 text-66 mb-10" v-for="(item, index) in lyric.data.lyric" :key="item.time">
                    {{ item.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getLyric } from '@/service/api/music';
import useStore from '@/store';
import { lyricParser } from '@/utils/lyrics';
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';

import Message from "@/components/message"
import useLikeMusic from '@/hooks/useLikeMusic';
const { likeMusic } = useLikeMusic()

const { usePlayer } = useStore()
const { player, likedList } = storeToRefs(usePlayer)
const lyric = reactive({ data: {} as { lyric: any[], tlyric: any[] } })

const isLike = computed(() => {
    return likedList.value.includes(player.value.currentTrack.id)
})
const getlyric = async () => {
    const r = await getLyric({ id: player.value.currentTrack.id })
    lyric.data = lyricParser(r)
    console.log(JSON.stringify(lyric.data));
}

// 收藏、下载、分享暂不支持
const noSupport = () => {
    Message.error("暂不支持")
}
getlyric()
</script>
<style lang="scss" scoped>
.song-list-music-wrapper {
    height: 450px;

    .music-left {
        width: 335px;
        margin-right: 75px;
        // border: 1px solid black;

        .img-wrap {
            height: 335px;
            width: 100%;
            margin-bottom: 20px;
            position: relative;

            .pan {
                width: 335px;
                // margin-top: 75px;
                background-color: var(--theme-e3);
                border-radius: 50%;
                overflow: hidden;
                height: 335px;
                @include flex(row, center, center);

                .card {
                    width: 315px;
                    height: 315px;
                    border-radius: 50%;
                    background-size: 100% 100%;
                    background-image: url('../../assets/images/ic_disc.png');
                    @include flex(row, center, center);

                    .imageWrapper {
                        @include flex(row, center, center);
                        width: 220px;
                        background-color: black;
                        height: 220px;
                        border-radius: 50%;

                        .img {
                            @include flex(row, center, center);
                            width: 205px;
                            height: 205px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: 100%
                            }
                        }

                        .rotateCircle {
                            animation: rot 20s infinite linear;
                        }

                        @keyframes rot {
                            from {
                                transform: rotate(0deg);
                            }

                            to {
                                transform: rotate(360deg);
                            }
                        }
                    }
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

    }

    .music-right {
        padding-top: 50px;
        width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;

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


        .other-info {
            div {
                width: 33.33333%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
