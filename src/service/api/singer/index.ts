import { stringifyParams } from "@/utils"
import http from "../../http"
import { CollectedAlbumParams } from "../album/types"
import * as T from "./types"


/**
 * 获取歌手单曲，可获得歌手部分信息和热门歌曲
 * @param params
 * id: 歌手id
 * @returns
 */
export const getSingelSingerSong = (params: T.SingelSingerSongParam) => {
    return http.get<T.SingelSingerSongResult>(`/artists${stringifyParams(params)}`)
}

/**
 * 获取歌手 mv
 * @param params
 * id: 歌手id
 * @returns
 */
export const getSingerMv = (params: T.SingelSingerSongParam) => {
    return http.get<T.SingerMvResult>(`/artist/mv${stringifyParams(params)}`)
}


/**
 * 获取歌手专辑
 * @param params
 * id: 歌手id
 * 可选参数 : limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns
 */
export const getSingerAlbum = (params: T.SingerAlbumParam) => {
    return http.get<T.SingerAlbumresult>(`/artist/album${stringifyParams(params)}`)
}

/**
 * 获取歌手描述
 * @param params
 * id: 歌手id
 * @returns
 */
export const getSingerDes = (params: T.SingelSingerSongParam) => {
    return http.get<T.SingerDesResult>(`/artist/desc${stringifyParams(params)}`)
}

/**
 * 获取相似歌手
 * @param params
 * @returns
 */
export const getSimilarSinger = (params: T.SingelSingerSongParam) => {
    return http.get<T.SimilarSingerResult>(`/simi/artist${stringifyParams(params)}`)
}


/**
 * 歌手分类列表
 * @param params
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
 * type: -1:全部 1:男歌手 2:女歌手 3:乐队
 * area: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @returns
 */
export const getSingerByCategory = (params: T.SingerCategoryParam) => {
    return http.get<T.SingerCategoryResult>(`/artist/list${stringifyParams(params)}`)
}

/**
 * 收藏/取消收藏 歌手
 * @param params
 * id : 歌手 id
 * t:操作,1 为收藏,其他为取消收藏
 * @returns
 */
export const collectOrCancelSinger = (params: T.CollectorCancelSingerParam) => {
    return http.get<T.CollectorCancelSingerResult>(`/artist/sub${stringifyParams(params)}`)
}

/**
 * 歌手热门 50 首歌曲
 * @param params
 * @returns
 */
export const getSingerTopSong = (params: T.SingelSingerSongParam) => {
    return http.get<T.SingerTopSongResult>(`/artist/top/song${stringifyParams(params)}`)
}

// 收藏的歌手列表 TODO


/**
 * 歌手粉丝
 * @param params
 * @returns
 */
export const getSingerFans = (params: T.SingerFansParam) => {
    return http.get<T.SingerFansResult>(`/artist/fans${stringifyParams(params)}`)
}

/**
 * 收藏的歌手列表
 * @returns
 */
export const getCollectedSinger = (params: CollectedAlbumParams) => {
    return http.get<T.CollectedSingerResult>(`/artist/sublist${stringifyParams(params)}`)
}