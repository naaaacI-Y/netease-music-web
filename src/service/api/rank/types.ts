// 所有榜单
export interface RankList {
    subscribers: any[];
    subscribed?: any;
    creator?: any;
    artists?: any;
    tracks?: any;
    updateFrequency: string;
    backgroundCoverId: number;
    backgroundCoverUrl?: any;
    titleImage: number;
    titleImageUrl?: any;
    englishTitle?: any;
    opRecommend: boolean;
    recommendInfo?: any;
    socialPlaylistCover?: any;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    adType: number;
    createTime: number;
    highQuality: boolean;
    specialType: number;
    newImported: boolean;
    updateTime: number;
    anonimous: boolean;
    coverImgId: number;
    trackCount: number;
    coverImgUrl: string;
    totalDuration: number;
    trackUpdateTime: number;
    privacy: number;
    commentThreadId: string;
    playCount: number;
    ordered: boolean;
    tags: any[];
    description: string;
    status: number;
    name: string;
    id: number;
    coverImgId_str: string;
    toplistType: string;
}

export interface ArtistToplist {
    coverUrl: string;
    name: string;
    upateFrequency: string;
    position: number;
    updateFrequency: string;
}

export interface AllRankResult {
    code: number;
    list: RankList[];
    artistToplist: ArtistToplist;
}