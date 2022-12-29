import { HotComment, VipRight, Comment } from '../comment/types';
import { HotAlbum, HotSong } from './../singer/types';
// 专辑详情
export interface AlbumDetailParam {
    id: number
}

export interface Artist {
    img1v1Id: number;
    topicPerson: number;
    alias: string[];
    picId: number;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    followed: boolean;
    trans: string;
    name: string;
    id: number;
    picId_str: string;
    img1v1Id_str: string;
}

export interface ResourceInfo {
    id: number;
    userId: number;
    name: string;
    imgUrl: string;
    creator?: any;
    encodedId?: any;
    subTitle?: any;
    webUrl?: any;
}

export interface CommentThread {
    id: string;
    resourceInfo: ResourceInfo;
    resourceType: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    hotCount: number;
    latestLikedUsers?: any;
    resourceOwnerId: number;
    resourceTitle: string;
    resourceId: number;
}

export interface Info {
    commentThread: CommentThread;
    latestLikedUsers?: any;
    liked: boolean;
    comments?: any;
    resourceType: number;
    resourceId: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    threadId: string;
}



export interface AlbumDetailResult {
    resourceState: boolean;
    songs: HotSong[];
    code: number;
    album: HotAlbum & { info: Info };
}


// 收藏/取消收藏专辑
export interface CollectOrCancelAlbumResult {
    // TODO
}

// 获取已收藏专辑列表
export interface CollectedAlbumParams {
    limit?: number
    offset?: number
}
export interface CollectedAlbumResult {
    // 需要登录 TODO
}

// 获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
export interface AlbumDynamicInfoResult {
    onSale: boolean;
    albumGameInfo?: any;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    isSub: boolean;
    subTime: number;
    subCount: number;
    code: number;
}

// 获取专辑所有评论
export interface AlbumCommentParams {
    id: number
    offset?: number
    limit?: number
    before?: number
}


export interface User {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    commonIdentity?: any;
    userId: number;
    avatarUrl: string;
    avatarDetail?: any;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName?: any;
    vipRights: VipRight;
    nickname: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
}



export interface PendantData {
    id: number;
    imageUrl: string;
}

export interface Decoration { }



export interface AlbumCommentResult {
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

