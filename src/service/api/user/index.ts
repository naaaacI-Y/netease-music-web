import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"

/**
 * 获取用户详情 by id
 * @param params uid
 * @returns
 */
export const getUserDetailById = (params: T.UserDetailParams) => {
    return http.get<T.UserDetailByIdResult>(`/user/detail${stringifyParams(params)}`)
}

/**
 * 获取用户关注列表
 * @param params
 * @returns
 */
export const getFocusList = (params: T.UserFocusListParams) => {
    return http.get<T.UserFocusListResult>(`/user/follows${stringifyParams(params)}`)
}

/**
 * 获取用户粉丝列表
 * @param params
 * @returns
 */
export const getFansList = (params: T.UserFocusListParams) => {
    return http.get<T.UserFansListResult>(`/user/followeds${stringifyParams(params)}`)
}


/**
 * 获取用户动态
 * @param params
 * @returns
 */
export const getUserDynamic = (params: T.UserDynamicParams) => {
    return http.get<T.UserDynamicResult>(`/user/event${stringifyParams(params)}`)
}

/**
 * 获取用户歌单
 * @param params
 * 必选参数 : uid : 用户 id
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @returns
 */
export const getSongList = (params: T.UserFocusListParams) => {
    return http.get<T.UserSongListResult>(`/user/playlist${stringifyParams(params)}`)
}


/**
 * 关注/取消关注用户
 * @param params
 * id: number
 * t: 1 关注 0: 取消关注
 * @returns
 */
export const focusOrCancelPerson = (params: T.FocusOrCancelPersonParams) => {
    return http.get<T.FocusOrCancelPersonResult>(`/follow${stringifyParams(params)}`)
}