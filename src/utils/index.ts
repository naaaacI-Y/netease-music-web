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
export {
    formatTime,
    stringifyParams
}