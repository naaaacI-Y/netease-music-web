<template>
    <div class="abbreviation-wrapper d-flex flex-column jc-between bg-white">
        <div class="songlist-name fs-9 mb-20" style="font-weight: bold;">歌单名称</div>
        <div class="operate d-flex ai-center text-black_1">
            <i class="iconfont icon-bofangqi-bofang mr-30 fs-9"></i>
            <i class="iconfont icon-xinjianwenjianjia mr-30 fs-9"></i>
            <i class="iconfont icon-fenxiang1 mr-30 fs-7"></i>
            <i class="iconfont icon-xiazai fs-9 text-black_5"></i>
        </div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<
    {
        name: string
    }>(), {
    name: "歌曲名称"
})
</script>
<style lang="scss" scoped>
.abbreviation-wrapper {
    padding: 12px 30px;
    border-bottom: 1px solid #e5e5e5;
    z-index: 9;
    width: 100%;
}
</style>
