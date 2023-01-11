import { Privilege } from "../singer/types";

export interface Artist {
    name: string;
    id: number;
    picId?: number;
    img1v1Id?: number;
    briefDesc?: string;
    picUrl?: string;
    img1v1Url?: string;
    followed?: boolean;
    albumSize?: number;
    alias?: any[];
    trans?: string;
    musicSize?: number;
    topicPerson?: number;
    img1v1Id_str?: string;
    picId_str?: string;
}

export interface Album {
    name: string;
    id: number;
    type: string;
    size: number;
    picId: number;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    picUrl: string;
    publishTime: number;
    description: string;
    tags: string;
    company: string;
    briefDesc: string;
    artist: Artist;
    paid?: boolean;
    songs: any[];
    alias: string[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: Artist[];
    subType: string;
    onSale: boolean;
    mark?: number;
    transName?: any;
    gapless?: number;
    idStr?: string;
    picId_str?: string;
    isSub?: boolean;
}

export interface SqMusic {
    name?: any;
    id: number;
    size: number;
    extension: string;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
}


export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType?: any;
}

export interface ChargeInfoList {
    rate: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType: number;
}


export interface Song {
    name: string;
    id: number;
    position: number;
    alias: string[];
    status: number;
    fee: number;
    copyrightId: number;
    disc: string;
    no: number;
    artists: Artist[];
    album: Album;
    starred: boolean;
    popularity: number;
    score: number;
    starredNum: number;
    duration: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    sqMusic: SqMusic;
    hrMusic?: any;
    ringtone: string;
    crbt?: any;
    audition?: any;
    copyFrom: string;
    commentThreadId: string;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    transName?: any;
    sign?: any;
    mark: number;
    originCoverType: number;
    originSongSimpleData?: any;
    single: number;
    noCopyrightRcmd?: any;
    bMusic: SqMusic;
    mp3Url?: any;
    rtype: number;
    rurl?: any;
    mvid: number;
    hMusic: SqMusic;
    mMusic: SqMusic;
    lMusic: SqMusic;
    transNames?: string[];
    exclusive: boolean;
    alg?: string;
    privilege: Privilege;
}

export interface RecommendNewMusicRet {
    id: number;
    type: number;
    name: string;
    copywriter?: any;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime?: any;
    song: Song;
    alg: string;
}

export interface RecommendNewMusicResult {
    code: number;
    category: number;
    result: RecommendNewMusicRet[];
}



// 独家放送--推荐
export interface UniqueRecommendRet {
    id: number;
    url: string;
    picUrl: string;
    sPicUrl: string;
    type: number;
    copywriter: string;
    name: string;
    alg?: string;
    time?: number
}

export interface UniqueRecommendResult {
    code: number;
    name: string;
    result: UniqueRecommendRet[];
}

// 独家放送--列表
export interface UniqueRecommendListParam {
    limit: number
    offset?: number
}


export interface UniqueRecommendListRresult {
    code: number;
    result: UniqueRecommendRet[];
    more: boolean;
    offset: number;
}

// 每日歌单推荐
export interface Creator {
    remarkName?: any;
    mutual: boolean;
    avatarImgIdStr: string;
    avatarImgId: number;
    backgroundImgId: number;
    detailDescription: string;
    defaultAvatar: boolean;
    expertTags?: any;
    djStatus: number;
    followed: boolean;
    backgroundUrl: string;
    userId: number;
    backgroundImgIdStr: string;
    accountStatus: number;
    vipType: number;
    province: number;
    avatarUrl: string;
    authStatus: number;
    userType: number;
    nickname: string;
    gender: number;
    birthday: number;
    city: number;
    description: string;
    signature: string;
    authority: number;
}

export interface Recommend {
    id?: number;
    type?: number;
    name: string;
    copywriter?: string;
    picUrl?: string;
    playcount?: number;
    createTime?: number;
    creator?: Creator;
    trackCount?: number;
    userId?: number;
    alg?: string;
}

export interface DayRecommendSongListResult {
    code: number;
    featureFirst: boolean;
    haveRcmdSongs: boolean;
    recommend: Recommend[];
}

// 首页轮播图
export interface Banner {
    imageUrl: string;
    targetId: number;
    adid?: any;
    targetType: number;
    titleColor: string;
    typeTitle: string;
    url: string;
    exclusive: boolean;
    monitorImpress?: any;
    monitorClick?: any;
    monitorType?: any;
    monitorImpressList?: any;
    monitorClickList?: any;
    monitorBlackList?: any;
    extMonitor?: any;
    extMonitorInfo?: any;
    adSource?: any;
    adLocation?: any;
    adDispatchJson?: any;
    encodeId: string;
    program?: any;
    event?: any;
    video?: any;
    song?: any;
    scm: string;
    bannerBizType: string;
}

export interface CarouselResult {
    banners: Banner[];
    code: number;
}