import { BeReplied, Comment } from "@/service/api/comment/types"

// 评论结构
const structure = {
    user: "" as any,
    beReplied: [] as BeReplied[],
    pendantData: {
        id: 0,
        imageUrl: ""
    },
    showFloorComment: "",
    status: 0,
    commentId: -1,
    content: "",
    richContent: "",
    time: -1,
    timeStr: "",
    needDisplayTime: false,
    likedCount: 0,
    commentLocationType: 0,
    parentCommentId: -1,
    decoration: {
        repliedByAuthorCount: 0
    },
    liked: false,
    ipLocation: {
        ip: "",
        location: "",
        userId: -1
    }
}

/**
 * 构造评论数据
 * @param commentData  接口返回的评论数据
 * @return Comment
 */
const useInsertComment = (commentData: any) => {
    const dt = JSON.parse(JSON.stringify(commentData))
    const result = Object.assign({}, structure) as Comment
    for (const key in dt) {
        if (key === "beRepliedUser" && dt[key]) {
            (result as any)["beReplied"] = [{ user: { ...dt[key] }, content: dt[key].content }] // 还要带上原评论内容
            continue
        }
        (result as any)[key] = dt[key]
    }
    return result
}
export default useInsertComment