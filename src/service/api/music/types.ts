import { newestMusicType } from "@/utils/const";
import { HotComment, Comment } from "../comment/types";
import { Album, Artist, SqMusic } from "../recommend/types";
import { Al, Ar, H, HotSong, L, M, Privilege, Sq } from "../singer/types";
export type typeList = keyof typeof newestMusicType

export interface NewMusicParam {
    type: number
}


export interface Privilegee {
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
    toast: boolean;
    flag: number;
    preSell: boolean;
}

export interface NewMusicRet {
    starred: boolean;
    popularity: number;
    starredNum: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    mp3Url: string;
    rtUrls?: any;
    artists: Artist[];
    score: number;
    copyrightId: number;
    alias: string[];
    audition?: any;
    ringtone: string;
    disc: string;
    no: number;
    fee: number;
    hMusic: SqMusic;
    mvid: number;
    ftype: number;
    rtype: number;
    rurl?: any;
    commentThreadId: string;
    copyFrom: string;
    mMusic: SqMusic;
    lMusic: SqMusic;
    album: Album;
    rtUrl?: any;
    crbt?: any;
    bMusic: SqMusic;
    position: number;
    duration: number;
    status: number;
    name: string;
    id: number;
    exclusive: boolean;
    privilege: Privilegee;
}

export interface NewMusicResult {
    data: NewMusicRet[];
    code: number;
}


// 歌单
export interface SongListParams {
    order?: "new" | "hot"
    cat?: string
    limit?: number
    offset?: number
}

export interface AvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}

export interface Creator {
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
    expertTags?: string[];
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail: AvatarDetail;
    anchor: boolean;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    avatarImgId_str: string;
}

export interface Subscriber {
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
    expertTags?: string[];
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail?: any;
    anchor: boolean;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    avatarImgId_str: string;
}

export interface Playlist {
    name: string;
    id: number;
    trackNumberUpdateTime: number;
    status: number;
    userId: number;
    createTime: number;
    updateTime: number;
    subscribedCount: number;
    trackCount: number;
    cloudTrackCount: number;
    coverImgUrl: string;
    coverImgId: number;
    description?: string;
    tags: string[];
    playCount: number;
    trackUpdateTime: number;
    specialType: number;
    totalDuration: number;
    creator: Creator;
    tracks?: any;
    subscribers: Subscriber[];
    subscribed: boolean;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    coverStatus?: number;
    recommendInfo?: any;
    shareCount?: number;
    coverImgId_str: string;
    alg?: string;
    commentCount?: number;
    copywriter?: string;
    artists?: any;
}

export interface SongListResult {
    playlists: Playlist[];
    total: number;
    code: number;
    more: boolean;
    cat: string;
}


// 精品歌单
export interface HighqualitySongListParams {
    cat?: string
    limit?: number
    before?: number
}

export interface HighqualitySongListResult {
    playlists: Playlist[];
    code: number;
    more: boolean;
    lasttime: number;
    total: number;
}

// 歌单详情
export interface SongListDetailParams {
    id: number
}

export interface Playlist_SongList {
    id: number;
    name: string;
    coverImgId: number;
    coverImgUrl: string;
    coverImgId_str: string;
    adType: number;
    userId: number;
    createTime: number;
    status: number;
    opRecommend: boolean;
    highQuality: boolean;
    newImported: boolean;
    updateTime: number;
    trackCount: number;
    specialType: number;
    privacy: number;
    trackUpdateTime: number;
    commentThreadId: string;
    playCount: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    ordered: boolean;
    description: string | undefined;
    tags: string[];
    updateFrequency: string;
    backgroundCoverId: number;
    backgroundCoverUrl: string;
    titleImage: number;
    titleImageUrl: string;
    englishTitle: string;
    officialPlaylistType: string;
    copied: boolean;
    relateResType: string;
    subscribers: Subscriber[];
    subscribed: boolean;
    creator: Creator;
    tracks: HotSong[];
    videoIds?: any;
    videos?: any;
    trackIds?: TrackId[];
    bannedTrackIds?: any;
    shareCount: number;
    commentCount: number;
    remixVideo?: any;
    sharedUsers?: any;
    historySharedUsers?: any;
    gradeStatus?: string;
    score?: any;
    algTags?: any;
}


export interface TrackId {
    id: number;
    v: number;
    t: number;
    at: number;
    alg: string;
    lr?: number
    uid: number;
    rcmdReason: string;
    sc?: any;
    ratio?: number
    f?: any;
    sr?: any;
}


export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType?: any;
    cannotListenReason?: any;
}

export interface ChargeInfoList {
    rate: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType: number;
}





export interface SongListDetailResult {
    code: number;
    relatedVideos?: any;
    playlist: Playlist_SongList;
    urls?: any;
    privileges: Privilege[];
    sharedPrivilege?: any;
    resEntrance?: any;
    fromUsers?: any;
    fromUserCount: number;
    songFromUsers?: any;
}

export interface HeaderInfo {
    id: number
    name: string
    coverImgUrl: string
    description: string
    subscribedCount: number
    createTime: number
    userId: number
    trackCount: number
    shareCount: number
    commentCount: number
    creator: Creator
    tags: string[]
    playCount: number
    subscribed?: boolean
}

// 歌单评论
export interface SongListCommentParams {
    id: number
    offset?: number
    limit?: number
    before?: number
}

export interface SongListCommentResult {
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


// 歌单收藏用户
export interface SongListCollectorsResult {
    total: number;
    code: number;
    more: boolean;
    subscribers: Subscriber[];
}


// 每日歌曲推荐


export interface AlbumMeta {
    id: number;
    name: string;
}

export interface OriginSongSimpleData {
    songId: number;
    name: string;
    artists: Artist[];
    albumMeta: AlbumMeta;
}


export interface ChargeInfoList {
    rate: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType: number;
}

export interface DailySong {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia?: string[];
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
    originSongSimpleData?: OriginSongSimpleData;
    tagPicList?: any;
    resourceState: boolean;
    version: number;
    songJumpInfo?: any;
    entertainmentTags?: any;
    single: number;
    noCopyrightRcmd?: any;
    mst: number;
    cp: number;
    mv: number;
    rtype: number;
    rurl?: any;
    publishTime: number;
    reason?: string;
    recommendReason?: string;
    privilege: Privilege;
    alg: string;
}

export interface RecommendReason {
    songId: number;
    reason: string;
    reasonId: string;
    targetUrl?: any;
}

export interface DaliySongRet {
    dailySongs: DailySong[];
    orderSongs: any[];
    recommendReasons: RecommendReason[];
}

export interface DaliySongResult {
    code: number;
    data: DaliySongRet;
}


// 获取歌曲详情
export interface SongDetailParams {
    ids: string
}

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
    resourceState?: boolean;
    version?: number;
    songJumpInfo?: any;
    entertainmentTags?: any;
    awardTags?: any;
    single: number;
    noCopyrightRcmd?: any;
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    mv: number;
    publishTime: number;
    tns?: string[];
}



export interface SongDetailResult {
    songs: Song[];
    privileges: Privilege[];
    code: number;
}


// 获取音乐url
export interface FreeTimeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
}

export interface MusicUrlRet {
    id: number;
    url: string;
    br: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    type: string;
    gain: number;
    peak: number;
    fee: number;
    uf?: any;
    payed: number;
    flag: number;
    canExtend: boolean;
    freeTrialInfo?: any;
    level: string;
    encodeType: string;
    freeTrialPrivilege: FreeTrialPrivilege;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    urlSource: number;
    rightSource: number;
    podcastCtrp?: any;
    effectTypes?: any;
    time: number;
}

export interface MusicUrlResult {
    data: MusicUrlRet[];
    code: number;
}


// 听歌打卡
export interface ScrobbleParams {
    id: number
    time?: number
}
export interface ScrobbleResult {
    code: number;
    data: string;
    message: string;
}

// 获取歌词
export interface LyricParams {
    id: number
}

export interface Lrc {
    version: number;
    lyric: string;
}

export interface Klyric {
    version: number;
    lyric: string;
}

export interface Tlyric {
    version: number;
    lyric: string;
}

export interface LyricUser {
    demand: number
    id: number
    nickname: string
    status: number
    uptime: number
    userid: number
}
export interface LyricsResult {
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    lrc: Lrc;
    klyric: Klyric;
    tlyric: Tlyric;
    code: number;
    transUser?: LyricUser
    lyricUser?: LyricUser
}

// 推荐歌单 不需要登录
export interface RecommendSongListParams {
    limit?: number
}


export interface RecommendSongListRet {
    id?: number;
    type?: number;
    name: string;
    copywriter?: string;
    picUrl?: string;
    canDislike?: boolean;
    trackNumberUpdateTime?: number;
    playCount?: number;
    trackCount?: number;
    highQuality?: boolean;
    alg?: string;
}

export interface RecommendSongListResult {
    hasTaste: boolean;
    code: number;
    category: number;
    result: RecommendSongListRet[];
}


// 相似歌曲
export interface SimilarSongResult {
    songs: NewMusicRet[];
    code: number;
}

// 歌曲评论
export interface SongCommentParams {
    id: number
    offset?: number
    before?: number
}



export interface SongCommentResult {
    isMusician: boolean;
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

// 检查歌曲是否可用
export interface CheckSongAvaliableParams {
    id: number
}
export interface CheckSongAvaliableresult {
    message: string
    success: string
}

// 最近播放
export interface recentPlayList {
    resourceId: string;
    playTime: number;
    resourceType: string;
    data: Song;
    banned: boolean;
}

export interface RecentPlayRet {
    total: number;
    list: recentPlayList[];
}

export interface RecentPlayResult {
    code: number;
    data: RecentPlayRet;
    message: string;
}

// 歌单收藏/取消收藏
export interface CollectSongListParams {
    t: 1 | 2
    id: number
}
export interface CollectSongListResult {
    code: number
}


// 获取喜欢歌曲列表
export interface LikesSongResult {
    ids: number[]
    checkPoint: number
    code: number
}

// 喜欢音乐
export interface LikeSongPrams {
    id: number
    like: boolean
}
export interface LikeSongResult {
    songs: []
    playlistId: number
    code: number
}