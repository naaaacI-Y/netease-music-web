<template>
    <div class="recommend-mv-card-wrapper">
        <div class="img-wrapper">
            <img src="" alt="">
            <div class="play-count d-flex ai-center fs-3">
                <i class="iconfont icon-bofang1 text-white fs-7"></i>
                19万
            </div>
            <div class="play-btn" v-if="isShowTime">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="mv-name mt-5">
            <div class="line1 fs-4 text-black_2">
                mv名称mv名称mv名称mv名称mv名称mv名称
            </div>
            <div class="line2 fs-2 text-black_6" v-if="!isOneline">
                作者名称
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    isShowTime?: boolean,
    isOneline?: boolean
}>(), {
    isShowTime: false,
    isOneline: false
})
</script>
<style lang="scss" scoped>
.recommend-mv-card-wrapper {
    width: 247px;

    .img-wrapper {
        width: 100%;
        height: 138px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        background-color: aqua;

        img {
            width: 100%;
            height: 100%;
        }

        .play-count {
            position: absolute;
            right: 10px;
            top: 5px;
            color: white;
        }

        .play-btn {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgba($color: #bebebb, $alpha: 0.6);
            transform: translate(-50%, -50%);

            .trangel {
                width: 0;
                height: 0;
                position: absolute;
                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 10px solid #d33b31;
                left: 50%;
                top: 50%;
                transform: translate(-30%, -50%);
            }
        }

        &:hover {
            .play-btn {
                display: block
            }
        }
    }

    .mv-name {
        .line1 {
            @include no-wrap(247);

            &:hover {
                color: #3a3a3a;
                cursor: pointer;
            }
        }

        .line2:hover {
            color: #747474;
            cursor: pointer;
        }
    }
}
</style>
