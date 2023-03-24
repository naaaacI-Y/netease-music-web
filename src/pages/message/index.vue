<template>
    <div class="message-box-wrapper" :class="{ isShowBoxShadow: theme !== 'dark' }" id="message-box-wrapper">
        <div class="message-head d-flex jc-between ai-end">
            <span class="fs-9 message text-33">消息</span>
            <span class="fs-4">一键已读</span>
        </div>
        <div class="tab-wrap d-flex jc-center mb-5">
            <div class="tab d-flex fs-1 text-33 jc-between">
                <div class="tab-label flex-1 d-flex jc-center ai-center" @click="tabType = 0"
                    :class="{ isTabActive: tabType === 0 }">
                    私信</div>
                <div class="tab-label flex-1 d-flex jc-center ai-center" @click="tabType = 1"
                    :class="{ isTabActive: tabType === 1 }">
                    评论
                </div>
                <div class="tab-label flex-1 d-flex jc-center ai-center" @click="tabType = 2"
                    :class="{ isTabActive: tabType === 2 }">
                    @我
                </div>
                <div class="tab-label flex-1 d-flex jc-center ai-center" @click="tabType = 3"
                    :class="{ isTabActive: tabType === 3 }">
                    通知
                </div>
            </div>
        </div>
        <div class="message-content">
            <component :is="tabsComponents[showWhichComponent]"></component>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MentionMessage from './MentionMessage.vue';
import CommentMessage from './CommentMessage.vue';
import PrivateMessage from './PrivateMessage.vue';
import NotificationMessage from './NotificationMessage.vue';
import useThemeStore from '@/store/theme';

import { storeToRefs } from 'pinia';
import { messageTypeList } from '@/utils/const';

const { theme } = storeToRefs(useThemeStore())
const tabType = ref(0)
const tabsComponents = {
    MentionMessage, CommentMessage, PrivateMessage, NotificationMessage
}
const showWhichComponent = computed(() => {
    const type = Object.keys(messageTypeList)[tabType.value] as keyof typeof messageTypeList
    return messageTypeList[type].component
})
</script>
<style lang="scss" scoped>
.message-box-wrapper {
    width: 350px;
    position: fixed;
    right: 0;
    top: 50px;
    height: calc(100vh - 110px);
    z-index: 99;
    background-color: var(--theme-search);
    // overflow-y: auto;
    overflow: hidden;

    .message-head {
        padding: 25px 20px 15px;

    }

    .tab {
        width: 320px;
        height: 30px;
        border-radius: 20px;
        border: 1px solid var(--theme-b3);

        .tab-label {
            border-radius: 20px;

            &:hover {
                cursor: pointer;
                background-color: var(--theme-f5);
            }
        }

        .isTabActive {
            color: white;
            background-color: var(--theme-b3);
        }
    }

    .message-content {
        overflow-y: auto;
        height: calc(100% - 103px);
    }
}

.isShowBoxShadow {
    box-shadow: -5px 0 5px -5px #ccc;
}
</style>
