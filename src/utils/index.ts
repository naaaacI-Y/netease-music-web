
import useStore from "@/store";
import { useRoute } from "vue-router";

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
    const interval = Date.now() - time
    const dayInterval = new Date().getDate() - new Date(time).getDate()
    const yearInterval = new Date().getFullYear() - new Date(time).getFullYear()
    const monthInterval = new Date().getMonth() - new Date(time).getMonth()
    // 大于一年 2012年11月20日 14:00
    if (yearInterval) {
        const format = formatTime(time, 'yyyy年MM月dd日 hh:mm')
        return format
    }
    // 时间间隔超过一天
    if (interval > 3600 * 24 * 1000) {
        // 天数间隔 1 并且月间隔 0
        if (dayInterval === 1 && monthInterval === 0) {
            return `昨天 ${formatTime(time, 'hh:mm')}`
        }
        return formatTime(time, 'MM月dd日 hh:mm')
    }
    // 天数间隔 1 时间间隔小于 1天
    if (dayInterval === 1) {
        return `昨天 ${formatTime(time, 'hh:mm')}`
    }
    // 天数间隔等于0 时间间隔小于 1天 14:00
    if (dayInterval === 0) {
        return `${formatTime(time, 'hh:mm')}`
    }
    // 大于一小时
    if (interval > 3600 * 1000) {
        return formatTime(time, 'hh:mm')
    }
    // 一个小时之内 显示 多少分钟前
    if (interval > 60 * 1000) {
        return `${(interval / 1000 / 60) | 0}分钟前`
    }
    // 1分钟以内
    return '刚刚'
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

/**
 * 检查是否登录
 * @returns
 */
const checkLogin = () => {
    const store = useStore()
    const isLogin = store.userProfile.userFile?.userId
    if (!isLogin) {
        store.globalState.isShowLoginBox = true
        return false
    }
    return true
}

/**
 * 获取查询id
 */
const getQueryId = () => {
    const route = useRoute()
    return Number(route.query.id)
}
const shuffleAList = (list: number[]) => {
    let sortsList = list.map(t => t);
    for (let i = 1; i < sortsList.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [sortsList[i], sortsList[random]] = [sortsList[random], sortsList[i]];
    }
    return sortsList
    // let newSorts: { [key: string]: any } = {};
    // list.map(track => {
    //     newSorts[track] = sortsList.pop();
    // });
    // return newSorts;
}
const throttle = (func: Function, delay: number = 200) => {
    // 第一次触发时间戳
    let startTime = Date.now();
    return (...args: any[]) => {
        // 如果不是剪头函数可以使用arguments获取参数，这样就不用写形参了考虑形参个数了
        // let args = arguments;
        // 再次触发时间
        let curTime = Date.now();
        // 间隔时间 = 延迟的时间 - （再次触发时间戳 - 第一次触发时间戳）
        let interval = delay - (curTime - startTime);
        if (interval <= 0) {
            // 重新计算开始时间
            startTime = Date.now();
            return func(...args);
        }
    };
};
export {
    formatTime,
    stringifyParams,
    formatSongTime,
    calcTime,
    formatPlayCount,
    checkLogin,
    getQueryId,
    throttle,
    shuffleAList
}