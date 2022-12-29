import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"


/**
 * 获取专辑详情
 * @param params id 专辑id
 * @returns
 */
export const getAlbumInfo = (params: T.AlbumDetailParam) => {
    return http.get<T.AlbumDetailResult>(`/album${stringifyParams(params)}`)
}

/**
 * 收藏/取消收藏专辑
 * @param params id 专辑id
 * @param params  1 为收藏,0为取消收藏
 * @returns
 */
export const CollectOrCancelAlbum = (params: T.AlbumDetailParam & { t: number }) => {
    return http.get<T.CollectOrCancelAlbumResult>(`/album/sub${stringifyParams(params)}`)
}

/**
 * 获取已收藏专辑列表
 * @param params
 * limit: 取出数量 , 默认为 25
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
 * @returns
 */
export const getCollectedAlbum = (params: T.CollectedAlbumParams) => {
    return http.get<T.CollectedAlbumResult>(`/album/sublist${stringifyParams(params)}`)
}


/**
 * 获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * @param params id 专辑id
 * @returns
 */
export const getAlbumDynamicInfo = (params: T.AlbumDetailParam) => {
    return http.get<T.AlbumDynamicInfoResult>(`/album/detail/dynamic${stringifyParams(params)}`)
}


/**
 * 获取专辑评论
 * @param params
 * 必选参数 : id: 专辑 id
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns
 */
export const getAlbumComment = (params: T.AlbumCommentParams) => {
    return http.get<T.AlbumCommentResult>(`/comment/album${stringifyParams(params)}`)
}