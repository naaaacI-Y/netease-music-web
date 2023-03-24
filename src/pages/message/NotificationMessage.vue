<template>
    <div class="notification-message-wrapper">
        <div class="notification-message-content" v-if="notificationList.data.length">
            <div class="notification-item d-flex " v-for="item in notificationList.data">
                <div class="notification-img mr-5">
                    <img :src="formatPicUrl(item.notice.user.avatarUrl, 35, 35)" alt="">
                </div>
                <div class="notification-content d-flex flex-column flex-1">
                    <div class="line1 d-flex jc-between">
                        <div class="author fs-2 text-deep_blue">{{ item.notice.user.nickname }}</div>
                        <div class="timne fs-1 text-66">{{ formatTime(item.time, "yyyy年MM月dd日 hh:mm:ss", true) }}</div>
                    </div>
                    <div class="text-33 fs-2">{{ item?.notice?.comment?.content }}</div>
                </div>
            </div>
        </div>
        <div class="no-data fs-1 text-66 d-flex jc-center mt-30" v-if="!notificationList.data.length">暂无通知内容</div>

    </div>
</template>

<script lang="ts" setup>
import { getMessageNotification } from '@/service/api/message';
import { MessageNotificationResult } from '@/service/api/message/types';
import { checkLogin, formatPicUrl, formatTime } from '@/utils';

const pages = reactive({ limit: 30, offset: 0 })
const notificationList = reactive({ data: [] as MessageNotificationResult["notices"] })

const getNotification = async () => {
    try {
        const r = await getMessageNotification(pages)
        notificationList.data = r.notices.map(item => {
            item.notice = JSON.parse(item.notice)
            return item
        })
    } catch (error) {

    }
}

checkLogin() && getNotification()
</script>
<style lang="scss" scoped>
.notification-message-wrapper {
    .notification-item {
        padding: 0 20px;
        min-height: 55px;

        .notification-img {
            width: 35px;
            height: 45px;
            padding-top: 10px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
            }
        }

        &:hover {
            cursor: pointer;
            background-color: var(--theme-fa);
        }

        .notification-content {
            min-height: 55px;
            // height: 100%;
            padding: 10px 0;
            border-bottom: 1px solid var(--theme-d4);
        }
    }
}
</style>
