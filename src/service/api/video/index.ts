import { stringifyParams } from "@/utils"
import http from "../../http"
import { RelatedVideoParams, RelatedVideoResult, VideoByCategoryParam, VideoByCategoryResult, VideoCountInfo, VideoCountInfoParam, VideoDetailResult, VideoGroupListResult, VideoPlayUrlResult } from "./types"

/**
 * 获取视频分类标签列表
 * @returns
 */
export const getVideoLabelList = () => {
    return http.get<VideoGroupListResult>('/video/group/list')
}


/**
 * 获取相关视频
 * @param params
 * @returns
 */
export const getRelatedVideo = (params: RelatedVideoParams) => {
    return http.get<RelatedVideoResult>(`/related/allvideo${stringifyParams(params)}`)
}


/**
 * 获取视频详情
 * @param params
 * id: 视频id
 * @returns
 */
export const getVideoDetail = (params: RelatedVideoParams) => {
    return http.get<VideoDetailResult>(`/video/detail${stringifyParams(params)}`)
}

/**
 * 获取视频点赞转发评论数数据
 * @param params
 * vid: video id
 * @returns
 */
export const getVieoCountInfo = (params: VideoCountInfoParam) => {
    return http.get<VideoCountInfo>(`/video/detail${stringifyParams(params)}`)
}


/**
 * 获取视频播放url
 * @param params
 * vid: video id
 * @returns
 */
export const getVideoPlayUrl = (params: VideoCountInfoParam) => {
    return http.get<VideoPlayUrlResult>(`/video/url${stringifyParams(params)}`)
}


/**
 * 获取视频标签/分类下的视频
 * @param params
 * 必选参数 : id: videoGroup 的 id
 * 可选参数 : offset: 默认 0
 * @returns
 */
export const getVideoByCategory = (params: VideoByCategoryParam) => {
    return http.get<VideoByCategoryResult>(`/video/group${stringifyParams(params)}`)
}