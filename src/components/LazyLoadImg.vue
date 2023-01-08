<template>
    <div class="img-wrapper">
        <img :src="defaultImg" alt="" @load="imgLoaded(src)" @error="imgLoadedError" v-if="isShowPic">
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
    src: string
}>()
// const isShowBgc = ref(true)
const isShowPic = ref(true)
watch(() => props.src, () => {
    isShowPic.value = false
    nextTick(() => {
        isShowPic.value = true
    })
})
const defaultImg = ref("/src/assets/images/defaultImg.png")
const imgLoaded = function (src: string) {
    defaultImg.value = src
    // isShowBgc.value = false
}
const imgLoadedError = function () {
    console.log("图片加载失败");
}
</script>
<style lang="scss" scoped>
.img-wrapper {
    background-color: var(--theme-dc);
    width: 100%;

    img {
        width: 100%;
        // height: 100%;
    }
}
</style>
