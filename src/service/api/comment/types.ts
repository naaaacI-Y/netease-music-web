
const typeList = {
    0: "歌曲", 1: "mv", 2: "歌单", 3: "专辑", 4: "电台节目", 5: "视频", 6: "动态", 7: "电台"
}
export type list = keyof typeof typeList
const typeListValue = ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"] as const
type value = typeof typeListValue[number]
export interface AllCommentParam {
    id: number
    type: number
    pageNo?: number
    pageSize?: number
    sortType?: number
    cursor?: number
}
export interface VipRight {
    associator?: any;
    musicPackage?: any;
    redplus?: any;
    redVipAnnualCount?: number;
    redVipLevel: number;
}

export interface User {
    avatarDetail?: any;
    commonIdentity?: any;
    locationInfo?: any;
    liveInfo?: any;
    followed: boolean;
    vipRights?: VipRight;
    relationTag?: any;
    anonym: number;
    userId: number;
    mutual?: boolean;
    userType: number;
    nickname: string;
    avatarUrl: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
    remarkName?: any;
    isHug?: boolean;
}

export interface PickInfo {
    status: string;
}

export interface ShowFloorComment {
    replyCount: number;
    comments?: any;
    showReplyCount: boolean;
    topCommentIds?: any;
    target?: any;
}

export interface Decoration {
    repliedByAuthorCount: number;
}

export interface Tag {
    datas?: any;
    extDatas: any[];
    contentDatas?: any;
    contentPicDatas?: any;
    relatedCommentIds?: any;
}
export interface ExtInfo { }

export interface CommentVideoVO {
    showCreationEntrance: boolean;
    allowCreation: boolean;
    creationOrpheusUrl?: any;
    playOrpheusUrl?: any;
    videoCount: number;
    forbidCreationText: string;
}

export interface IpLocation {
    ip?: any;
    location: string;
    userId?: any;
}


export interface PendantData {
    id: number;
    imageUrl: string;
}
export interface BeReplied {
    user: User;
    beRepliedCommentId: number;
    content: string;
    richContent?: any;
    status: number;
    expressionUrl?: any;
    ipLocation: IpLocation;
}
export interface HotComment {
    user: User;
    beReplied: BeReplied[];
    pendantData?: PendantData;
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




export interface Comment {
    user: User;
    beReplied: BeReplied[];
    pendantData: PendantData;
    showFloorComment?: any;
    status: number;
    commentId: number;
    content: string;
    richContent: string;
    contentResource?: any;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    expressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    decoration: Decoration;
    repliedMark?: any;
    grade?: any;
    userBizLevels?: any;
    ipLocation: IpLocation;
    liked: boolean;
}

// export interface Comment {
//     user: User;
//     beReplied?: BeReplied[];
//     commentId: number;

//     content: string;
//     richContent?: any;
//     status: number;
//     time: number;
//     timeStr: string;
//     needDisplayTime: boolean;
//     likedCount: number;
//     liked: boolean;
//     expressionUrl?: any;
//     parentCommentId: number;
//     repliedMark: boolean;
//     pendantData?: any;
//     showFloorComment: ShowFloorComment;
//     decoration: Decoration;
//     commentLocationType: number;
//     tag: Tag;
//     source?: any;
//     contentResource?: any;
//     grade?: any;
//     userBizLevels?: any;
//     ipLocation: IpLocation;

//     contentPicUrl?: any;
//     contentPicNosKey?: any;
//     musicianSayAirborne?: any;
//     track?: string;
//     extInfo?: ExtInfo;
//     commentVideoVO?: CommentVideoVO;
//     resourceSpecialType?: any;
//     args?: any;
//     pickInfo?: PickInfo;
//     replyCount?: number;
//     threadId?: string;
// }


export interface AllCommentResult {
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



// 获取楼层评论 TODO

// 评论点赞
export interface VoteCommnentParam {
    cid: number
    t: 0 | 1
    type: list
    id: number
}
// TODO
export interface VoteCommentResult {
    code: number
}


// 发送 / 回复 / 删除 评论  1 发送, 2 回复 0 删除
const TypeAction = [0, 1, 2] as const
export type t = typeof TypeAction[number]
export interface SendOrReplyCommentParam {
    t: t
    type: list
    id: number | string
    content?: string
    commentId?: number
}
// TODO
export interface SendOrReplyCommentResult {
    code: number
}


// 热门评论
export interface HotCommentParams {
    id: number
    type: list
    limit?: number
    offset?: number
    before?: number
}

export interface HotCommentResult {
    topComments: any[];
    hasMore: boolean;
    hotComments: HotComment[];
    total: number;
    code: number;
}





