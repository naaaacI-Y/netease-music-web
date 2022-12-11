<template>
    歌手卡片，需要传入宽高
</template>

<script lang="ts" setup>
withDefaults(defineProps<
    {
        cardWidth?: number,
        cardHeight?: number
    }>(), {
    cardWidth: 158,
    cardHeight: 158
})
</script>
<style lang="scss" scoped>

</style>
