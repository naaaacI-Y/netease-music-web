import { stringifyParams } from "@/utils"
import http from "../../http"
import { AllMvParam, MvDetailParam, MvDetailResult, MvInfoResult, MVItem, MVResult, MvUrlParam, MvUrlResult, NetProductParam, newMvParam, RecommendMvResult } from "./types"


/**
 * 所有mv
 * @param params
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns
 */
export const getAllMv = (params: AllMvParam) => {
    return http.get<MVResult>(`/mv/all${stringifyParams(params)}`)
}


/**
 * 最新mv
 * @param params
 * 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * 可选参数 : limit: 取出数量 , 默认为 30
 * @returns
 */
export const getNewMv = (params: newMvParam) => {
    return http.get<MVResult>(`/mv/first${stringifyParams(params)}`)
}

/**
 * 网易出品mv
 * @param params
 * 可选参数 : limit: 取出数量 , 默认为 30
 *           offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns
 */
export const getNetProdMV = (params: NetProductParam) => {
    return http.get<MVResult>(`/mv/exclusive/rcmd${stringifyParams(params)}`)
}

/**
 * 推荐mv
 * @returns
 */
export const getRecommendMv = () => {
    return http.get<RecommendMvResult>(`/personalized/mv`)
}


/**
 * mv详情
 * @param params
 * mvid: mv id
 * @returns
 */
export const getMvDetail = (params: MvDetailParam) => {
    return http.get<MvDetailResult>(`/mv/detail${stringifyParams(params)}`)
}



/**
 * 获取mv播放url
 * @param params
 * 必选参数 : id: mv id
 * 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @returns
 */
export const getMvUrl = (params: MvUrlParam) => {
    return http.get<MvUrlResult>(`/mv/url${stringifyParams(params)}`)
}


/**
 * 获取 mv 点赞转发评论数数据
 * @param params
 * @returns
 */
export const getMvInfo = (params: MvDetailParam) => {
    return http.get<MvInfoResult>(`/mv/url${stringifyParams(params)}`)
}