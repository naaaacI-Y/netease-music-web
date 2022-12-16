import { stringifyParams } from "@/utils"
import http from "../../http"
import { RecommendNewMusicResult } from "./type"

/**
 * 推荐--最新音乐 10条
 * @returns
 */
export const getRecommendNewMusic = () => {
    return http.get<RecommendNewMusicResult>("/personalized/newsong")
}