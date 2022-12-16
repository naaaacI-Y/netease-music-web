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

const setUserInfo = (userInfo: profile) => {
    localStorage.setItem("user-info", JSON.stringify(userInfo))
}

const removeUserInfo = () => {
    localStorage.removeItem("user-info")
}

const isLogin = () => {
    return !!localStorage.getItem("user-info")
}
export {
    formatTime,
    stringifyParams,
    setUserInfo,
    removeUserInfo,
    isLogin
}