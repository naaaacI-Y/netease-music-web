import { Privilege } from "../singer/types";

export interface Artist {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    followed?: boolean;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize?: number;
    topicPerson: number;
    img1v1Id_str?: string;
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
    picId_str: string;
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
    exclusive: boolean;
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

