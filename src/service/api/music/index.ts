import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"


/**
 * 新歌速递
 * @param params
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * @returns
 */
export const getNewMusic = (params: T.NewMusicParam) => {
    return http.get<T.NewMusicResult>(`/top/song${stringifyParams(params)}`)
}


/**
 * 获取歌单
 * @param params
 * 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns
 */
export const getSongList = (params: T.SongListParams) => {
    return http.get<T.SongListResult>(`/top/playlist${stringifyParams(params)}`)
}

/**
 * 获取精品歌单  歌单的头部icon是精品歌单第一个的coverImgUrl
 * @param params
 * 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * limit: 取出歌单数量 , 默认为 50
 * before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @returns
 */
export const getHighqualitySongList = (params: T.HighqualitySongListParams) => {
    return http.get<T.HighqualitySongListResult>(`/top/playlist/highquality${stringifyParams(params)}`)
}

/**
 * 获取歌单详情
 * @param params
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
 * @returns
 */
export const getSongListDetail = (params: T.SongListDetailParams) => {
    return http.get<T.SongListDetailResult>(`/playlist/detail${stringifyParams(params)}`)
}

/**
 * 歌单评论
 * @param params
 * 必选参数 : id: 歌单 id
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns
 */
export const getComment4SongList = (params: T.SongListCommentParams) => {
    return http.get<T.SongListCommentResult>(`/comment/playlist${stringifyParams(params)}`)
}

/**
 * 歌曲评论
 * @param params
 * 必选参数 : id: 歌单 id
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns
 */
export const getComment4Song = (params: T.SongListCommentParams) => {
    return http.get<T.SongListCommentResult>(`/comment/playlist${stringifyParams(params)}`)
}

/**
 * 获取歌单收藏用户
 * @param params
 * @returns
 */
export const getCollectors4SongList = (params: Omit<T.SongListCommentParams, "before">) => {
    return http.get<T.SongListCollectorsResult>(`/playlist/subscribers${stringifyParams(params)}`)
}

/**
 * 获取每日歌曲推荐
 * @returns
 */
export const getDayRecommend = () => {
    return http.get<T.DaliySongResult>(`/recommend/songs`)
}