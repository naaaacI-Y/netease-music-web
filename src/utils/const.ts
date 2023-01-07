type obj = { [key: string]: number }
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
const areaList: obj = {
    "全部": 0, "内地": 1, "港台": 2, "欧美": 3, "日本": 4, "韩国": 5
}
const typeList: obj = {
    "全部": 0, "官方版": 1, "原声": 2, "现场版": 3, "网易出品": 4
}
const videoTypes: obj = {
    "现场": 0, "翻唱": 1, "舞蹈": 2, "听BGM": 3, "MV": 4, "生活": 5, "游戏": 6, "ACG音乐": 7, "最佳饭制": 8
}
const sortList: obj = {
    "上升最快": 0, "最热": 1, "最新": 2
}
const newestMusicType = {
    0: "全部",
    7: "华语",
    96: "欧美",
    8: "日本",
    16: "韩国"
}
const songMenuTypes: obj = {
    "华语": 0, "流行": 1, "摇滚": 2, "民谣": 3, "电子": 4, "另类/独立": 5, "轻音乐": 6, "综艺": 7, "影视原声": 8, "ACG": 9
}
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
