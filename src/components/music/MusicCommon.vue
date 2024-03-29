<template>
    <div class="music-play-wrapper bg-white">

        <div class="music-play-info" :class="{ songListWidth: playType === 'songList' }">
            <PersonalFmMusic v-if="playType === 'personal'"></PersonalFmMusic>
            <SongListMusic v-if="playType === 'songList'"></SongListMusic>
        </div>
        <div class="music-play-body-wrap d-flex" :class="{ songListWidth: playType === 'songList' }">
            <div class="comment-wrap" :class="{ isHaveSide: playType === 'songList' }">
                <SongListComment :is-show-title="true" :source-type="0" :is-show-input-box="false">
                    <template #song-box>
                        <div class="comment-box d-flex ai-center jc-between mb-30" @click="showCommentBox">
                            <div class="left d-flex ai-center pl-8">
                                <i class="iconfont icon-huabi text-c4 fs-7 mr-5"></i>
                                <span class="fs-2 text-c4">发表评论</span>
                            </div>
                            <div class="right d-flex ai-center">
                                <i class="iconfont icon-Smile mr-10 fs-7 text-66"></i>
                                <i class="iconfont icon-aite1 mr-10 fs-7 text-66"></i>
                            </div>
                        </div>
                    </template>
                </SongListComment>
            </div>
            <div class="side-info" v-if="playType === 'songList'">
                <div class="similar">
                    <div class="similar-head mb-10 fs-5 text-33">相似歌曲</div>
                    <div class="simi-item-wrap" v-if="!isShowSimiLoading">
                        <div class="similar-item item d-flex" v-for="item in similarSongList.data" :key="item.id"
                            @click="playSimilarMusic(item.id)">
                            <div class="img">
                                <img :src="formatPicUrl(item?.album?.picUrl, 50, 50)" alt="">
                                <div class="play-btn">
                                    <div class="trangel"></div>
                                </div>
                            </div>
                            <div class="song-info">
                                <div class="name mb-5 fs-3 text-3a">{{ item.name }}</div>
                                <div class="singer text-66 fs-2">{{ item?.artists[0]?.name }}</div>
                            </div>
                        </div>
                    </div>
                    <Loading v-show="isShowSimiLoading"></Loading>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Loading from '../Loading.vue';
import SongListComment from '../song/SongListComment.vue';
import SongListMusic from "./SongListMusic.vue"
import PersonalFmMusic from "./PersoanlFmMusic.vue"
import { reactive, ref, watch } from 'vue';
import Message from "@/components/message"
import { getSimilatSong } from '@/service/api/music';
import { NewMusicRet } from '@/service/api/music/types';
import { checkLogin, formatPicUrl, scrollToTop } from '@/utils';
import { useMusicPlayRelation, } from '@/hooks/useMusicPlayRelation';

const { playSingleMusic, player, isShowLoginBox } = useMusicPlayRelation()
const similarSongList = reactive({ data: [] as NewMusicRet[] })
const isShowSimiLoading = ref(true)

const props = withDefaults(defineProps<
    {
        playType: "personal" | "songList"
        musicId?: number
    }>(), {
    playType: "personal"
})


// 监听当前播放歌曲的变化，更新相似歌曲
watch(() => player.value.currentTrack.id, (newVal) => {
    getSimilatList(newVal)
})

// 获取相似歌曲
const getSimilatList = async (id: number) => {
    isShowSimiLoading.value = true
    const r = await getSimilatSong({ id })
    similarSongList.data = r.songs
    isShowSimiLoading.value = false
}

// 播放相似音乐
const playSimilarMusic = (id: number) => {
    // 滚动到顶部
    scrollToTop("music-play-wrapper")
    playSingleMusic([], id, -1)
}

// 展示评论框
const showCommentBox = () => {
    if (!checkLogin()) return isShowLoginBox.value = true
    Message.publishComment(1, 0, `歌曲: ${player.value.currentTrack.name}`, player.value.currentTrack.id)
}

props.musicId && getSimilatList(props.musicId)
</script>
<style lang="scss" scoped>
.music-play-wrapper {
    margin: auto;

    .songListWidth {
        width: 870px;
        margin: auto;
    }

    .music-play-info {
        height: 450px;
    }

    .music-play-body-wrap {
        margin-top: 70px;

        .comment-wrap {
            width: 730px;

            .comment-box {
                height: 35px;
                border-radius: 5px;
                border: 1px solid var(--theme-dd);
            }

            .top-vote-comment .more {
                border: 1px solid var(--theme-dd);
                padding: 5px 10px;
                width: 120px;
                border-radius: 20px;

                i {
                    color: var(--theme-dd);
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .isHaveSide {
            width: 570px;
            margin-right: 50px;
        }

        .side-info {
            width: calc(100% - 620px);

            .item {
                height: 60px;
                padding: 4px;
                border-radius: 5px;

                &:hover {
                    background-color: var(--theme-ed);
                }

                .img {
                    width: 50px;
                    height: 50px;
                    border-radius: 6px;
                    margin-right: 10px;
                    overflow: hidden;

                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .play-btn {
                        @include common-play-btn(20px, 5px, 8px);
                        top: 50%;
                        left: 50%;
                    }
                }

                .name {
                    @include no-wrap(170px);
                }

            }
        }

    }
}
</style>
