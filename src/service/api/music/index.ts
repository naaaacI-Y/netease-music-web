import { stringifyParams } from "@/utils"
import http from "../../http"
import { NewMusicParam, NewMusicResult } from "./type"


/**
 * 新歌速递
 * @param params
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * @returns
 */
export const getNewMusic = (params: NewMusicParam) => {
    return http.get<NewMusicResult>(`/top/song${stringifyParams(params)}`)
}