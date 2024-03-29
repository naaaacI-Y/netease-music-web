


import useStore from "@/store";
import { useRoute } from "vue-router";
import cityInfo from "./CITY";
import { Artist } from "@/service/api/singer/types"
import { UniqueRecommendRet } from '@/service/api/recommend/types';
import { VideoByCategoryItem } from "@/service/api/video/types";
import { Playlist } from "@/service/api/music/types";
import { Video } from "@/service/api/search/types";

type FormatList<T> = { id: number | string, dataList: T[] }[]
/**
 * 日期格式化
 * @param time 时间戳
 * @param format yyy-Mm-dd hh:mm:ss
 * @param flag boolean 是否需要裁切时间 年内的显示日月
 * @returns
 */
const formatTime = (time: number, format: string, flag?: boolean) => {
    let t = new Date(time);
    if (t) {
        const year = t.getFullYear()
        const now_year = new Date().getFullYear()
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
                (year + "").substr(4 - RegExp.$1.length)
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
        if (flag) {
            return year < now_year ? format.split(" ")[0] : format.split(" ")[0].split("年")[1]
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
    const isLogin = store.userProfile.userFile?.profile?.userId
    if (!isLogin) {
        return false
    }
    return true
}

/**
 * 获取查询id
 */
const getQueryId = () => {
    const route = useRoute()
    return Number(route?.query.id) || Number(route?.params.id) || route?.params.id
}
const shuffleAList = (list: number[]) => {
    let sortsList = list.map(t => t);
    for (let i = 1; i < sortsList.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [sortsList[i], sortsList[random]] = [sortsList[random], sortsList[i]];
    }
    return sortsList
}
const throttle = (fn: Function, wait = 100) => {
    let timer: number
    return function (...args: any[]) {
        if (timer) return
        timer = Number(setTimeout(() => {
            fn.apply(null, args)
            clearTimeout(timer)
            timer = null as unknown as number
        }, wait))
    }
}


// 获取本地历史搜索记录
const getSearchHistory = () => {
    const his = localStorage.getItem("searchHistory")
    return his ? JSON.parse(his) : ""
}
// 设置本地历史搜索记录
const setSearchHistory = (item: string) => {
    if (item) {
        const hisString = localStorage.getItem("searchHistory")
        const his = hisString ? JSON.parse(hisString) : {}
        const isExist = his[item]
        if (!isExist) {
            his[item] = item
        }
        localStorage.setItem("searchHistory", JSON.stringify(his))
    }

}
const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory")
}


const debounce = (fn: Function, wait = 100) => {
    let timer: number
    return function (...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = Number(setTimeout(() => {
            fn.apply(null, args)
        }, wait))
    }
}
// 获取所在地区
const getArea = (province: number, city: number) => {
    const index = cityInfo.findIndex(item => item.id === province)
    if (index === -1) {
        return ""
    }
    const _p = cityInfo[index].name
    const _c = cityInfo[index].cities[String(city)]
    return `${_p} ${_c}`
}
// 滚动到顶部
const scrollToTop = (wrapClass = "content", top?: number) => {
    const wrap = document.getElementsByClassName(wrapClass)[0]
    if (!top) {
        wrap?.scrollTo(0, 0)
    } else {
        wrap?.scrollTo(0, top)
    }
}

// 格式化图片url
const formatPicUrl = (url: string, width: number, height: number) => {
    return `${url}?param=${width}y${height}`
}

// 序号填充
const paddingLeft = (num: number) => {
    if (num < 10) return `0${num}`
    return num
}


// 格式化列表数据供RecycleScroller使用
const formatListData = <T extends UniqueRecommendRet | Artist | VideoByCategoryItem | Playlist | Video>(data: T[], len = 4) => {
    const list: FormatList<T> = Array.from({ length: Math.ceil(data.length / len) }, (_, index) => {
        return { id: -1, dataList: [] }
    })
    for (let i = 0; i < data.length; i++) {
        const idx = parseInt(String(i / len))
        if (list[idx].id === -1) {
            if (!data[i].id) {
                list[idx].id = Math.round(Math.random() * 20000 + 10000);
            } else {
                list[idx].id = data[i].id!
            }
        }

        list[idx].dataList.push(data[i])
    }
    return list
}

// 匹配颜色高亮
function keywordsColorful(str: string, key: string) {
    var reg = new RegExp("(" + key + ")", "g");
    var newstr = str.replace(reg, "<font style='color:#2757aa;'>$1</font>");
    return newstr;
}


// 获取cookie的过期时间 并存储
const setCookieExpireTime = (cookie: string) => {
    const splitList = cookie.split(';')
    const index = splitList.findIndex(item => item.startsWith('__csrf'))
    const _ = splitList[index + 2].split("=")[1] //
    localStorage.setItem("expireTime", new Date(_).getTime().toString())
}


export {
    formatTime,
    formatSongTime,
    calcTime,
    formatPlayCount,
    checkLogin,
    getQueryId,
    debounce,
    throttle,
    shuffleAList,
    getSearchHistory,
    setSearchHistory,
    clearSearchHistory,
    getArea,
    scrollToTop,
    formatPicUrl,
    paddingLeft,
    formatListData,
    setCookieExpireTime,
    keywordsColorful,
    FormatList
}