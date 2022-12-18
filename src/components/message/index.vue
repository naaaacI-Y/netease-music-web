<template>
    <div class="message-container" v-show="visiable">
        <div class="message-content">
            <div class="message-icon" v-if="config.icon">
                <i :class="config.icon" class="iconfont primary_red_4"></i>
            </div>
            <span :class="{ isError: config.type === 'error' }">{{ config.content }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ConfigType } from "./types"

const props = defineProps<{
    config: ConfigType, // 消息配置项
    remove: Function, // 取消挂载回调
}>()

const visiable = ref(false)

// 打开消息
const onOpen = (config: ConfigType) => {
    setTimeout(() => {
        visiable.value = true;
    }, 10);

    // 指定时间后移除消息
    if (config.duration !== 0) {
        setTimeout(() => {
            onClose();
            console.log("移除节点========TODO");

        }, config.duration);
    }
};

onOpen(props.config);
// 消息关闭
const onClose = () => {
    visiable.value = false;
    setTimeout(() => {
        props.remove();

    }, props.config.duration);
};

</script>
<style lang="scss" scoped>
.message-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .message-content {
        background-color: #353535;
        border-radius: 20px;
        padding: 15px 25px;
        color: white;

        .isError {
            color: #ff3133;
        }
    }
}
</style>
