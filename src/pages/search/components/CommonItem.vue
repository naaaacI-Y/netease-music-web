<template>
    <!--歌手、专辑、歌单、主播电台、用户-->
    <div class="common-item-wrapper d-flex ai-center" :class="{ event: index % 2 !== 0 }">
        <div class="base-info d-flex ai-center flex-1">
            <slot name="avatar"></slot>
            <slot name="name"></slot>
        </div>
        <slot name="song-count"></slot>
        <slot name="singer-flag"></slot>
        <slot name="author"></slot>
        <slot name="user-title"></slot>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    index: number
}>()
</script>
<style lang="scss" scoped>
.common-item-wrapper {
    width: 100%;
    height: 80px;
    padding: 0 30px;

    &:hover {
        cursor: pointer;
        background-color: var(--theme-f2);
    }
}

.event {
    background-color: var(--theme-fa);
}
</style>
