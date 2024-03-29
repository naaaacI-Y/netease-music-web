
import http from "../../http"
import * as T from "./types"


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
export const getAllMv = (params?: T.AllMvParam) => {
    return http.get<T.MVResult>(`/mv/all`, params || {})
}


/**
 * 最新mv
 * @param params
 * 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * 可选参数 : limit: 取出数量 , 默认为 30
 * @returns
 */
export const getNewMv = (params: T.newMvParam) => {
    return http.get<T.MVResult>(`/mv/first`, params)
}

/**
 * 网易出品mv
 * @param params
 * 可选参数 : limit: 取出数量 , 默认为 30
 *           offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns
 */
export const getNetProdMV = (params?: T.NetProductParam) => {
    return http.get<T.MVResult>(`/mv/exclusive/rcmd`, params || {})
}

/**
 * 推荐mv
 * @returns
 */
export const getRecommendMv = () => {
    return http.get<T.RecommendMvResult>(`/personalized/mv`)
}

/**
 * 获取相似mv
 * @param params mvid
 * @returns
 */
export const getSimilarMv = (params: T.SimilarMVParams) => {
    return http.get<T.SimilarMVResult>(`/simi/mv`, params)
}

/**
 * mv详情
 * @param params
 * mvid: mv id
 * @returns
 */
export const getMvDetail = (params: T.MvDetailParam) => {
    return http.get<T.MvDetailResult>(`/mv/detail`, params)
}


/**
 * 获取mv播放url
 * @param params
 * 必选参数 : id: mv id
 * 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @returns
 */
export const getMvUrl = (params: T.MvUrlParam) => {
    return http.get<T.MvUrlResult>(`/mv/url`, params)
}


/**
 * 获取 mv 点赞转发评论数数据
 * @param params
 * @returns
 */
export const getMvInfo = (params: T.MvDetailParam) => {
    return http.get<T.MvInfoResult>(`/mv/detail/info`, params)
}


/**
 * mv评论
 * @param params
 * id: mvid
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns
 */
export const getComment4MV = (params: T.MVCommentParams) => {
    return http.get<T.MVCommentResult>(`/comment/mv`, params)
}