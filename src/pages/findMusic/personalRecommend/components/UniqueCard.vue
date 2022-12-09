<template>
    <div class="unique-card-wrapper" :style="{ width: `${cardWidth}px` }">
        <div class="img-wrapper mb-5" :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }">
            <img src="" alt="">
            <div class="play-btn">
                <i class="iconfont icon-bofang1 text-white fs-9"></i>
            </div>
        </div>
        <div class="unique-name fs-3 text-black_2">独家放送名称独家放送名称独家放送名称独家放送名称</div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<
    {
        cardWidth: number,
        cardHeight: number
    }>(), {
    cardWidth: 250,
    cardHeight: 135
})
</script>
<style lang="scss" scoped>
.unique-card-wrapper {

    .img-wrapper {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        .play-btn {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 1px solid #ddd;
            background-color: rgba($color: #ccc, $alpha: 0.5);

            i {
                position: relative;
                left: 3px;
                color: white;
            }
        }
    }

    .unique-name:hover {
        color: #3a3a3a;
        cursor: pointer;
    }
}
</style>
