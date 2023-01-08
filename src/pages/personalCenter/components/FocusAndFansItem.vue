<template>
    <div class="focus-and-fans-item-wrapper d-flex ai-center">
        <div class="avatar mr-10" @click="goPersonCenter">
            <img :src="formatPicUrl(item.avatarUrl, 92, 92)" alt="" class="avatar-img">
            <div class="flag" v-if="item.avatarDetail">
                <img :src="item.avatarDetail.identityIconUrl" alt="">
            </div>
        </div>
        <div class="center d-flex flex-column jc-center">
            <div class="name mb-10 fs-3 text-33" @click="goPersonCenter">{{ item.nickname }}</div>
            <div class="summary fs-2 text-7d">{{ item.signature }}</div>
            <div class="other-info d-flex ai-center fs-2 text-7d">
                <div class="album mr-5">
                    <span>歌单：</span>
                    <span>{{ item.playlistCount }}</span>
                </div>
                <div class="text-ee">丨</div>
                <div class="fans ml-5">
                    <span>粉丝：</span>
                    <span>{{ item.followeds }}</span>
                </div>
            </div>
        </div>
        <div class="right ml-2 fs-3 d-flex ai-center jc-center">
            <i class="iconfont icon-jia text-primary_red_4"></i>
            <span class="text-33">关注</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { Follow } from '@/service/api/user/types';
import { formatPicUrl } from '@/utils';

const props = defineProps<{
    item: Follow
}>()
const goPersonCenter = () => {
    router.push(`/personal-center/${props.item.userId}`)
}
</script>
<style lang="scss" scoped>
.focus-and-fans-item-wrapper {
    width: 395px;
    height: 110px;
    padding: 10px 20px 10px 30px;

    .avatar {
        @include creator-avatar(92px, 25px);
    }

    &:hover {
        background-color: var(--theme-fa);
    }

    .center {
        width: 175px;

        .summary {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .name {
            @include no-wrap(175px);
        }

        .name:hover {
            cursor: pointer;
        }
    }

    .right {
        border: 1px solid var(--theme-dd);
        padding: 2px 7px;
        border-radius: 15px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
