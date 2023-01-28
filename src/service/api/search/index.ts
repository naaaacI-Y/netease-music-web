
import http from "../../http"
import * as T from "./types"

/**
 * 热搜列表(详细)
 * @returns
 */
export const getHotSearchList = () => {
    return http.get<T.HotSearchListResult>("/search/hot/detail")
}

/**
 * 搜索建议
 * @param params
 * keywords:关键字
 * @returns
 */
export const searchSuggest = (params: T.SearchSuggestParams) => {
    return http.get<T.SearchSuggestResult>(`/search/suggest`, params)
}

/**
 * 搜索 点击 搜"xxx"的结果进入的具体页面 按照类型
 * @param params
 * 必选参数 : keywords : 关键词
 * 可选参数 : limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @returns
 */
export const searchByType = (params: T.SearchParams) => {
    return http.get<T.SearchResult>(`/cloudsearch`, params)
}

