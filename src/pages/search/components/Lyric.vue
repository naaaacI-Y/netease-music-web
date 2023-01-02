<template>
    <div class="lyric-wrapper">
        <Header></Header>

    </div>
</template>

<script lang="ts" setup>
import { Song } from '@/service/api/singer/types';
import { reactive } from 'vue';
import Header from './Header.vue';
const LyricList = reactive({ data: [] as Song[] })
</script>
<style lang="scss" scoped>
.lyric-wrapper {
    padding: 0 30px;
}
</style>
