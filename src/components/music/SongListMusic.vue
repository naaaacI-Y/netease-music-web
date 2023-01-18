<template>
    <commonHead play-type="songList">
        <template #img-wrap>
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
        </template>
        <template #operate-wrap>
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
        </template>
    </commonHead>
</template>

<script lang="ts" setup>
import commonHead from './commonHead.vue';
import Message from "@/components/message"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const { likeMusic, isLike, player } = useMusicPlayRelation()
// 收藏、下载、分享暂不支持
const noSupport = () => {
    Message.error("暂不支持")
}

</script>
<style lang="scss" scoped>
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
