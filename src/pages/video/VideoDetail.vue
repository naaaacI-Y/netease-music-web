<template>
    <DefaultLayout>
        <div class="video-detail-wrapper d-flex">
            <div class="video-detail-left mr-20">
                <div class="video-wrap mb-30">
                    <div class="nav-title mb-15 text-33">
                        <i class="iconfont "></i>
                        <span style="font-weight: bold;">视频详情</span>
                    </div>
                    <div class="play-box mb-20">
                        <video ref="videoPlayerEle" class="plyr"></video>
                    </div>
                    <div class="singer-info-wrap">
                        <div class="avatar-info d-flex ai-center mb-20"
                            @click="goCreatorPage(videoDetailInfo.data.creator.userId)">
                            <div class="avatar mr-10" v-if="videoDetailInfo.data && videoDetailInfo.data?.avatarUrl">
                                <LazyLoadImg :src="videoDetailInfo.data?.avatarUrl"></LazyLoadImg>
                            </div>
                            <div class="name fs-3 text-66">{{ videoDetailInfo.data?.creator?.nickname }}</div>
                        </div>
                        <div class="mv-title mb-10 text-33" style="font-size: 22px;font-weight: bold">{{
                            videoDetailInfo.data.title
                        }}</div>
                        <div class="count-info d-flex fs-1 text-bc mb-12">
                            <div class="pubtime mr-25">
                                <span>发布：</span>
                                <span>{{ videoDetailInfo.data.publishTime }}</span>
                            </div>
                            <div class="plat-time">
                                <span>播放：</span>
                                <span>{{ formatPlayCount(videoDetailInfo.data.playTime) }}次</span>
                            </div>
                        </div>
                        <div class="label-list d-flex mb-25" v-if="videoDetailInfo.data.videoGroup?.length">
                            <div class="label-item fs-1 mr-5 bg-f6 text-66"
                                @click="goVideoByCategory(item.id, item.name)"
                                v-for="item in videoDetailInfo.data.videoGroup">{{ item.name }}</div>
                        </div>
                        <div class="operate d-flex ai-center text-33">
                            <div class="vote d-flex ai-center jc-center fs-3 mr-12" @click="voteVideo">
                                <i class="iconfont icon-dianzan1 fs-8 mr-4"
                                    :style="{ color: isLiked ? '#c3473a' : '' }"></i>
                                <span> {{ isLiked? "已赞": "赞" }}</span>
                                <span v-if="likeCount">({{ likeCount }})</span>
                            </div>
                            <div class="collect d-flex ai-center jc-center fs-3 mr-12" @click="collectVideoOrMv">
                                <i class="iconfont icon-xinjianwenjianjia mr-4 fs-8" v-if="!isSubscribe"></i>
                                <i class="iconfont icon-gou- mr-4 fs-8" v-if="isSubscribe"></i>
                                <span>{{ isSubscribe? "已收藏": "收藏" }}</span>
                                <span v-if="subsCount">({{ subsCount }})</span>
                            </div>
                            <!-- <div class="share d-flex ai-center jc-center fs-3">
                                <i class="iconfont icon-fenxiang1 fs-5"></i>
                                分享
                                <span>({{ videoDetailInfo.data.shareCount }})</span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="comment-wrap">
                    <SongListComment :source-type="5" :is-show-title="true"></SongListComment>
                </div>
            </div>
            <div class="video-detail-right">
                <div class="recommend-title mb-15 text-33" style="font-weight: bold;">相关推荐</div>
                <div class="recommend-list">
                    <div class="recomment-item d-flex mb-10" v-for="item in similarVideoList.data" :key="item.vid"
                        @click="goVideoDetail(item.vid)">
                        <div class="mv-img mr-8  fs-1" style="color: white;">
                            <LazyLoadImg :src="formatPicUrl(item.coverUrl, 140, 85)" v-if="item.coverUrl"
                                :padding-bottom="61"></LazyLoadImg>
                            <div class="play-count d-flex ai-center">
                                <i class="iconfont icon-bofang1 "></i>
                                <span>{{ formatPlayCount(item.playTime) }}</span>
                            </div>
                            <div class="time ">{{ formatSongTime(item.durationms) }}</div>
                        </div>
                        <div class="item-info d-flex flex-column jc-center">
                            <div class="name mb-10 fs-2 text-33">{{ item.title }}</div>
                            <div class="author fs-1 d-flex" @click.stop="goCreatorPage(item.creator[0]?.userId)">
                                <span class="text-66 mr-5">by</span>
                                <span class="text-bc" v-if="item.creator">{{ item.creator[0]?.userName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongListComment from '@/components/song/SongListComment.vue';
import LazyLoadImg from '@/components/LazyLoadImg.vue';
import { getRelatedVideo, getVideoDetail, getVideoPlayUrl, getVieoCountInfo } from "@/service/api/video"
import { formatPicUrl, formatPlayCount, formatSongTime } from '@/utils';
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import { RelatedVideoRet, VideoDetailRet } from '@/service/api/video/types';
import { useInitVideoPlayer } from '@/hooks/useInitVideoPlayer';
import '@/assets/plyr.css';
import { useVideoVoteAndCollect } from '@/hooks/useVideoVoteAndCollect';
const {
    getIsSubscribed,
    subsCount,
    collectVideoOrMv,
    voteVideo,
    getIsVoted,
    isLiked,
    likeCount,
    isSubscribe,
    queryId
} = useVideoVoteAndCollect()
const { videoPlayer, initVideoPlayer } = useInitVideoPlayer()
const router = useRouter()
const videoDetailInfo = reactive({ data: {} as VideoDetailRet }) // 详情
const similarVideoList = reactive({ data: [] as RelatedVideoRet[] }) // 相似mv
const videoPlayerEle = ref<HTMLElement>()
// 在当前路由改变，但是该组件被复用时调用
onBeforeRouteUpdate((to, from, next) => {
    const id = to.params.id as string
    getDetail4Video(id)
    getIsSubscribed(id)
    getIsVoted(2, id)
    next()
})
// 前往视频
const goVideoByCategory = (id: number, name: string) => {
    // router.push(``)
}
// 获取视频详情
const getDetail4Video = async (id: string) => {
    const r = await getVideoDetail({ id })
    videoDetailInfo.data = r.data
    subsCount.value = r.data.subscribeCount
    const urlInfo = await getVideoPlayUrl({ id })
    const sources = urlInfo.urls.map(url => {
        return {
            src: url.url.replace(/^http:/, 'https:'),
            type: 'video/mp4',
            size: url.size,
        }
    })
    videoPlayer.data.source = {
        type: 'video',
        title: videoDetailInfo.data.title,
        sources: sources,
        poster: videoDetailInfo.data.coverUrl.replace(/^http:/, 'https:'),
    };
    getSimilar(id)
}


// 相似mv
const getSimilar = async (id: string) => {
    const r = await getRelatedVideo({ id })
    similarVideoList.data = r.data
}

// 前往视频详情页
const goVideoDetail = (id: string) => {
    router.push(`/video-detail/${id}`)
}

// 前往作者界面
const goCreatorPage = (id: number) => {
    router.push(`/personal-center/${id}`)
}

onMounted(() => {
    initVideoPlayer(getDetail4Video, queryId, videoPlayerEle.value!)
})
getIsSubscribed(queryId)
getIsVoted(2, queryId)
</script>
<style lang="scss" scoped>
.video-detail-wrapper {
    width: 960px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 100px;

    .video-detail-left {
        .video-wrap {
            .play-box {
                width: 620px;
                height: 350px;
                border-radius: 10px;
                background-color: #000;
            }

            .singer-info-wrap {
                .avatar {
                    @include radius(50px);
                    // background-color: aqua;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .label-list {
                    .label-item {
                        padding: 2px 5px;
                        border-radius: 10px;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .operate {
                    div {
                        padding: 5px 20px;
                        border: 1px solid var(--theme-e5);
                        border-radius: 20px;

                        &:hover {
                            background-color: var(--theme-f2);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .video-detail-right {
        width: calc(100% - 650px);

        .recomment-item {
            .mv-img {
                width: 140px;
                height: 78px;
                border-radius: 5px;
                // background-color: aqua;
                position: relative;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }

                .play-count {
                    position: absolute;
                    top: 0px;
                    right: 7px;
                }

                .time {
                    position: absolute;
                    bottom: 5px;
                    right: 7px;
                }
            }

            .item-info {
                .name {
                    width: 160px;
                    @include multiEllipsis;
                }

                .author span:last-child:hover {
                    cursor: pointer;
                    color: var(--theme-66);
                }
            }
        }
    }

}
</style>
