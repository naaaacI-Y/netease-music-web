<template>
    <div class="video-wrapper">
        视频
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
// isShowTime:true isOneline: false
const videoList = reactive({ data: [] })
</script>
<style lang="scss" scoped>
.video-wrapper {
    padding: 0 30px;
}
</style>
