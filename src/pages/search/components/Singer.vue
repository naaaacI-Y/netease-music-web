<template>
    <div class="song-wrapper">
        <CommonItem v-for="item in 10" :key="item" :index="item - 1">
            <template #avatar>
                <div class="avatar mr-15">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    歌手名称
                </div>
            </template>
            <template #singer-flag>
                <div class="singer-flag fs-3 d-flex ai-center">

                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import { Artist } from '@/service/api/search/types';
import { reactive } from 'vue';
import CommonItem from './CommonItem.vue';
const singerList = reactive({ data: [] as Artist[] })
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    background-color: #c3473a;
    border-radius: 5px;
}

.singer-flag {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #c3473a;
}
</style>
