<template>
    <div class="notification-message-wrapper">
        <div class="notification-item d-flex ai-center" v-for="item in notificationList.data">
            <div class="notification-img mr-5"></div>
            <div class="notification-content d-flex flex-column jc-center flex-1">
                <div class="line1 d-flex jc-between">
                    <div class="author fs-2 text-deep_blue">作者</div>
                    <div class="timne fs-1 text-66">1月20日</div>
                </div>
                <div class="origin-content text-33 fs-2">简介简介简介简介简介简介</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const notificationList = reactive({ data: [1, 1, 1, 1, 1, 1, 1, 1, 1] })
</script>
<style lang="scss" scoped>
.notification-message-wrapper {
    .notification-item {
        height: 60px;
        padding: 0 20px;

        .notification-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: red;
        }

        &:hover {
            cursor: pointer;
            background-color: var(--theme-fa);
        }

        .notification-content {
            height: 100%;
            border-bottom: 1px solid var(--theme-d4);
        }
    }
}
</style>
