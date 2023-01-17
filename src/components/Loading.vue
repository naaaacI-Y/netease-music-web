<template>
    <div class="loading-wrap text-66 fs-3"
        :style="{ height: isNeedShowScroll ? 'calc(100vh + 100px)' : '100%', paddingTop: isShowPaddingTop ? '70px' : '0' }">
        <img src="@/assets/images/white-loading.gif" alt="" v-if="theme !== 'dark'">
        <img src="@/assets/images/dark-loading.gif" alt="" v-if="theme == 'dark'">
        <span>载入中...</span>
    </div>
</template>

<script lang="ts" setup>
import useThemeStore from '@/store/theme';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useThemeStore())
withDefaults(defineProps<{
    isNeedShowScroll?: boolean
    isShowPaddingTop?: boolean
}>(), {
    isNeedShowScroll: true,
    isShowPaddingTop: true

})
</script>
<style lang="scss" scoped>
.loading-wrap {
    position: relative;
    // padding-top: 70px;
    text-align: center;

    img {
        width: 50px;
        height: 50px;
    }

    span {
        position: relative;
        bottom: 20px;
    }
}
</style>
