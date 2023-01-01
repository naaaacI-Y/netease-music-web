import { Song } from "@/service/api/singer/types"
import { Album } from "@/service/api/recommend/types"
import { AvatarDetail } from "../music/types";
// 热搜列表(详细)
export interface HotSearchListRet {
    searchWord: string;
    score: number;
    content: string;
    source: number;
    iconType: number;
    iconUrl: string;
    url: string;
    alg: string;
}

export interface HotSearchListResult {
    code: number;
    data: HotSearchListRet[];
    message: string;
}


// 搜索建议 也就是常规搜索，结果包含单曲、歌手、专辑以及歌单
export interface SearchSuggestParams {
    keywords: string
}


export interface SearchSuggestAlbum {
    id: number;
    name: string;
    artist: Artist;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
}

export interface Artist {
    id: number;
    name: string;
    picUrl: string;
    alias: any[];
    albumSize: number;
    picId: number;
    fansGroup?: any;
    img1v1Url: string;
    accountId: number;
    img1v1: number;
    trans?: any;
    musicSize?: number;
}

export interface SearchSuggestSong {
    id: number;
    name: string;
    artists: Artist[];
    album: SearchSuggestAlbum;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl?: any;
    mark: number;
}

export interface Playlist {
    id: number;
    name: string;
    coverImgUrl: string;
    creator?: any;
    subscribed: boolean;
    trackCount: number;
    userId: number;
    playCount: number;
    bookCount: number;
    specialType: number;
    officialTags?: any;
    action?: any;
    actionType?: any;
    recommendText?: any;
    score?: any;
    description?: any;
    highQuality: boolean;
}

export interface SearchSuggestRet {
    albums?: SearchSuggestAlbum[];
    artists?: Artist[];
    songs?: SearchSuggestSong[];
    playlists?: Playlist[];
    order: string[];
}

export interface SearchSuggestResult {
    result: SearchSuggestRet;
    code: number;
}


// 搜索  点击 搜"xxx"的结果进入的具体页面
export interface SearchParams {
    keywords: string
    limit?: number
    offset?: number
    type?: number // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
}
// 1、单曲
export interface SearchSongResult {
    searchQcReminder?: any;
    songs: Song[];
    songCount: number;
}
// 10、专辑
export interface SearchAlbumResult {
    albumCount: number
    albums: Album[]
}
// 100、歌手
export interface SearchSingerResult {
    artistCount: number;
    artists: Artist[];
    searchQcReminder?: any;
}
// 1000、歌单
export interface SearchSongListResult {
    searchQcReminder?: any;
    playlists: Playlist[];
    playlistCount: number;
}
// 1002、用户
export interface Userprofile {
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
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail: AvatarDetail;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
    followeds: number;
    follows: number;
    alg: string;
    playlistCount: number;
    playlistBeSubscribedCount: number;
}
export interface SearchUserResult {
    userProfile: Userprofile[]
    userprofileCount: number;
}
// 1006、歌词
export interface SearchLyricResult {
    searchQcReminder: any
    songCount: number
    songs: Song[]
}
// 1014、视频
export interface Creator {
    userId: number;
    userName: string;
}
export interface Video {
    coverUrl: string;
    title: string;
    durationms: number;
    playTime: number;
    type: number;
    creator: Creator[];
    aliaName?: any;
    transName?: any;
    vid: string;
    markTypes?: any;
    alg: string;
}
export interface SearchVideoResult {
    videoCount: number;
    searchQcReminder?: any;
    videos: Video[];
}
// 1009、电台
export interface Dj {
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
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail?: any;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
}

export interface Icon {
    type: string;
    value: string;
    color: string;
}
export interface DjRadio {
    id: number;
    dj: Dj;
    name: string;
    picUrl: string;
    desc: string;
    subCount: number;
    programCount: number;
    createTime: number;
    categoryId: number;
    category: string;
    secondCategoryId: number;
    secondCategory: string;
    radioFeeType: number;
    feeScope: number;
    buyed: boolean;
    videos?: any;
    finished: boolean;
    underShelf: boolean;
    purchaseCount: number;
    price: number;
    originalPrice: number;
    discountPrice?: any;
    lastProgramCreateTime: number;
    lastProgramName?: any;
    lastProgramId: number;
    picId: number;
    rcmdText: string;
    hightQuality: boolean;
    whiteList: boolean;
    liveInfo?: any;
    playCount: number;
    icon: Icon;
    privacy: boolean;
    intervenePicUrl: string;
    composeVideo: boolean;
    shareCount: number;
    likedCount: number;
    commentCount: number;
}
export interface SearchRadioResult {
    djRadios: DjRadio[];
    searchQcReminder?: any;
    djRadiosCount: number;
}
export interface SearchResult {
    result: SearchSongResult;
    code: number;
}
