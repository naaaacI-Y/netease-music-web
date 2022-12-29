<template>
    <DefaultLayout>
        <div class="video-detail-wrapper d-flex">
            <div class="video-detail-left mr-20">
                <div class="video-wrap mb-30">
                    <div class="nav-title mb-15">
                        <i class="iconfont "></i>
                        <span style="font-weight: bold;">MV详情</span>
                    </div>
                    <div class="play-box mb-20"></div>
                    <div class="singer-info-wrap">
                        <div class="avatar-info d-flex ai-center mb-20">
                            <div class="avatar mr-10" v-if="mvDetailInfo.data && mvDetailInfo.data?.artists?.length">
                                <LazyLoadImg :src="mvDetailInfo.data?.artists[0]?.img1v1Url"></LazyLoadImg>
                            </div>
                            <div class="name fs-3 text-66">{{ mvDetailInfo.data.artistName }}</div>
                        </div>
                        <div class="mv-title mb-10" style="font-size: 22px;font-weight: bold">{{ mvDetailInfo.data.name
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
                            <div class="label-item fs-1 mr-5 bg-black_11 text-66"
                                v-for="item in mvDetailInfo.data.videoGroup">{{ item }}</div>
                        </div>
                        <div class="operate d-flex ai-center text-black_1">
                            <div class="vote d-flex ai-center jc-center fs-3 mr-12">
                                <i class="iconfont icon-dianzan1 fs-8 mr-4"></i>
                                赞
                                <span>({{ mvDetailInfo.data.subCount }})</span>
                            </div>
                            <div class="collect d-flex ai-center jc-center fs-3 mr-12">
                                <i class="iconfont icon-xinjianwenjianjia mr-4 fs-8"></i>
                                收藏
                                <span>({{ mvDetailInfo.data.subCount }})</span>
                            </div>
                            <div class="share d-flex ai-center jc-center fs-3">
                                <i class="iconfont icon-fenxiang1 fs-5"></i>
                                分享
                                <span>({{ mvDetailInfo.data.shareCount }})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-wrap">
                    <SongListComment :source-type="1"></SongListComment>
                </div>
            </div>
            <div class="video-detail-right">
                <div class="recommend-title mb-15" style="font-weight: bold;">相关推荐</div>
                <div class="recommend-list">
                    <div class="recomment-item d-flex mb-10" v-for="item in similarMVList.data" :key="item.id">
                        <div class="mv-img mr-8 text-white fs-1">
                            <LazyLoadImg :src="item.cover" v-if="item.cover"></LazyLoadImg>
                            <div class="play-count">
                                <i class=""></i>
                                <span>{{ formatPlayCount(item.playCount) }}</span>
                            </div>
                            <div class="time text-white">{{ formatSongTime(item.duration) }}</div>
                        </div>
                        <div class="item-info d-flex flex-column jc-center">
                            <div class="name mb-10 fs-2 text-balck_1">{{ item.name }}</div>
                            <div class="author fs-1 d-flex">
                                <span class="text-66 mr-5">by</span>
                                <span class="text-bc">{{ item.artistName }}</span>
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
import { Comment } from "@/service/api/comment/types"
import { getMvUrl, getMvInfo, getMvDetail, getSimilarMv, getMVComment } from "@/service/api/mv"
import { HotComment, Mv, MvDetailRet, MvInfoResult, MvUrlRet } from '@/service/api/mv/types';
import { formatPlayCount, formatSongTime, getQueryId } from '@/utils';
import { reactive, ref } from 'vue';
const queryId = getQueryId()
const mvDetailInfo = reactive({ data: {} as MvDetailRet }) // 详情
const similarMVList = reactive({ data: [] as Mv[] }) // 相似mv
const mvPlayInfo = reactive({ data: {} as MvUrlRet }) // mv播放url相关信息
const loadingPic = ref("") // 加载封面
const hotComments = reactive({ data: [] as HotComment[] })
const allComments = reactive({ data: [] as Comment[] })
// mv详情
const getDetail = async () => {
    const r = await getMvDetail({ mvid: queryId })
    loadingPic.value = r.loadingPic
    mvDetailInfo.data = r.data
}
const getComment = async () => {
    const r = await getMVComment({ id: queryId })
    hotComments.data = r.hotComments
    allComments.data = r.comments
}
// 相似mv
const getSimilar = async () => {
    const r = await getSimilarMv({ mvid: queryId })
    similarMVList.data = r.mvs
}
const getMVUrl = async () => {
    const r = await getMvUrl({ id: queryId })
    mvPlayInfo.data = r.data
}
getDetail()
getSimilar()
// getMvCountInfo()
getMVUrl()
getComment()
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
                background-color: aqua;
            }

            .singer-info-wrap {
                .avatar {
                    @include radius(50px);
                    background-color: aqua;

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
                        border: 1px solid #eee;
                        border-radius: 20px;

                        &:hover {
                            background-color: #f2f2f2;
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
                background-color: aqua;
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
                    color: #666;
                }
            }
        }
    }

}
</style>
