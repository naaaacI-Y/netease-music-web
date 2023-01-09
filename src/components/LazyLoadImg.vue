<template>
    <div class="lazy-load-wrapper" :style="{ paddingBottom: paddingBottom ? `${paddingBottom}%` : '100%' }">
        <img :src="src" alt="" @load="imgLoaded()" @error="imgLoadedError" v-show="isShowPic">
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    src: string
    width?: number // 如果传入了宽高，则是独家放送 ==> 不规则宽高
    height?: number
    paddingBottom?: number // 横纵方向上的比例，为了等比例缩放，有的地方需要100% 有的地方需要56%
}>(), {
    paddingBottom: 100
})

const isShowPic = ref(false)
const imgLoaded = function () {
    isShowPic.value = true
}
const imgLoadedError = function () {
    console.log("图片加载失败");
}
</script>
<style lang="scss" scoped>
.lazy-load-wrapper {

    width: 100%;
    height: 0;

    img {
        width: 100%;
    }

    background-image: url("@/assets/images/defaultImg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--theme-dc);
}
</style>
