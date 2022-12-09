<template>
    <div class="recommend-songlist-card-wrapper mb-30">
        <div class="img-wrapper mb-6">
            <img src="" alt="">
            <div class="play-count d-flex ai-center fs-3">
                <i class="iconfont icon-bofang1 text-white fs-7"></i>
                19万
            </div>
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
            <div class="songlist-author" v-if="!isOutSide">
                <i class="iconfont icon-iconfontyonghuming text-white mr-2 "></i>
                <div class="author-name fs-2 text-white mr-2 pt-2">作者名称</div>
                <div class="author-flag"></div>
            </div>
        </div>
        <div class="songlist-name fs-3 text-black_2">歌单名称歌单名称歌单名称歌单名称歌单</div>
    </div>

</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    isOutSide: boolean
}>(), {
    isOutSide: true
})
</script>
<style lang="scss" scoped>
.recommend-songlist-card-wrapper {
    width: 194px;
    border-radius: 10px;
    // border: 1px solid red;

    .img-wrapper {
        width: 100%;
        height: 194px;
        overflow: hidden;
        position: relative;

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
            bottom: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgba($color: #bebebb, $alpha: 0.6);

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
            cursor: pointer;

            .play-btn {
                display: block;

            }
        }

        .songlist-author {
            position: absolute;
            bottom: 10px;
            display: flex;
            align-items: center;
            left: 10px;
            color: white;

            .author-flag {
                width: 13px;
                height: 13px;
                background-color: #d33b31;
                border-radius: 50%;
            }
        }

    }

    .songlist-name {
        word-break: break-all;

        &:hover {
            color: #3a3a3a;
            cursor: pointer;
        }
    }

}
</style>
