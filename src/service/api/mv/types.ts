
export interface AllMvParam {
    area: string
    type: string
    order: string
    limit: number
    offset: number
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
    cover: string
    name: string
    playCount: number
    briefDesc: null
    artistName: string
    artistId: number
    duration: number
    mark: number
    subed: boolean
    artists: Artist[]
}




export interface MVResult {
    data: MVItem[];
    more: boolean;
    err?: string
    code: number;
}



// 推荐mv
export interface RecommendItem {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime?: any;
    duration: number;
    playCount: number;
    subed: boolean;
    artists: Artist[];
    artistName: string;
    artistId: number;
    alg: string;
}

export interface RecommendMvResult {
    code: number;
    err?: string
    category: number;
    result: RecommendItem[];
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