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
    id: number
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
    vid: number
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
// TODO
export interface VideoByCategoryResult {
    code: number
}