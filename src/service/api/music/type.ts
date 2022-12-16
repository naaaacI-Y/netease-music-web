import { newestMusicType } from "@/utils/const";
import { Album, Artist, SqMusic } from "../recommend/type";

export type typeList = keyof typeof newestMusicType

export interface NewMusicParam {
    type: number
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
    privilege: Privilege;
}

export interface NewMusicResult {
    data: NewMusicRet[];
    code: number;
}