// 请求不需要缓存的列表
const whiteList = [
    "/login/qr/key",
    "/login/qr/create",
    "/login/qr/check",
    "/follow",
    "/video/group",
    "", // 获取评论
    "/playlist/subscribe", // 歌单收藏取消
    "/playlist/detail", // 获取歌单详情，和收藏有关
]
export default whiteList