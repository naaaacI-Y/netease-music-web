<template>
    <div class="mention-wrapper">
        <div class="mention-item d-flex ai-center" v-for="item in mentionList.data">
            <div class="mention-img mr-5"></div>
            <div class="mention-content d-flex flex-column jc-center flex-1">
                <div class="line1 d-flex jc-between">
                    <div class="author fs-2 text-deep_blue">作者</div>
                    <div class="timne fs-1 text-66">1月20日</div>
                </div>
                <div class="summary text-33 fs-2">简介简介简介简介简介简介</div>
            </div>
        </div>
        <div class="no-data fs-1 text-66 d-flex jc-center mt-30" v-if="!mentionList.data.length">暂无私信内容</div>
    </div>
</template>

<script lang="ts" setup>
const mentionList = reactive({ data: [1, 2, 3] })
</script>
<style lang="scss" scoped>
.mention-wrapper {
    .mention-item {
        height: 60px;
        padding: 0 20px;

        .mention-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: red;
        }

        &:hover {
            cursor: pointer;
            background-color: var(--theme-fa);
        }

        .mention-content {
            height: 100%;
            border-bottom: 1px solid var(--theme-d4);
        }
    }
}
</style>
