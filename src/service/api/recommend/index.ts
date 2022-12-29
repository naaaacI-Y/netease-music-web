import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"

/**
 * 推荐--最新音乐 10条
 * @returns
 */
export const getRecommendNewMusic = () => {
    return http.get<T.RecommendNewMusicResult>("/personalized/newsong")
}

/**
 * 推荐-独家放送
 */
export const getUniquereCommend = () => {
    return http.get<T.UniqueRecommendResult>("/personalized/privatecontent")
}


/**
 * 独家放送列表
 * @param params  limit : 返回数量 , 默认为 60
 * @param params  offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
 * @returns
 */
export const getUniquereCommendList = (params: T.UniqueRecommendListParam) => {
    return http.get<T.UniqueRecommendListRresult>(`/personalized/privatecontent/list`)
}


/**
 * 获取每日推荐歌单
 * @returns
 */
export const getDayRecommendSongList = () => {
    return http.get<T.DayRecommendSongListResult>(`/recommend/resource`)
}