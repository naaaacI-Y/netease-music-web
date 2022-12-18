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
        duration = 1000, // 自动关闭延迟时间
    } = conf;

    // 创建实例
    return createInstance({
        type,
        icon,
        content,
        duration,
    });
}

export default {
    // 纯文本消息
    success(content: string) {
        const textCfg = {
            type: "text",
            content
        }
        return renderMsg(textCfg);
    },
    error(content: string) {
        const textCfg = {
            type: "error",
            icon: "icon-shanchu2",
            content
        }
        return renderMsg(textCfg);
    },

}