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
            <div class="summary fs-1 text-7d">{{ item.signature }}</div>
            <div class="other-info d-flex ai-center fs-1 text-7d">
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
        <div class="right ml-2 fs-3 d-flex ai-center jc-center" v-if="isShowFocusBtn" @click="focusPerson">
            <i class="iconfont icon-jia text-primary_red_4"></i>
            <span class="text-33">关注</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { focusOrCancelPerson } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import useStore from '@/store';
import { checkLogin, formatPicUrl } from '@/utils';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from "vue-router"
import Message from "@/components/message"

const { userProfile, useGlobal } = useStore()
const { userFile } = storeToRefs(userProfile)
const { isShowLoginBox } = storeToRefs(useGlobal)
const route = useRoute()
const isShowFocusBtn = ref(true)
const router = useRouter()
const props = defineProps<{
    item: Follow
}>()


// 关注用户
const focusPerson = async () => {
    if (!checkLogin()) return isShowLoginBox.value = true
    const _ = {
        id: props.item.userId,
        t: props.item.followed ? 0 : 1
    }
    const r = await focusOrCancelPerson(_)
    if (r.code === -462) {
        return Message.error("请在手机端完成验证")
    }
    if (r.code === 200) {
        const tip = _.t === 0 ? "取消关注成功" : "关注成功"
        Message.success(tip)
        isShowFocusBtn.value = _.t === 0 ? true : false
    }
}

// 前往用户个人中心
const goPersonCenter = () => {
    router.push(`/personal-center/${props.item.userId}`)
}

// 是否已关注
const getIsFocus = () => {
    const userId = Number(route.query.id)
    const myId = userFile.value?.profile?.userId
    if (userId === myId || props.item.userId === myId) {
        return isShowFocusBtn.value = false
    }
    isShowFocusBtn.value = !props.item.followed
}

getIsFocus()
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
