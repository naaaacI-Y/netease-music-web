<template>
    <!--播放页面 私人fm以及歌单-->
    <div class="music-play-wrapper bg-white">
        <div class="music-play-info" :class="{ songListWidth: playType === 'songList' }">
            <PersonalFmMusic v-if="playType === 'personal'"></PersonalFmMusic>
            <SongListMusic v-if="playType === 'songList'"></SongListMusic>
        </div>
        <div class="music-play-body-wrap d-flex" :class="{ songListWidth: playType === 'songList' }">
            <div class="comment-wrap" :class="{ isHaveSide: playType === 'songList' }">
                <div class="comment-box-wrap">
                    <div class="head mb-10">
                        <span class="fs-5 mr-15 text-33">听友评论</span>
                        <span class="fs-1 text-66">(已有{{ totalComments }}条评论)</span>
                    </div>
                    <div class="comment-box d-flex ai-center jc-between mb-30">
                        <div class="left d-flex ai-center pl-8">
                            <i class="iconfont icon-huabi text-c4 fs-7 mr-5"></i>
                            <span class="fs-2 text-c4">发表评论</span>
                        </div>
                        <div class="right d-flex ai-center">
                            <i class="iconfont icon-Smile mr-10 fs-7 text-66"></i>
                            <i class="iconfont icon-aite1 mr-10 fs-7 text-66"></i>
                        </div>
                    </div>
                    <div class="top-vote-comment mt-20">
                        <div class="comment-label text-33 mb-15 fs-4">精彩评论</div>
                        <CommentItem v-for="item in hotComments.data.slice(0, 10)" :key="item.commentId"
                            :comment-content="item"></CommentItem>
                        <div class="more-wrap d-flex ai-center jc-center">
                            <div class="more d-flex ai-center" v-if="hasMoreHot" @click="goMoreHotComment">
                                <span class="fs-2 mr-5 text-33">更多精彩评论</span>
                                <i class="iconfont icon-xiangyou1 fs-4"></i>
                            </div>
                        </div>
                    </div>
                    <div class="new-comment mt-30">
                        <div class="comment-label text-33 mb-15 fs-4">最新评论</div>
                        <CommentItem v-for="item in allComments.data" :key="item.commentId" :comment-content="item">
                        </CommentItem>
                    </div>
                </div>
            </div>
            <div class="side-info" v-if="playType === 'songList'">
                <div class="include mb-30">
                    <div class="include-head mb-10 fs-5 text-33">包含这首歌的歌单</div>
                    <div class="include-item item d-flex" v-for="itme in 3">
                        <div class="img">

                        </div>
                        <div class="song-info d-flex jc-center flex-column">
                            <div class="name mb-5 fs-3 text-33">歌曲名称歌曲名称歌曲名称歌曲名称</div>
                            <div class="play-count d-flex ai-center">
                                <i class="iconfont icon-bofang1 text-66 mr-2 fs-6"></i>
                                <span class="text-66 fs-2">1000万</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="similar">
                    <div class="similar-head mb-10 fs-5 text-33">相似歌曲</div>
                    <div class="similar-item item d-flex" v-for="item in similarSongList.data">
                        <div class="img">
                            <img :src="item?.album?.picUrl" alt="">
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
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import CommentItem from '../CommentItem.vue';
import SongListMusic from "./SongListMusic.vue"
import PersonalFmMusic from "./PersoanlFmMusic.vue"
import { computed, reactive, ref } from 'vue';
import { getComment, getSimilatSong } from '@/service/api/music';
import { NewMusicRet } from '@/service/api/music/types';
import { Comment, HotComment } from '@/service/api/comment/types';

const props = withDefaults(defineProps<
    {
        playType: "personal" | "songList"
        musicId?: number
    }>(), {
    playType: "personal"
})
const width = computed(() => {
    if (props.playType === "personal") {
        return 730
    }
    return 870
})
const totalComments = ref(0)
const hasMoreHot = ref(false)
const similarSongList = reactive({ data: [] as NewMusicRet[] })
const hotComments = reactive({ data: [] as HotComment[] })
const allComments = reactive({ data: [] as Comment[] })
// 获取相似歌曲
const getSimilatList = async () => {
    const r = await getSimilatSong({ id: props.musicId! })
    similarSongList.data = r.songs
}
// 前往更多热评
const goMoreHotComment = () => {

}
// 获取评论
const getComments = async () => {
    const r = await getComment({ id: props.musicId! })
    hotComments.data = r.hotComments
    allComments.data = r.comments
    totalComments.value = r.total
    hasMoreHot.value = r.moreHot
}
props.musicId && getSimilatList()
getComments()
// const playType: Ref<"personal" | "songList"> = ref("songList")
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

            .comment-box-wrap {
                .comment-box {
                    height: 35px;
                    border-radius: 5px;
                    border: 1px solid var(--theme-dd);
                }
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
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        @include radius(20px);
                        background-color: rgba($color: #bebebb, $alpha: 0.6);
                        transform: translate(-50%, -50%);

                        .trangel {
                            width: 0;
                            height: 0;
                            position: absolute;
                            border-top: 5px solid transparent;
                            border-bottom: 5px solid transparent;
                            border-left: 8px solid #d33b31;
                            left: 50%;
                            top: 50%;
                            transform: translate(-30%, -50%);
                        }
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
