import { stringifyParams } from "@/utils"
import http from "../../http"
import { RecommendNewMusicResult, UniqueRecommendListParam, UniqueRecommendListRresult, UniqueRecommendResult } from "./type"

/**
 * 推荐--最新音乐 10条
 * @returns
 */
export const getRecommendNewMusic = () => {
    return http.get<RecommendNewMusicResult>("/personalized/newsong")
}

/**
 * 推荐-独家放送
 */
export const getUniquereCommend = () => {
    return http.get<UniqueRecommendResult>("/personalized/privatecontent")
}


/**
 * 独家放送列表
 * @param params  limit : 返回数量 , 默认为 60
 * @param params  offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
 * @returns
 */
export const getUniquereCommendList = (params: UniqueRecommendListParam) => {
    return http.get<UniqueRecommendListRresult>(`/personalized/privatecontent/list`)
}

