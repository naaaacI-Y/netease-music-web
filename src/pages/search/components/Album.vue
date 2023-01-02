<template>
    <div class="album-wrapper">
        <CommonItem v-for="item in 10" :key="item" :index="item - 1">
            <template #avatar>
                <div class="avatar mr-15">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    专辑名称
                </div>
            </template>
            <template #author>
                <div class="author fs-1 d-flex ai-center">
                    <span class="text-black_5">作者</span>
                    <span class="alia text-black_6">(别名)</span>
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup name="Album">
import { reactive } from 'vue';
import CommonItem from './CommonItem.vue';
import { Album } from "@/service/api/recommend/types"
const albumList = reactive({ data: [] as Album[] })
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    background-color: #c3473a;
    border-radius: 5px;
}

.author {
    width: 45%;
}
</style>
