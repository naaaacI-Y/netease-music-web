export interface ConfigType {
    icon?: string
    content?: string
    duration?: number
    type: string

    isCancelCollect?: boolean
    singerId?: number // 歌手id
    mvid?: number // mvid
    songListId?: number // 歌单id
    albumId?: number // 专辑id
    commentId?: number
    sType?: number
    t?: number
    title?: string
    replyName?: string
    queryId?: number
}