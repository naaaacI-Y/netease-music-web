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
export const getVideoPlayUrl = (params: T.VideoCountInfoParam) => {
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
    return http.get<T.VideoByCategoryResult>(`/video/group${stringifyParams(params)}`)
}