<template>
    <div class="focus-and-fans-item-wrapper d-flex ai-center">
        <div class="avatar mr-10"></div>
        <div class="center d-flex flex-column jc-center">
            <div class="name mb-20 fs-3">姓名</div>
            <div class="summary fs-2 text-black_4">介绍介绍介绍介绍介绍介绍介绍介绍</div>
            <div class="other-info d-flex ai-center fs-2 text-black_4">
                <div class="album mr-5">
                    <span>歌单：</span>
                    <span>189</span>
                </div>
                <div class="text-black_6">丨</div>
                <div class="fans ml-5">
                    <span>粉丝：</span>
                    <span>19999</span>
                </div>
            </div>
        </div>
        <div class="right ml-2 fs-3 d-flex ai-center jc-center">
            <i class="iconfont icon-jia text-primary_red_1"></i>
            <span class="text-black_3">关注</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.focus-and-fans-item-wrapper {
    width: 395px;
    height: 110px;
    padding: 10px 30px;

    .avatar {
        @include radius(92px);
        background-color: aquamarine;

    }

    &:hover {
        background-color: #fafafa;
    }

    .center {
        width: 170px;

        .summary {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .right {
        border: 1px solid #ddd;
        padding: 2px 7px;
        border-radius: 15px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
