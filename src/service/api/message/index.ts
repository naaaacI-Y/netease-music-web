import http from "../../http"
import * as T from "./types"

/**
 * 通知-私信
 * @param params limit : 返回数量 , 默认为 30
 * @param params offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @returns {PrivateResult}
 */
export const getMessagePrivateInfo = (params: T.QueryParam) => {
    return http.get<T.PrivateResult>(`/msg/private`, params)
}

/**
 * 通知-评论
 * @param params limit : 返回数量 , 默认为 30
 * @param params offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @returns {MessageCommentResult}
 */
export const getMessageComment = (params: T.QueryParam & { uid: number }) => {
    return http.get<T.MessageCommentResult>(`/msg/comments`, params)
}

/**
 * 通知- `@我`
 * @param params limit : 返回数量 , 默认为 30
 * @param params offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @returns {MeesageMentionResult}
 */
export const getMessageMention = (params: T.QueryParam) => {
    return http.get<T.MeesageMentionResult>(`/msg/forwards`, params)
}

/**
 * 通知-通知
 * @param params limit : 返回数量 , 默认为 30
 * @param params offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @returns {MessageNotificationResult}
 */
export const getMessageNotification = (params: T.QueryParam) => {
    return http.get<T.MessageNotificationResult>(`/msg/notices`, params)
}
