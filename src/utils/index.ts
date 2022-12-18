

/**
 * 日期格式化
 * @param time 时间戳
 * @param format yyy-Mm-dd hh:mm:ss
 * @returns
 */
const formatTime = (time: number, format: string) => {
    let t = new Date(time);
    if (t) {
        var date: { [key: string]: any } = {
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "h+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds(),
            "q+": Math.floor((t.getMonth() + 3) / 3),
            "S+": t.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(
                RegExp.$1,
                (t.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? date[k]
                        : ("00" + date[k]).substr(("" + date[k]).length)
                );
            }
        }
        return format;

    }
    return "";
}

/**
 * 计算回复时间
 * @param time 时间戳
 * @returns
 */
const calcTime = (time: number) => {
    const interval = time - Date.now()
    const dayInterval = new Date(time).getDate() - new Date().getDate()
    // 大于一年 2012年11月20日 14:00
    if (interval > 365 * 24 * 3600 * 1000) {
        const format = formatTime(time, "yyyy年MM月dd日 hh:mm")
        return format
    }
    // 天数相隔大于1 12月16日 14:00
    if (dayInterval > 1) {
        return formatTime(time, "MM月dd日 HH:mm")
    }
    // 天数间隔等于1 昨天 14:00
    if (dayInterval === 1) {
        return `昨天 ${formatTime(time, "hh:mm")}`
    }
    // 大于一小时
    if (interval > 3600 * 1000) {
        return formatTime(time, "hh:mm")
    }
    // 一个小时之内 显示 多少分钟前
    if (interval > 60 * 1000) {
        return `${((interval) / 1000 / 60) | 0}分钟前`
    }
    // 1分钟以内
    return "刚刚"


}

/**
 * 序列化请求参数
 * @param obj key:value
 * @returns
 */
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

/**
 * 格式化歌曲/视频时长
 * @param time 时间戳
 * @returns
 */
const formatSongTime = (time: number) => {
    const minute = time / 1000 / 60 | 0
    const second = time / 1000 % 60 | 0
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}

/**
 * 格式化播放次数
 * 大于10万
 * 大于1亿
 * @param count
 */
const formatPlayCount = (count: number) => {
    if (count > 100000000) {
        return `${count / 100000000 | 1}亿`
    }
    if (count > 100000) {
        return `${count / 10000 | 1}万`
    }
    return count
}
export {
    formatTime,
    stringifyParams,
    formatSongTime,
    calcTime,
    formatPlayCount
}