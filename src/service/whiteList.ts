// 请求不需要缓存的列表
const whiteList = [
    "/login/qr/key",
    "/login/qr/create",
    "/login/qr/check",
    "/follow",
    "/video/group",
    "/video/detail/info", // 视频点赞相关数量数据
    "/video/detail", // 视频详情
    "/video/sub", // 视频收藏
    "/mv/sub", // mv收藏
    "/comment/hot",
    "/resource/like",// 视频/mv/动态点赞
    "/mv/sublist", // 收藏的视频
    "/album", // 获取专辑详情
    "/mv/detail/info", // mv点赞数据相关
    "/album/sub", // 专辑收藏
    "/comment/album", // 专辑评论
    "/album/detail/dynamic", // 专辑动态信息 收藏相关
    "/comment/playlist", // 获取歌单评论
    "/playlist/subscribe", // 歌单收藏取消
    "/comment/like", // 评论点赞
    "/playlist/detail", // 获取歌单详情，和收藏有关
    "/comment", // 评论
]
export default whiteList