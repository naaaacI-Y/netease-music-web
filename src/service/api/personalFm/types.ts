
import { Artist, Song } from "../recommend/types";

// 私人fm
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

export interface PersoanalFMResult {
    popAdjust: boolean;
    data: Song[];
    code: number;
}


// 垃圾桶
export interface FmTrashParams {
    id: number
}

export interface FmTrashResult {
    code: number
    count: number
    songs: any[]
}