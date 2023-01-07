import { Decoration } from "../album/types"
import { BeReplied, ShowFloorComment, Comment, IpLocation } from "../comment/types"

export interface AllMvParam {
    area?: string
    type?: string
    order?: string
    limit?: number
    offset?: number
}
export interface newMvParam {
    area: string
    limit?: number
}
export interface NetProductParam {
    limit?: number
    offset?: number
}
export interface Artist {
    id: number
    name: string
    alias?: string[]
    transNames?: null
    img1v1Url?: any;
    followed?: boolean;
}
// 全部mv 最新mv 网易出品mv
export interface MVItem {
    id: number
    cover?: string
    name: string
    playCount: number
    briefDesc?: null
    canDislike?: boolean
    alg?: string
    picUrl?: string
    copywriter?: string
    artistName: string
    artistId?: number
    duration: number
    mark?: number
    subed: boolean
    imgurl?: string
    artists?: Artist[]
}




export interface MVResult {
    data: MVItem[];
    more: boolean;
    err?: string
    code: number;
    count?: number
}



// 推荐mv
export interface RecommendItem {
    type?: number;
    copywriter?: string;
    canDislike?: boolean;
    trackNumberUpdateTime?: any;
    artists?: Artist[];
    artistId?: number;
    alg?: string;

    status?: number;
    artist?: Artist;
    publishTime?: string;
    imgurl16v9?: string;
    imgurl?: string
    subed: boolean;
    artistName: string;
    picUrl?: string;  // imgurl
    id: number;
    duration: number;
    playCount: number;
    name: string;
}

export interface RecommendMvResult {
    code: number;
    err?: string
    category: number;
    result: MVItem[];
}







// mv详情
export interface MvDetailParam {
    mvid: number
}
export interface Mp {
    id: number;
    fee: number;
    mvFee: number;
    payed: number;
    pl: number;
    dl: number;
    cp: number;
    sid: number;
    st: number;
    normal: boolean;
    unauthorized: boolean;
    msg?: any;
}

export interface Br {
    size: number;
    br: number;
    point: number;
}



export interface VideoGroup {
    id: number;
    name: string;
    type: number;
}

export interface MvDetailRet {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    briefDesc: string;
    desc?: any;
    cover: string;
    coverId_str: string;
    coverId: number;
    playCount: number;
    subCount: number;
    shareCount: number;
    commentCount: number;
    duration: number;
    nType: number;
    publishTime: string;
    price?: any;
    brs: Br[];
    artists: Artist[];
    commentThreadId: string;
    videoGroup: VideoGroup[];
}

export interface MvDetailResult {
    loadingPic: string;
    bufferPic: string;
    loadingPicFS: string;
    bufferPicFS: string;
    subed: boolean;
    mp: Mp;
    err?: string;
    data: MvDetailRet;
    code: number;
}


// mv播放地址
export interface MvUrlParam {
    id: number
    r?: number
}

export interface MvUrlRet {
    id: number;
    url: string;
    r: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    fee: number;
    mvFee: number;
    st: number;
    promotionVo?: any;
    msg: string;
}

export interface MvUrlResult {
    code: number;
    data: MvUrlRet;
}


// mv播放信息
export interface MvInfoResult {
    likedCount: number;
    shareCount: number;
    commentCount: number;
    liked: boolean;
    err?: string;
    code: number;
}


// 相似mv
export interface SimilarMVParams {
    mvid: number
}
export interface Mv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: string;
    desc?: any;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    artists: Artist[];
    alg: string;
}

export interface SimilarMVResult {
    mvs: Mv[];
    code: number;
}

// mv评论
export interface MVCommentParams {
    id: number
    limit?: number
    offset?: number
    before?: number
}



export interface User {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    commonIdentity?: any;
    userId: number;
    avatarDetail?: any;
    userType: number;
    avatarUrl: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
    followed: boolean;
    mutual: boolean;
    remarkName?: any;
    vipRights?: any;
    nickname: string;
}

export interface HotComment {
    user: User;
    beReplied: BeReplied[];
    pendantData?: any;
    showFloorComment?: any;
    status: number;
    commentId: number;
    content: string;
    richContent?: any;
    contentResource?: any;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    expressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    decoration?: any;
    repliedMark?: any;
    grade?: any;
    userBizLevels?: any;
    ipLocation: IpLocation;
    liked: boolean;
}





export interface MVCommentResult {
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