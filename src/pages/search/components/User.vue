<template>
    <div class="user-wrapper">
        <CommonItem :index="item - 1" v-for="item in 10" :key="item">
            <template #avatar>
                <div class="avatar mr-15">
                    <div class="flag"></div>
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    <span class="mr-10">用户名称</span>
                    <div class="sex d-flex ai-center jc-center" :style="{ backgroundColor: '#d2f2f1' }">
                        <i class="iconfont icon-nanxing text-male fs-2"></i>
                    </div>
                    <div class="sex d-flex ai-center jc-center" :style="{ backgroundColor: '#f9d0e7' }">
                        <i class="iconfont icon-nvxing text-female fs-2"></i>
                    </div>
                </div>
            </template>
            <template #user-title>
                <div class="user-title fs-2 text-89">
                    网易音乐人
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import CommonItem from './CommonItem.vue';
import { Userprofile } from '@/service/api/search/types';
import { reactive } from 'vue';
const userList = reactive({ data: [] as Userprofile[] })

</script>
<style lang="scss" scoped>
.user-wrapper {
    // padding: 0 -30px;

    .avatar {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #c3473a;

        .flag {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            bottom: 2px;
            right: 0px;
            background-color: aqua;
        }
    }

    .name .sex {
        @include radius(15px);
    }
}
</style>
