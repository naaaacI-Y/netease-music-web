<template>
    <div class="focus-and-fans-item-wrapper d-flex ai-center">
        <div class="avatar mr-10" @click="goPersonCenter">
            <img :src="item.avatarUrl" alt="" class="avatar-img">
            <div class="flag" v-if="item.avatarDetail">
                <img :src="item.avatarDetail.identityIconUrl" alt="">
            </div>
        </div>
        <div class="center d-flex flex-column jc-center">
            <div class="name mb-10 fs-3" @click="goPersonCenter">{{ item.nickname }}</div>
            <div class="summary fs-2 text-black_4">{{ item.signature }}</div>
            <div class="other-info d-flex ai-center fs-2 text-black_4">
                <div class="album mr-5">
                    <span>歌单：</span>
                    <span>{{ item.playlistCount }}</span>
                </div>
                <div class="text-black_7">丨</div>
                <div class="fans ml-5">
                    <span>粉丝：</span>
                    <span>{{ item.followeds }}</span>
                </div>
            </div>
        </div>
        <div class="right ml-2 fs-3 d-flex ai-center jc-center">
            <i class="iconfont icon-jia text-primary_red_1"></i>
            <span class="text-black_3">关注</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Follow } from '@/service/api/user/types';

defineProps<{
    item: Follow
}>()
const goPersonCenter = () => {

}
</script>
<style lang="scss" scoped>
.focus-and-fans-item-wrapper {
    width: 395px;
    height: 110px;
    padding: 10px 20px 10px 30px;

    .avatar {
        width: 92px;
        height: 92px;
        // border-radius: 50%;
        position: relative;

        .flag {
            width: 25px;
            height: 25px;
            position: absolute;
            bottom: 0;
            right: 0;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        &:hover {
            cursor: pointer;
        }
    }

    &:hover {
        background-color: #fafafa;
    }

    .center {
        width: 175px;

        .summary {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .name:hover {
            cursor: pointer;
        }
    }

    .right {
        border: 1px solid #ddd;
        padding: 2px 7px;
        border-radius: 15px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
