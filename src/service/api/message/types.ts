export interface QueryParam {
    limit: number
    offset: number
}


// 私信
export interface User {
    id: number;
    toUserId: number;
    fromUserId: number;
    msgCount: number;
    newMsgCount: number;
    lastMsgTime: number;
    lastMsg: any;
}

export interface AvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}

export interface FromUser {
    backgroundUrl: string;
    backgroundImgId: number;
    birthday: number;
    accountStatus: number;
    city: number;
    detailDescription: string;
    defaultAvatar: boolean;
    djStatus: number;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    userType: number;
    avatarDetail: AvatarDetail;
    province: number;
    gender: number;
    mutual: boolean;
    authStatus: number;
    expertTags?: any;
    vipType: number;
    experts?: any;
    nickname: string;
    followed: boolean;
    remarkName?: any;
    avatarImgId: number;
    avatarUrl: string;
    userId: number;
    description: string;
    signature: string;
    authority: number;
    blacklist: boolean;
    artistName: string;
}

export interface ToUser {
    backgroundUrl: string;
    backgroundImgId: number;
    birthday: number;
    accountStatus: number;
    city: number;
    detailDescription: string;
    defaultAvatar: boolean;
    djStatus: number;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    userType: number;
    avatarDetail?: any;
    province: number;
    gender: number;
    mutual: boolean;
    authStatus: number;
    expertTags?: any;
    vipType: number;
    experts?: any;
    nickname: string;
    followed: boolean;
    remarkName?: any;
    avatarImgId: number;
    avatarUrl: string;
    userId: number;
    description: string;
    signature: string;
    authority: number;
}

export interface Msg {
    user: User;
    fromUser: FromUser;
    toUser: ToUser;
    noticeAccountFlag: boolean;
    noticeAccount?: any;
    lastMsg: any;
    lastMsgTime: number;
    newMsgCount: number;
    lastMsgUserId?: any;
    msgSenderType: number;
    lastMsgId: number;
}

export interface PrivateResult {
    msgs: Msg[];
    code: number;
    more: boolean;
    newMsgCount: number;
}


// 评论
export interface CommentUser {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    commonIdentity?: any;
    userId: number;
    avatarUrl: string;
    avatarDetail?: any;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName?: any;
    socialUserId?: any;
    vipRights?: any;
    nickname: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
    target?: any;
}

export interface BeRepliedUser {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    commonIdentity?: any;
    userId: number;
    avatarUrl: string;
    avatarDetail?: any;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName?: any;
    socialUserId?: any;
    vipRights?: any;
    nickname: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
    target?: any;
}

export interface MessageComment {
    user: CommentUser;
    beRepliedUser: BeRepliedUser;
    beRepliedContent: string;
    time: number;
    content: string;
    resourceJson: string;
    combindId: string;
    expressionUrl?: any;
    beRepliedExpressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    grade?: any;
    resourceType: number;
    userBizLevels?: any;
}

export interface MessageCommentResult {
    code: number;
    total: number;
    comments: MessageComment[];
    more: boolean;
}


// @我  待补充
export interface MeesageMentionResult {
    newCount: number;
    lasttime: number;
    more: boolean;
    forwards: any[];
    code: number;
}


// 通知
export interface User1 {
    locationInfo?: any;
    avatarUrl: string;
    userId: number;
    nickname: string;
    authStatus: number;
    expertTags?: any;
    userType: number;
    remarkName?: any;
    vipType: number;
    experts?: any;
}

export interface Comment {
    user: User1;
    beRepliedUser?: any;
    commentId: number;
    parentCommentId: number;
    content: string;
    time: number;
    expressionUrl?: any;
    resourceType: number;
    threadId: string;
}

export interface User2 {
    djStatus: number;
    backgroundUrl: string;
    backgroundImgId: number;
    birthday: number;
    accountStatus: number;
    city: number;
    detailDescription: string;
    defaultAvatar: boolean;
    gender: number;
    avatarImgId: number;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    avatarDetail?: any;
    userType: number;
    nickname: string;
    followed: boolean;
    avatarUrl: string;
    remarkName?: any;
    mutual: boolean;
    province: number;
    authStatus: number;
    expertTags?: any;
    vipType: number;
    experts?: any;
    userId: number;
    description: string;
    signature: string;
    authority: number;
    anonym: boolean;
}

export interface Notice1 {
    specialType?: any;
    comment: Comment;
    type: number;
    user: User2;
}

export interface Notice {
    queued: boolean;
    id: number;
    userId: number;
    time: number;
    notice: any;
    pushMsg?: any;
    type: number;
}

export interface MessageNotificationResult {
    notices: Notice[];
    more: boolean;
    code: number;
}
