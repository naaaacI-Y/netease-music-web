<template>
    <div class="recommend-songlist-card-wrapper">
        <div class="img-wrapper mb-6">
            <!-- <img src="" alt=""> -->
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
        <div class="songlist-name fs-3 text-black_2" :class="{ isOneLine: isOneline }">歌单名称歌单名称</div>
        <slot name="songCount"></slot>
    </div>

</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    isOutSide?: boolean
    isOneline?: boolean
}>(), {
    isOutSide: true,
    isOneline: false
})
</script>
<style lang="scss" scoped>
.recommend-songlist-card-wrapper {
    width: calc(20% - 18px);
    margin-bottom: 45px;

    .img-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        background-color: aqua;
        border-radius: 6px;

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
            @include radius(30px);
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

        .isCenter {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
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
                background-color: #d33b31;
                @include radius(13px);
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

    .isOneLine {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>
