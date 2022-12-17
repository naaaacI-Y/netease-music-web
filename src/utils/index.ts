import { account, profile } from "@/service/api/login/types"

// 日期格式化
const formatTime = () => {

}
const stringifyParams = (obj: object) => {
    let r = "?"
    Object.entries(obj).forEach(item => {
        if (r === "?") {
            r += `${item[0]}=${item[1]}`
        } else {
            r += `&${item[0]}=${item[1]}`
        }

    })
    return r
}

const formatSongTime = (time: number) => {
    const minute = time / 1000 / 60 | 0
    const second = time / 1000 % 60 | 0
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}
export {
    formatTime,
    stringifyParams,
    formatSongTime
}