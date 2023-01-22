import { list } from '@/service/api/comment/types';
import createInstance from './instance';
import type { ConfigType } from './types';

/**
 * 读取配置并渲染 Message
 * @param {Object} conf 类型配置
 */
function renderMsg(conf: ConfigType) {
    const {
        type, // 消息类型
        icon = '', // 消息图标
        content, // 消息内容
        duration, // 自动关闭延迟时间
        isCancelCollect,
        albumId,
        singerId,
        mvid,
        songListId,
        t,
        sType,
        commentId,
        title,
        replyName,
        queryId,
        parentContent

    } = conf;

    // 创建实例
    return createInstance({
        type,
        t,
        sType,
        commentId,
        title,
        replyName,
        icon,
        content,
        duration,
        isCancelCollect,
        albumId,
        singerId,
        mvid,
        songListId,
        queryId,
        parentContent
    });
}

export default {
    // 纯文本消息
    success(content: string) {
        const config = {
            type: "text",
            content,
            duration: 500
        }
        return renderMsg(config);
    },
    error(content: string) {
        const config = {
            type: "error",
            icon: "icon-shanchu2",
            content,
            duration: 500
        }
        return renderMsg(config);
    },

    /**
     * 发表评论的弹出框
     * @param t  0==> 删除 1 ==> 发送 2 ==> 回复
     * @param sType  数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
     * @param queryId 资源id
     * @param commentId  回复的评论 id (回复评论时必填)
     * @param replyName 回复用户的用户名
     * @param parentContent  父级评论内容
     */
    publishComment(t: number, sType: list, title: string, queryId: number, commentId?: number, replyName?: string, parentContent?: string) {
        const config = {
            type: "publishComment",
            t,
            sType,
            commentId,
            title,
            replyName,
            queryId,
            parentContent
        }
        return renderMsg(config);
    },
    cancelCollect(content: string, singerId?: number, mvid?: number, songListId?: number, albumId?: number) {
        const config = {
            type: "cancelCollect",
            content,
            singerId,
            mvid,
            songListId,
            albumId
        }
        return renderMsg(config);
    }

}