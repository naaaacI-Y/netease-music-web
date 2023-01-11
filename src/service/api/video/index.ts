import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"

/**
 * 获取视频分类标签列表
 * @returns
 */
export const getVideoLabelList = () => {
    return http.get<T.VideoGroupListResult>('/video/group/list')
}


/**
 * 获取相关视频
 * @param params
 * @returns
 */
export const getRelatedVideo = (params: T.RelatedVideoParams) => {
    return http.get<T.RelatedVideoResult>(`/related/allvideo${stringifyParams(params)}`)
}


/**
 * 获取视频详情
 * @param params
 * id: 视频id
 * @returns
 */
export const getVideoDetail = (params: T.RelatedVideoParams) => {
    return http.get<T.VideoDetailResult>(`/video/detail${stringifyParams(params)}`)
}

/**
 * 获取视频点赞转发评论数数据
 * @param params
 * vid: video id
 * @returns
 */
export const getVieoCountInfo = (params: T.VideoCountInfoParam) => {
    return http.get<T.VideoCountInfo>(`/video/detail${stringifyParams(params)}`)
}


/**
 * 获取视频播放url
 * @param params
 * vid: video id
 * @returns
 */
export const getVideoPlayUrl = (params: T.RelatedVideoParams) => {
    return http.get<T.VideoPlayUrlResult>(`/video/url${stringifyParams(params)}`)
}


/**
 * 获取视频标签/分类下的视频
 * @param params
 * 必选参数 : id: videoGroup 的 id
 * 可选参数 : offset: 默认 0
 * @returns
 */
export const getVideoByCategory = (params: T.VideoByCategoryParam) => {
    return http.get<T.VideoByCategoryResult>(`/video/group${stringifyParams(params)}&timestamp=${Date.now()}`)
}


/**
 * 获取视频评论
 * @param params
 * id string
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns
 */
export const getComment4Video = (params: T.VideoCommentParams) => {
    return http.get<T.VideoCommentResult>(`/comment/video${stringifyParams(params)}`)
}