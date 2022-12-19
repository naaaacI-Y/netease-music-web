
const typeList = {
    0: "歌曲", 1: "mv", 2: "歌单", 3: "专辑", 4: "电台节目", 5: "视频", 6: "动态", 7: "电台"
}
type list = keyof typeof typeList
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
    redVipAnnualCount: number;
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
export interface BeReplied {
    user: User;
    beRepliedCommentId: number;
    content?: any;
    richContent?: any;
    status: number;
    expressionUrl?: any;
    ipLocation: IpLocation;
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

export interface Comment {
    user: User;
    beReplied?: BeReplied[];
    commentId: number;
    threadId: string;
    content: string;
    richContent?: any;
    status: number;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    replyCount: number;
    liked: boolean;
    expressionUrl?: any;
    parentCommentId: number;
    repliedMark: boolean;
    pendantData?: any;
    pickInfo: PickInfo;
    showFloorComment: ShowFloorComment;
    decoration: Decoration;
    commentLocationType: number;
    musicianSayAirborne?: any;
    args?: any;
    tag: Tag;
    source?: any;
    resourceSpecialType?: any;
    extInfo: ExtInfo;
    commentVideoVO: CommentVideoVO;
    contentResource?: any;
    contentPicNosKey?: any;
    contentPicUrl?: any;
    grade?: any;
    userBizLevels?: any;
    ipLocation: IpLocation;
    track: string;
}

export interface SortTypeList {
    sortType: number;
    sortTypeName: string;
    target: string;
}

export interface AllCommentRet {
    commentsTitle: string;
    comments: Comment[];
    currentCommentTitle: string;
    currentComment?: any;
    totalCount: number;
    hasMore: boolean;
    cursor: string;
    sortType: number;
    sortTypeList: SortTypeList[];
    style: string;
}

export interface AllCommentResult {
    code: number;
    err?: string;
    data: AllCommentRet;
}



// 获取楼层评论 TODO

// 评论点赞
export interface VoteCommnentParam {
    cid: number
    t: 0 | 1
    type: list
}
// TODO
export interface VoteCommentResult {
    code: number
}


// 发送 / 回复 / 删除 评论
export interface SendOrReplyCommentParam {
    t: 0 | 1 | 2
    type: list
    id: number
    content?: string
    commentId?: number
}
// TODO
export interface SendOrReplyCommentResult {
    code: number
}


