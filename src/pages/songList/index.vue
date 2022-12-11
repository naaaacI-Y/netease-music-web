<template>
    <DefaultLayout>
        <div class="song-list-wrapper">
            <SongListHeader></SongListHeader>
            <SwitchTab :type="0"></SwitchTab>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongListHeader from '@/components/SongListHeader.vue';
import SwitchTab from '@/components/SwitchTab.vue';
</script>
<style lang="scss" scoped>
.song-list-wrapper {
    padding: 15px 30px;
}
</style>
