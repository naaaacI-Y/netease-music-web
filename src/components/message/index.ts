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
        songListId
    } = conf;

    // 创建实例
    return createInstance({
        type,
        icon,
        content,
        duration,
        isCancelCollect,
        albumId,
        singerId,
        mvid,
        songListId
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
    cancelCollect(content: string, singerId?: number, mvid?: number, songListId?: number, albumId?: number) {
        const config = {
            type: "cancelCollect",
            content,
            isCancelCollect: true,
            singerId,
            mvid,
            songListId,
            albumId
        }
        return renderMsg(config);
    }

}