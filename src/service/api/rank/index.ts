import { stringifyParams } from "@/utils"
import http from "../../http"
import * as T from "./types"

export const getAllRank = () => {
    return http.get<T.AllRankResult>('/toplist')
}