<template>
    <div class="song-list-wrapper">
        <CommonItem v-for="item in 10" :index="item - 1" :key="item">
            <template #avatar>
                <div class="avatar mr-15">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    歌单名称
                </div>
            </template>
            <template #song-count>
                <div class="song-count fs-1 text-c7">
                    188首
                </div>
            </template>
            <template #author>
                <div class="author fs-1 text-c7">
                    <span class="by mr-5">by</span>
                    <span class="auth">作者</span>
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import { Album } from '@/service/api/recommend/types';
import { reactive } from 'vue';
import CommonItem from './CommonItem.vue';
const songList = reactive({ data: [] as Album[] })
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    background-color: #c3473a;
    border-radius: 5px;
}

.song-count {
    width: 15%;
}

.author {
    width: 20%;

    .auth:hover {
        cursor: pointer;
        color: #333;
    }
}
</style>
