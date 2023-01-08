import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"


/**
 * 传入资源类型和资源 id,以及排序方式,可获取对应资源的评论
 * "歌曲" | "mv" | "歌单" | "专辑" | "电台节目" | "视频" | "动态" | "电台"
 *
 * @param params
 * @returns
 */
export const getComment = (params: T.AllCommentParam) => {
    return http.get<T.AllCommentResult>(`/comment/new${stringifyParams(params)}`)
}

// 获取楼层评论
// export const getFloorComment = (params: FloorCommentParam) => {
//     return http.get<AllCommentResult>(`/comment/floor${stringifyParams(params)}`)
// }


/**
 * 评论点赞
 * @param params
 * cid : 评论 id
 * t : 是否点赞 , 1 为点赞 ,0 为取消点赞
 * type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * @returns
 */
export const voteComment = (params: T.VoteCommnentParam) => {
    return http.get<T.VoteCommentResult>(`/comment/like${stringifyParams(params)}`)
}


/**
 * 删除/ 发送 / 回复评论
 * @param params
 * t: 0  ==> 删除 1 ==> 发送 2 ==> 回复
 * type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * commentId :回复的评论 id (回复评论时必填)
 * @returns
 */
export const sendOrReplyComment = (params: T.SendOrReplyCommentParam) => {
    return http.get<T.SendOrReplyCommentResult>(`/comment${stringifyParams(params)}`)
}

export const getHotComment = (params: T.HotCommentParams) => {
    return http.get<T.HotCommentResult>(`/comment/hot${stringifyParams(params)}`)
}