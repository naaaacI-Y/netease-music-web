<template>
    <DefaultLayout>
        <div class="video-detail-wrapper d-flex">
            <div class="video-detail-left mr-20">
                <div class="video-wrap mb-30">
                    <div class="nav-title mb-15 text-33">
                        <i class="iconfont "></i>
                        <span style="font-weight: bold;">MV详情</span>
                    </div>
                    <div class="play-box mb-20">
                        <video ref="videoPlayerEle" class="plyr"></video>
                    </div>
                    <div class="singer-info-wrap">
                        <div class="avatar-info d-flex ai-center mb-20" @click="goCreator(mvDetailInfo.data.artistId)">
                            <div class="avatar mr-10" v-if="mvDetailInfo.data && mvDetailInfo.data?.artists?.length">
                                <LazyLoadImg :src="mvDetailInfo.data?.artists[0]?.img1v1Url"></LazyLoadImg>
                            </div>
                            <div class="name fs-3 text-66">{{ mvDetailInfo.data.artistName }}</div>
                        </div>
                        <div class="mv-title mb-10 text-33" style="font-size: 22px;font-weight: bold">{{
                            mvDetailInfo.data.name
                        }}</div>
                        <div class="count-info d-flex fs-1 text-bc mb-12">
                            <div class="pubtime mr-25">
                                <span>发布：</span>
                                <span>{{ mvDetailInfo.data.publishTime }}</span>
                            </div>
                            <div class="plat-time">
                                <span>播放：</span>
                                <span>{{ formatPlayCount(mvDetailInfo.data.playCount) }}次</span>
                            </div>
                        </div>
                        <div class="label-list d-flex mb-25" v-if="mvDetailInfo.data.videoGroup?.length">
                            <div class="label-item fs-1 mr-5 bg-f6 text-66"
                                @click="goVideoByCategory(item.id, item.name)"
                                v-for="item in mvDetailInfo.data.videoGroup">{{ item.name }}</div>
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
                            <div class="share d-flex ai-center jc-center fs-3" @click="Message.error('暂不支持>_<')">
                                <i class="iconfont icon-fenxiang1 fs-5"></i>
                                分享
                                <span>({{ mvDetailInfo.data.shareCount }})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-wrap">
                    <SongListComment :source-type="1" :is-show-title="true"></SongListComment>
                </div>
            </div>
            <div class="video-detail-right">
                <div class="recommend-title mb-15 text-33" style="font-weight: bold;">相关推荐</div>
                <div class="recommend-list">
                    <div class="recomment-item d-flex mb-10" v-for="item in similarMVList.data" :key="item.id"
                        @click="goVideoDetail(item.id)">
                        <div class="mv-img mr-8 text-white fs-1" style="color: white;">
                            <LazyLoadImg :src="formatPicUrl(item.cover, 140, 85)" v-if="item.cover"
                                :padding-bottom="61"></LazyLoadImg>
                            <div class="play-count d-flex ai-center">
                                <i class="iconfont icon-bofang1"></i>
                                <span>{{ formatPlayCount(item.playCount) }}</span>
                            </div>
                            <div class="time">{{ formatSongTime(item.duration) }}</div>
                        </div>
                        <div class="item-info d-flex flex-column jc-center">
                            <div class="name mb-10 fs-2 text-33">{{ item.name }}</div>
                            <div class="author fs-1 d-flex">
                                <span class="text-66 mr-5">by</span>
                                <span class="text-bc" @click.stop="goCreator(item.artistId)">{{
                                    item.artistName
                                }}</span>
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
import { getMvUrl, getMvDetail, getSimilarMv } from "@/service/api/mv"
import { Mv, MvDetailRet } from '@/service/api/mv/types';
import { formatPicUrl, formatPlayCount, formatSongTime } from '@/utils';
import Message from "@/components/message"
import '@/assets/plyr.css';
import { onBeforeRouteUpdate, useRouter } from "vue-router"
import { useInitVideoPlayer } from '@/hooks/useInitVideoPlayer';
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
const mvDetailInfo = reactive({ data: {} as MvDetailRet }) // 详情
const similarMVList = reactive({ data: [] as Mv[] }) // 相似mv
const videoPlayerEle = ref<HTMLElement>()

// 在当前路由改变，但是该组件被复用时调用
onBeforeRouteUpdate((to, from, next) => {
    const id = Number(to.params.id)
    getDetail4Mv(id)
    getIsSubscribed(id)
    getIsVoted(1, id)
    next()
})
// 前往mv
const goVideoByCategory = (id: number, name: string) => {
    // router.push(``)
}
// mv详情
const getDetail4Mv = async (id: number) => {
    const r = await getMvDetail({ mvid: id })
    mvDetailInfo.data = r.data
    subsCount.value = r.data.subCount
    const requests = r.data.brs.map(br => {
        return getMvUrl({ id, r: br.br })
    })
    Promise.all(requests).then(results => {
        let sources = results.map(result => {
            return {
                src: result.data.url.replace(/^http:/, 'https:'),
                type: 'video/mp4',
                size: result.data.r,
            };
        });
        videoPlayer.data.source = {
            type: 'video',
            title: mvDetailInfo.data.name,
            sources: sources,
            poster: mvDetailInfo.data.cover.replace(/^http:/, 'https:'),
        };
    })
    getSimilar(id)
}


// 相似mv
const getSimilar = async (id: number) => {
    const r = await getSimilarMv({ mvid: id })
    similarMVList.data = r.mvs
}

// mv详情
const goVideoDetail = (id: number) => {
    router.push(`/mv-detail/${id}`)
}

//作者页面
const goCreator = (id: number) => {
    router.push(`/singer-home/${id}`)
}

onMounted(() => {
    initVideoPlayer(getDetail4Mv, Number(queryId), videoPlayerEle.value!)
})
// 没有登陆就不请求 TODO
getIsSubscribed(Number(queryId))
getIsVoted(1, queryId)
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
                    top: 5px;
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
