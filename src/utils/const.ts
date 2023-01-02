type obj = { [key: string]: number | string }
const alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").reduce((cur: { [key: string]: number | string }, next) => {
    if (next === "#") {
        cur[next] = 0
    } else {
        cur[next] = next.toLocaleLowerCase()
    }

    return cur
}, {})

const languageList: obj = {
    "全部": -1, "华语": 7, "欧美": 96, "日本": 8, "韩国": 16, "其他": 0
}
const categoryList: obj = {
    "全部": -1, "男歌手": 1, "女歌手": 2, "乐队组合": 3
}
const filterList: obj = {
    "热门": -1, ...alphaString
}
const areaList = ["全部", "内地", "港台", "欧美", "日本", "韩国"]
const typeList = ["全部", "官方版", "原声", "现场版", "网易出品"]
const videoTypes = ["现场", "翻唱", "舞蹈", "听BGM", "MV", "生活", "游戏", "ACG音乐", "最佳饭制"]
const sortList = ["上升最快", "最热", "最新"]
const newestMusicType = {
    0: "全部",
    7: "华语",
    96: "欧美",
    8: "日本",
    16: "韩国"
}
const songMenuTypes = ["华语", "流行", "摇滚", "民谣", "电子", "另类/独立", "轻音乐", "综艺", "影视原声", "ACG"]
const labelList = ["专辑", "MV", "歌手详情", "相似歌手", "演出"]
const tabsComponents = ["Album", "Lyric", "Singer", "Video", "Song", "User", "Radio", "SongList"] as const
const searchTypeList: { [key: string]: { id: number, unit: string, component: typeof tabsComponents[number] } } = {
    "单曲": {
        id: 1,
        unit: "首",
        component: "Song"
    },
    "歌手": {
        id: 100,
        unit: "位",
        component: "Singer"
    },
    "专辑": {
        id: 10,
        unit: "张",
        component: "Album"
    },
    "视频": {
        id: 1014,
        unit: "个",
        component: "Video"
    },
    "歌单": {
        id: 1000,
        unit: "个",
        component: "SongList"
    },
    "歌词": {
        id: 1006,
        unit: "首",
        component: "Lyric"
    },
    "主播电台": {
        id: 1009,
        unit: "个",
        component: "Radio"
    },
    "用户": {
        id: 1002,
        unit: "位",
        component: "User"
    }
}

export {
    languageList,
    categoryList,
    filterList,
    areaList,
    typeList,
    sortList,
    videoTypes,
    newestMusicType,
    songMenuTypes,
    labelList,
    searchTypeList
}
