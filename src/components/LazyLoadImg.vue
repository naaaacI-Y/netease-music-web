<template>
    <img :src="defaultImg" alt="" @load="imgLoaded(src)" @error="imgLoadedError">
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
    src: string
}>()
const defaultImg = ref("/src/assets/images/defaultAvatar.png")
const imgLoaded = function (src: string) {
    defaultImg.value = src
}
const imgLoadedError = function () {
    console.log("图片加载失败");
}
</script>
<style lang="scss" scoped>

</style>
