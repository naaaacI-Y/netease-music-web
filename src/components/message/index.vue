<template>
    <div class="message-container" v-show="visiable">
        <div class="message-content d-flex">
            <i :class="config.icon" class="iconfont text-primary_red_4 fs-9 mr-6" v-if="config.icon"></i>
            <span :class="{ isError: config.type === 'error' }">{{ config.content }}</span>
        </div>
        <cancelCollectTip :content="config.content" v-if="config.isCancelCollect"
            @confirm2cancelCollect="confirm2cancelCollect"></cancelCollectTip>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ConfigType } from "./types"
import cancelCollectTip from '../global/cancelCollectTip.vue';
const props = defineProps<{
    config: ConfigType, // 消息配置项
    remove: Function, // 取消挂载回调
}>()

const visiable = ref(false)

// 打开消息
const onOpen = (config: ConfigType) => {
    console.log(config, "config============");

    setTimeout(() => {
        visiable.value = true;
    }, 10);

    // 指定时间后移除消息
    if (config?.duration !== 0) {
        setTimeout(() => {
            onClose();
            console.log("移除节点========TODO");

        }, config.duration);
    }
};
const confirm2cancelCollect = () => {
    if (props.config.singerId) {
        // 取消收藏歌手
        console.log("取消收藏歌手");
    }

    if (props.config.albumId) {
        // 取消收藏专辑
        console.log("取消收藏专辑");
    }
    if (props.config.mvid) {
        // 取消收藏mv
        console.log("取消收藏mv");
    }
    if (props.config.songListId) {
        // 取消收藏歌单
        console.log("取消收藏歌单");
    }
    onClose()
    // 在外边做取消收藏成功的提示
}
onOpen(props.config);
// 消息关闭
const onClose = () => {
    visiable.value = false;
    setTimeout(() => {
        props.remove();

    }, props.config?.duration || 10);
};

</script>
<style lang="scss" scoped>
.message-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .message-content {
        background-color: var(--theme-23);
        border-radius: 25px;
        padding: 15px 25px;
        color: white;

        .isError {
            color: #ff3133;
        }
    }
}
</style>
