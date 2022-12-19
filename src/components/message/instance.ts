import {
    createApp,
} from 'vue';
import Message from './index.vue';
import type { ConfigType } from './types';

/**
 * Message 实例操作
 * @param {*} conf 实例配置
 */
const createInstance = (conf: ConfigType) => {
    const box = document.getElementsByClassName("message-box-wrapper")
    if (box.length) return;
    // 创建包裹容器，并设置外层的 Class 属性
    let messageNode = document.createElement('div');
    let attr = document.createAttribute("class");
    attr.value = "message-box-wrapper";
    messageNode.setAttributeNode(attr);
    const handleRemove = () => {
        //   app.unmount(messageNode);
        document.body.removeChild(messageNode);
    }

    // 创建 Vue 实例并挂载到 Body
    const app = createApp(Message, {
        config: conf,
        // 移除元素，消息关闭后从 Dom 上取消挂载并移除
        remove() {
            handleRemove()
        }
    })
    // 挂载实例并追加到 Body 结尾
    app.mount(messageNode);
    document.body.appendChild(messageNode);
    return app;
};

export default createInstance;