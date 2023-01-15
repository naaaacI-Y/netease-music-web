import { BeReplied, User, Comment, HotComment, list } from '../comment/types';
import { MVItem } from './../mv/types';
import { getVideoPlayUrl } from './index';
export interface VideoGroupItem {
    id: number;
    name: string;
    url?: any;
    relatedVideoType?: any;
    selectTab: boolean;
    abExtInfo?: any;
}
export interface VideoGroupListResult {
    code: number
    message: string
    data: VideoGroupItem[]
}



// 相关视频
export interface RelatedVideoParams {
    id: string
}

export interface Creator {
    authStatus?: number;
    followed?: boolean;
    accountStatus?: number;
    userId: number;
    userType?: number;
    nickname: string;
    avatarUrl?: string;
    expertTags?: any;
    experts?: object;
    avatarDetail?: AvatarDetail;
}

export interface RelatedVideoRet {
    alg: string;
    type: number;
    title: string;
    durationms: number;
    creator: Creator[];
    playTime: number;
    coverUrl: string;
    vid: string;
    aliaName?: any;
    transName?: any;
    markTypes: any[];
    liveRoom?: any;
}

export interface RelatedVideoResult {
    code: number;
    message: string;
    data: RelatedVideoRet[];
}


// 视频详情
export interface AvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}



export interface Resolution {
    size: number;
    resolution: number;
}

export interface VideoGroup {
    id: number;
    name: string;
    alg?: any;
}

export interface VideoDetailRet {
    vid: string;
    creator: Creator;
    coverUrl: string;
    title: string;
    description: string;
    durationms: number;
    threadId: string;
    playTime: number;
    praisedCount: number;
    commentCount: number;
    shareCount: number;
    subscribeCount: number;
    publishTime: number;
    avatarUrl: string;
    width: number;
    height: number;
    resolutions: Resolution[];
    videoGroup: VideoGroup[];
    hasRelatedGameAd: boolean;
    advertisement: boolean;
    authType: number;
    markTypes: any[];
    videoUserLiveInfo?: any;
}

export interface VideoDetailResult {
    code: number;
    data: VideoDetailRet;
    message: string;
}



// 视频点赞转发评论数数据
export interface VideoCountInfoParam {
    vid: string
}
export interface VideoCountInfo {
    likedCount: number;
    shareCount: number;
    commentCount: number;
    liked: boolean;
    code: number;
}


// 获取视频播放地址
export interface Url {
    id: string;
    url: string;
    size: number;
    validityTime: number;
    needPay: boolean;
    payInfo?: any;
    r: number;
}

export interface VideoPlayUrlResult {
    urls: Url[];
    code: number;
}

// 获取视频标签/分类下的视频
export interface VideoByCategoryParam {
    id: number
    offset?: number
}
export interface VideoByCategoryResult {
    code: number
    count: number
    data: MVItem[]
    hasMore: boolean
}




export interface Resolution {
    resolution: number;
    size: number;
}

export interface Expert {
    1: string;
}

export interface VideoCreator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags?: any;
    experts: Expert;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
}

export interface VideoGroup {
    id: number;
    name: string;
    alg?: any;
}

export interface VideoByCategoryItem {
    alg: string;
    scm: string;
    threadId: string;
    coverUrl: string;
    id?: string // 新增id属性，为了scroller格式化数据

    height: number;
    width: number;
    title: string;
    description: string;
    commentCount: number;
    shareCount: number;
    resolutions: Resolution[];
    creator: VideoCreator;
    urlInfo?: any;
    videoGroup: VideoGroup[];
    previewUrl: string;
    previewDurationms: number;
    hasRelatedGameAd: boolean;
    markTypes?: any;
    relateSong: any[];
    relatedInfo?: any;
    videoUserLiveInfo?: any;
    vid: string;
    durationms: number;
    playTime: number;
    praisedCount: number;
    praised: boolean;
    subscribed: boolean;
}

export interface VideoByCategoryRet {
    type: number;
    displayed: boolean;
    alg: string;
    extAlg?: any;
    data: VideoByCategoryItem;
}

export interface VideoByCategoryResult {
    msg: string;
    code: number;
    hasmore: boolean;
    datas: VideoByCategoryRet[];
    rcmdLimit: number;
}


// 视频评论
export interface VideoCommentParams {
    id: string
    limit?: number
    offset?: number
    before?: number
}

export interface VideoCommentResult {
    isMusician: boolean;
    cnum: number;
    userId: number;
    topComments: any[];
    moreHot: boolean;
    hotComments: HotComment[];
    commentBanner?: any;
    code: number;
    comments: Comment[];
    total: number;
    more: boolean;
}

// 获取收藏的视频
export interface CollectedVideoDataCreator {
    userId: number;
    userName: string;
}
export interface CollectedVideoData {
    type: number;
    title: string;
    id?: string
    durationms: number;
    creator: CollectedVideoDataCreator[];
    playTime: number;
    coverUrl: string;
    vid: string;
    aliaName?: any;
    transName?: any;
    alg?: any;
    markTypes?: any[];
}
export interface CollectedVideoResult {
    code: number;
    data: CollectedVideoData[];
    hasMore: boolean;
    count: number;
}

// 视频点赞
export interface VoteToVideoParams {
    id: string | number
    type: list
    t: 0 | 1

}

export interface VoteToVideoResult {
    code: number
}

// 视频收藏
export interface CollectOrCancelVideoParams {
    t: 0 | 1
    id: string
}
export interface CollectOrCancelVideoResult {
    code: number
}
// mv收藏
export interface CollectOrCancelMvParams {
    t: 0 | 1
    mvid: number
}
export interface CollectOrCancelMvResult {
    code: number
}