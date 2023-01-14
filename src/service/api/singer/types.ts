import { profile } from "../login/types";

// 歌手部分信息和热门歌曲
export interface SingelSingerSongParam {
    id: number
}
export interface Artist {
    img1v1Id: number;
    topicPerson: number;
    img1v1Url: string;
    followed?: boolean;
    picUrl: string;
    alias: string[];
    picId: number;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    trans: string;
    name: string;
    id: number;
    publishTime?: number;
    picId_str?: string;
    img1v1Id_str: string;
    mvSize?: number;
    transNames?: any;
    identifyTag?: any;
    alg?: string;
    fansCount?: number;
    isSubed?: any;
    accountId?: number;
    showPrivateMsg?: any;
}

export interface Ar {
    id: number;
    name: string;
    tns?: any[];
    alia: string[];
}

export interface Al {
    id: number;
    name: string;
    picUrl: string;
    pic_str: string;
    pic: number;
    tns?: any[];
}

export interface H {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

export interface L {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

export interface Sq {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

export interface M {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
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

export interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    realPayed?: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    plLevel: string;
    dlLevel: string;
    flLevel: string;
    paidBigBang?: boolean;
    rscl?: any;
    freeTrialPrivilege: FreeTrialPrivilege;
    chargeInfoList: ChargeInfoList[];
}

export interface HotSong {
    rtUrls: any[];
    ar: Ar[];
    al: Al;
    st: number;
    noCopyrightRcmd?: any;
    songJumpInfo?: any;
    cd: string;
    t: number;
    v: number;
    h: H;
    l: L;
    sq: Sq;
    hr?: any;
    mv: number;
    no: number;
    fee: number;
    djId: number;
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    cf: string;
    dt: number;
    crbt?: any;
    rtUrl?: any;
    ftype: number;
    copyright?: number;
    s_id?: number;
    mark?: number;
    originCoverType?: number;
    pst: number;
    alia?: any[];
    pop: number;
    rt: string;
    a?: any;
    m: M;
    name: string;
    id: number;
    privilege: Privilege;
    eq?: string;


    originSongSimpleData?: any;
    tagPicList?: any;
    resourceState?: boolean;
    version?: number;
    entertainmentTags?: any;
    single?: number;
    publishTime?: number;
    alg?: string;
}
export interface SingelSingerSongResult {
    artist: Artist;
    hotSongs: HotSong[];
    more: boolean;
    message?: string;
    code: number;
}


// 获取歌手 mv
export interface Mv {
    id: number;
    name: string;
    imgurl?: string;
    artistName: string;
    duration: number;
    playCount: number;
    subed: boolean;

    type?: number;
    copywriter?: string;
    canDislike?: boolean;
    trackNumberUpdateTime?: any;
    artists?: Artist[];
    artistId?: number;
    alg?: string;
    picUrl?: string;  // imgurl

    status: number;
    artist: Artist;
    publishTime: string;
    imgurl16v9: string;
}
export interface SingerMvResult {
    mvs: Mv[];
    time: number;
    hasMore: boolean;
    code: number;
}



// 获取歌手专辑
export interface SingerAlbumParam {
    id: number
    limit?: number
    offset?: number
}

export interface HotAlbum {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    awardTags?: any;
    companyId: number;
    blurPicUrl: string;
    alias: any[];
    artists: Artist[];
    copyrightId: number;
    picId: number;
    artist: Artist;
    briefDesc: string;
    publishTime: number;
    company: string;
    picUrl: string;
    commentThreadId: string;
    pic: number;
    description: string;
    tags: string;
    status: number;
    subType: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
}

export interface SingerAlbumresult {
    artist: Artist;
    hotAlbums: HotAlbum[];
    more: boolean;
    code: number;
}


// 获取歌手描述
export interface Introduction {
    ti: string;
    txt: string;
}

export interface Content {
    type: number;
    id: number;
    content: string;
}

export interface Topic {
    id: number;
    addTime: number;
    mainTitle: string;
    title: string;
    content: Content[];
    userId: number;
    cover: number;
    headPic: number;
    shareContent: string;
    wxTitle: string;
    showComment: boolean;
    status: number;
    seriesId: number;
    pubTime: number;
    readCount: number;
    tags: string[];
    pubImmidiatly: boolean;
    auditor: string;
    auditTime: number;
    auditStatus: number;
    startText: string;
    delReason: string;
    showRelated: boolean;
    fromBackend: boolean;
    rectanglePic: number;
    updateTime: number;
    reward: boolean;
    summary: string;
    memo?: any;
    adInfo: string;
    categoryId: number;
    hotScore: number;
    recomdTitle: string;
    recomdContent: string;
    number: number;
}

export interface Creator {
    userId: number;
    userType: number;
    nickname: string;
    avatarImgId: number;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundUrl: string;
    signature: string;
    createTime: number;
    userName: string;
    accountType: number;
    shortUserName: string;
    birthday: number;
    authority: number;
    gender: number;
    accountStatus: number;
    province: number;
    city: number;
    authStatus: number;
    description: string;
    detailDescription: string;
    defaultAvatar: boolean;
    expertTags?: any;
    experts?: any;
    djStatus: number;
    locationStatus: number;
    vipType: number;
    followed: boolean;
    mutual: boolean;
    authenticated: boolean;
    lastLoginTime: number;
    lastLoginIP: string;
    remarkName?: any;
    viptypeVersion: number;
    authenticationTypes: number;
    avatarDetail?: any;
    anchor: boolean;
}

export interface TopicData {
    topic: Topic;
    creator: Creator;
    shareCount: number;
    commentCount: number;
    likedCount: number;
    liked: boolean;
    rewardCount: number;
    rewardMoney: number;
    relatedResource?: any;
    rectanglePicUrl: string;
    coverUrl: string;
    categoryId: number;
    categoryName: string;
    reward: boolean;
    memo?: any;
    recmdTitle: string;
    recmdContent: string;
    shareContent: string;
    wxTitle: string;
    addTime: number;
    seriesId: number;
    showComment: boolean;
    showRelated: boolean;
    summary: string;
    title: string;
    mainTitle: string;
    commentThreadId: string;
    readCount: number;
    url: string;
    tags: string[];
    id: number;
    number: number;
}

export interface SingerDesResult {
    introduction: Introduction[];
    briefDesc: string;
    count: number;
    message?: string;
    topicData: TopicData[];
    code: number;
}

// 获取相似歌手

export interface SimilarSingerResult {
    artists: Artist[];
    message?: string
    code: number;
}


// 歌手分类列表
export interface SingerCategoryParam {
    limit?: number
    offset?: number
    initial?: string | number
    type: number | string
    area: number | string
}
export interface SingerCategoryResult {
    artists: Artist[];
    more: boolean;
    message?: string;
    code: number;
}

// 收藏/取消收藏歌手

export interface CollectorCancelSingerParam {
    id: number
    t: number
}
// TODO
export interface CollectorCancelSingerResult {
    code: number
}

// 歌手热门 50 首歌曲
export interface Song {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia?: any[];
    pop: number;
    st: number;
    rt: string;
    fee: number;
    v: number;
    crbt?: any;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: M;
    l: L;
    sq: Sq;
    hr?: any;
    a?: any;
    cd: string;
    no: number;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData?: any;
    tagPicList?: any;
    resourceState: boolean;
    version: number;
    songJumpInfo?: any;
    entertainmentTags?: any;
    awardTags?: any;
    single: number;
    noCopyrightRcmd?: any;
    mv: number;
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    tns?: string[]
    publishTime: number;
    privilege: Privilege;
    lyrics?: string[]
    isFold?: boolean
}

export interface SingerTopSongResult {
    code: number;
    more: boolean;
    songs: Song[];
}

// 歌手粉丝
export interface SingerFansParam {
    id: number
    limit?: number
    offset?: number
}


export interface Associator {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}

export interface MusicPackage {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}

export interface VipRight {
    associator: Associator;
    musicPackage: MusicPackage;
    redplus?: any;
    redVipAnnualCount: number;
    redVipLevel: number;
}

export interface SingerFansRet {
    userProfile: profile;
    vipRights: VipRight;
}

export interface SingerFansResult {
    code: number;
    message: string;
    data: SingerFansRet[];
}



// 收藏的歌手列表
export interface CollectedSingerRet {
    info: string;
    id: number;
    name: string;
    trans?: any;
    alias: string[];
    albumSize: number;
    mvSize: number;
    picId: number;
    picUrl: string;
    img1v1Url: string;
}

export interface CollectedSingerResult {
    data: CollectedSingerRet[];
    hasMore: boolean;
    count: number;
    code: number;
}