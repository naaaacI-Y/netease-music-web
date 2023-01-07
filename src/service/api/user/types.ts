import { Creator, Playlist_SongList, Subscriber } from "../music/types";

// 用户详情 id
export interface UserDetailParams {
    uid: number
}

export interface UserPoint {
    userId: number;
    balance: number;
    updateTime: number;
    version: number;
    status: number;
    blockBalance: number;
}

export interface PrivacyItemUnlimit {
    area: boolean;
    college: boolean;
    gender: boolean;
    age: boolean;
    villageAge: boolean;
}

export interface Expert { }

export interface Profile {
    privacyItemUnlimit: PrivacyItemUnlimit;
    avatarDetail?: any;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    allAuthTypes?: { desc: string, tags: string[], type: number }[]
    description: string;
    nickname: string;
    accountStatus: number;
    vipType: number;
    userType: number;
    createTime: number;
    birthday: number;
    avatarUrl: string;
    experts: Expert;
    expertTags?: any;
    djStatus: number;
    gender: number;
    province: number;
    city: number;
    defaultAvatar: boolean;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    mutual: boolean;
    followed: boolean;
    remarkName?: any;
    authStatus: number;
    detailDescription: string;
    userId: number;
    signature: string;
    authority: number;
    followeds: number;
    follows: number;
    blacklist: boolean;
    eventCount: number;
    allSubscribedCount: number;
    playlistBeSubscribedCount: number;
    avatarImgId_str: string;
    followTime?: any;
    followMe: boolean;
    artistIdentity: any[];
    cCount: number;
    inBlacklist: boolean;
    sDJPCount: number;
    playlistCount: number;
    sCount: number;
    newFollows: number;
}

export interface Binding {
    expired: boolean;
    url: string;
    expiresIn: number;
    refreshTime: number;
    bindingTime: number;
    tokenJsonStr?: any;
    userId: number;
    id: number;
    type: number;
}

export interface ProfileVillageInfo {
    title: string;
    imageUrl: string;
    targetUrl: string;
}

export interface UserDetailByIdResult {
    level: number;
    listenSongs: number;
    identify?: {
        actionUrl: any
        imageDesc: string
        imageUrl: string
    },
    userPoint: UserPoint;
    mobileSign: boolean;
    pcSign: boolean;
    profile: Profile;
    peopleCanSeeMyPlayRecord: boolean;
    bindings: Binding[];
    adValid: boolean;
    code: number;
    newUser: boolean;
    recallUser: boolean;
    createTime: number;
    createDays: number;
    profileVillageInfo: ProfileVillageInfo;
}


// 用户关注列表
export interface UserFocusListParams {
    uid: number
    limit?: number
    offset?: number
}

export interface Associator {
    vipCode: number;
    rights: boolean;
    iconUrl?: string;
}

export interface MusicPackage {
    vipCode: number;
    rights: boolean;
}

export interface VipRight {
    associator: Associator;
    redplus?: any;
    musicPackage: MusicPackage;
    redVipAnnualCount: number;
    redVipLevel: number;
}

export interface Follow {
    py: string;
    time: number;
    vipType: number;
    avatarUrl: string;
    authStatus: number;
    gender: number;
    expertTags?: any;
    experts?: any;
    accountStatus: number;
    followed: boolean;
    followeds: number;
    follows: number;
    remarkName?: any;
    nickname: string;
    mutual: boolean;
    userType: number;
    avatarDetail?: any;
    userId: number;
    signature: string;
    vipRights: VipRight;
    eventCount: number;
    playlistCount: number;
}

export interface UserFocusListResult {
    follow: Follow[];
    touchCount: number;
    more: boolean;
    code: number;
}


// 用户粉丝列表

export interface Followed {
    py: string;
    time: number;
    nickname: string;
    follows: number;
    remarkName?: any;
    mutual: boolean;
    followeds: number;
    vipType: number;
    expertTags?: any;
    avatarUrl: string;
    authStatus: number;
    gender: number;
    experts?: any;
    accountStatus: number;
    followed: boolean;
    avatarDetail?: any;
    userType: number;
    userId: number;
    signature: string;
    vipRights: VipRight;
    eventCount: number;
    playlistCount: number;
}

export interface UserFansListResult {
    code: number;
    more: boolean;
    followeds: Followed[];
    size: number;
}

// 用户动态
export interface UserDynamicParams {
    uid: number
    limit?: number
    lasttime?: number
}


export interface CommentThread {
    id: string;
    resourceInfo?: any;
    resourceType: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    hotCount: number;
    latestLikedUsers?: any;
    resourceTitle?: any;
    resourceId: number;
    resourceOwnerId: number;
    extProperties?: any;
    xInfo?: any;
}

export interface Info {
    commentThread: CommentThread;
    latestLikedUsers?: any;
    liked: boolean;
    comments?: any;
    resourceType: number;
    resourceId: number;
    likedCount: number;
    commentCount: number;
    shareCount: number;
    threadId: string;
}

export interface IpLocation {
    ip?: any;
    location: string;
}


export interface User {
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
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    anchor: boolean;
    urlAnalyze: boolean;
    vipRights: VipRight;
    avatarImgId_str: string;
    commonIdentity?: any;
    followeds: number;
}

export interface ExtParam { }

export interface ExtJsonInfo {
    actId: number;
    actIds: any[];
    uuid: string;
    extType: string;
    extSource?: any;
    distributionType?: any;
    extId: string;
    srcResId?: any;
    srcResType?: any;
    circleId: string;
    circlePubType?: any;
    extParams: ExtParam;
    tailMark?: any;
    privacySetting: number;
    typeDesc?: any;
    questionId?: any;
    voiceInfo?: any;
    pointTopicInfo?: any;
    activityInfos?: any;
    anonymityInfo?: any;
    titleAlias?: any;
    gradeSnapshotId?: any;
    changeExtTypeTime?: any;
    algScores?: any;
    location?: any;
}

export interface CommentThread {
    id: string;
    resourceInfo?: any;
    resourceType: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    hotCount: number;
    latestLikedUsers?: any;
    resourceTitle?: any;
    resourceId: number;
    resourceOwnerId: number;
    extProperties?: any;
    xInfo?: any;
}

export interface Info {
    commentThread: CommentThread;
    latestLikedUsers?: any;
    liked: boolean;
    comments?: any;
    resourceType: number;
    resourceId: number;
    likedCount: number;
    commentCount: number;
    shareCount: number;
    threadId: string;
}

export interface XInfo {
    topEvent: boolean;
    insiteForwardCount: number;
    info: Info;
}

export interface Event {
    actName?: any;
    pendantData?: any;
    forwardCount: number;
    lotteryEventData?: any;
    discussId: string;
    insiteForwardCount: number;
    info: Info;
    topEvent: boolean;
    tailMark?: any;
    typeDesc?: any;
    alterLinkUrl?: any;
    alterLinkWebviewUrl?: any;
    privacySetting: number;
    question?: any;
    voice?: any;
    topActivityInfos?: any;
    bottomActivityInfos?: any;
    h5Target?: any;
    more: boolean;
    logInfo?: any;
    eventActionToast?: any;
    relationTopic?: any;
    extType: string;
    extSource?: any;
    distributionType?: any;
    srcResId?: any;
    srcResType?: any;
    location?: any;
    ipLocation: IpLocation;
    anonymityInfo?: any;
    pointTopicInfo?: any;
    commentInfo?: any;
    json: string;
    user: User;
    uuid: string;
    eventTime: number;
    extJsonInfo: ExtJsonInfo;
    tmplId: number;
    expireTime: number;
    rcmdInfo?: any;
    pics: any[];
    showTime: number;
    actId: number;
    xInfo: XInfo;
    id: number;
    type: number;
}

export interface UserDynamicResult {
    lasttime: number;
    more: boolean;
    size: number;
    events: Event[];
    code: number;
}














// 用户歌单
export interface Playlist_user {
    coverStatus?: number;
    shareCount?: number;
    alg?: string;
    commentCount?: number;
    copywriter?: string;
    subscribers: Subscriber[];
    subscribed: boolean;
    creator: Creator;
    tracks?: any;
    updateFrequency?: any;
    backgroundCoverId: number;
    backgroundCoverUrl?: any;
    titleImage: number;
    titleImageUrl?: any;
    englishTitle?: any;
    opRecommend: boolean;
    recommendInfo?: any;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    totalDuration: number;
    coverImgId: number;
    privacy: number;
    trackUpdateTime: number;
    trackCount: number;
    updateTime: number;
    commentThreadId: string;
    coverImgUrl: string;
    specialType: number;
    anonimous: boolean;
    createTime: number;
    highQuality: boolean;
    newImported: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    adType: number;
    description?: any;
    tags: any[];
    ordered: boolean;
    status: number;
    name: string;
    id: number;
    coverImgId_str: string;
    sharedUsers?: any;
    shareStatus?: any;
    copied?: boolean;
    artists?: any;
}

export interface UserSongListResult {
    version: string;
    more: boolean;
    playlist: Playlist_user[];
    code: number;
}


// 关注/取消关注用户
export interface FocusOrCancelPersonParams {
    id: number
    t: number
}
export interface FocusOrCancelPersonResult {
    code: number
}
