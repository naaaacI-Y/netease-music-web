type obj = { [key: string]: number }
const alphaString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").reduce((cur: { [key: string]: number | string }, next) => {
    if (next === "#") {
        cur[next] = 0
    } else {
        cur[next] = next.toLocaleLowerCase()
    }

    return cur
}, {})
const firstPagePath = [
    "/findMusic/personal-recommend",
    "/findMusic/song-menu",
    "/findMusic/host-radio",
    "/findMusic/rank",
    "/findMusic/singer",
    "/findMusic/newest-music",
    "/my-collection/1",
    "/my-collection/2",
    "/my-collection/3"
]

// 轮播图类型
// 1000: 歌单 ==> 跳转歌单页面
// 1: 新歌首发 ==> 播放音乐
// 10: 新碟 ==> 跳转歌单页面
// 3000 : 数字专辑
//
const enum BannerType {
    NEWSONG = 1,
    NEWCARD = 10,
    SONGLIST = 1000,
    NUMBERALBUM = 3000
}

// 头部导航栏左侧相关路径
const paths = ["/findMusic", "/video", "/friends", "/prettyCommon", "/unique", "/dynamic", "/focus", "/fans", "/hot-comment", "/recent-play"]

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
    "现场": 0, "翻唱": 1, "舞蹈": 2, "听BGM": 3,
    //  "MV": 4, // mv获取的数据有问题，不知道是不是结构不相同的原因 TODO
    "生活": 5,
    "游戏": 6, "ACG音乐": 7, "最佳饭制": 8
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
const labelListMap = ["歌曲列表", "评论", "收藏者"] // 歌单tab
const labelList = ["专辑", "MV", "歌手详情", "相似歌手"]
const tabsComponents = ["Album", "Lyric", "Singer", "Video", "Song", "User", "Radio", "SongList"] as const
const messageComponents = ["PrivateMessage", "CommentMessage", "MentionMessage", "NotificationMessage"] as const
const messageTypeList: { [key: string]: { component: typeof messageComponents[number] } } = {
    "私信": {
        component: "PrivateMessage"
    },
    "评论": {
        component: "CommentMessage"
    },
    "@我": {
        component: "MentionMessage"
    },
    "通知": {
        component: "NotificationMessage"
    }
}
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
// 动态部分暂时不做展示，需要屏蔽TODO
const dynamicMap: { [key: string]: string } = {
    "18": "分享单曲",
    // "19": "分享专辑",
    // "17": "分享电台节目",
    // "28": "分享电台节目",
    // "22": "转发",
    // "39": "发布视频",
    // "35": "分享歌单",
    // "13": "分享歌单",
    // "24": "分享专栏文章",
    // "41": "分享视频",
    // "21": "分享视频"
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
    searchTypeList,
    dynamicMap,
    firstPagePath,
    labelListMap,
    paths,
    messageTypeList,
    BannerType

}
