import http from "../../http"
import * as T from "./types"
import { stringifyParams } from "@/utils"
/**
 * 私人 FM
 * @returns
 */
export const personalFM = () => {
    return http.get<T.PersoanalFMResult>('/personal_fm')
}

/**
 * 垃圾桶
 * @param params
 * 必选参数 : id: 歌曲 id
 * @returns
 */
export const fmTrash = (params: T.FmTrashParams) => {
    return http.get<T.FmTrashResult>(`/fm_trash${stringifyParams(params)}`)
}