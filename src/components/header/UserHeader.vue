<template>
    <div class="personal-center-wrapper mb-30">
        <div class="head-info d-flex">
            <div class="info-left mr-30">
                <img :src="userInfo.data?.profile?.avatarUrl" alt="" v-if="!isReset">
                <img src="@/assets/images/defaultAvatar.png" alt="" v-if="isReset">
            </div>
            <div class="info-right">
                <div class="base-info mb-15 pb-9">
                    <div class="person-name fs-9 mb-5 text-33" style="font-weight: bold;">{{
                        isReset? "undefined": userInfo.data?.profile?.nickname
                    }}
                    </div>
                    <div class="person-level d-flex jc-between ai-center">
                        <div class="left d-flex ai-center">
                            <!-- <div class="vip-level mr-6"></div> -->
                            <div class="auth-type d-flex ai-center mr-5"
                                v-if="userInfo.data?.profile?.authStatus === 1">
                                <div class="avatar-detail mr-4 d-flex ai-center"
                                    v-if="userInfo.data.profile.avatarDetail">
                                    <img :src="userInfo.data.identify?.imageUrl" alt="">
                                </div>
                                <div class="auth-tags d-flex ai-center" style="color: #de5545;"
                                    v-if="userInfo.data.identify">
                                    <span> {{ userInfo.data.identify.imageDesc }}</span>
                                </div>
                            </div>
                            <!-- <div class="identify" v-if=""></div> -->
                            <div class="account-level fs-1 mr-6">Lv{{ isReset? 0: userInfo.data?.level }}</div>
                            <div class="sex d-flex ai-center jc-center"
                                v-if="userInfo.data?.profile?.gender && !isReset"
                                :style="{ backgroundColor: userInfo.data?.profile?.gender === 1 ? '#d2f2f1' : '#f9d0e7' }">
                                <i class="iconfont icon-nanxing text-male fs-2"
                                    v-if="userInfo.data?.profile?.gender === 1"></i>
                                <i class="iconfont icon-nvxing text-female fs-2"
                                    v-if="userInfo.data?.profile?.gender === 2"></i>
                            </div>
                        </div>
                        <div class="right d-flex">
                            <div class="edit-info d-flex ai-center fs-3" v-if="isSelf">
                                <i class="iconfont icon-bianji fs-9"></i>
                                <span class="text-33">编辑个人信息</span>
                            </div>
                            <div class="focus d-flex ai-center pl-6 fs-3" v-if="!isSelf" @click="focusPerson">
                                <i class="iconfont icon-jia text-primary_red_4 fs-9 mr-4"
                                    v-if="!userInfo.data?.profile?.followed"></i>
                                <i class="iconfont text-33 fs-9 mr-4 icon-gou-"
                                    v-if="userInfo.data?.profile?.followed"></i>
                                <span class="text-33" v-if="!userInfo.data?.profile?.followed">关注</span>
                                <span class="text-33" v-if="userInfo.data?.profile?.followed">已关注</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-about">
                    <div class="count d-flex mb-4">
                        <div class="dynamic d-flex flex-column ai-center mr-30" @click="goDynamic">
                            <div class="fs-9 text-33">{{ isReset? 0: userInfo.data?.profile?.eventCount }}</div>
                            <div class="text-66 fs-2">动态</div>
                        </div>
                        <!-- <div>丨</div> -->
                        <div class="focus-count d-flex flex-column ai-center mr-30 ml-30" @click="goFocus">
                            <div class="fs-9 text-33">{{ isReset? 0: userInfo.data?.profile?.follows }}</div>
                            <div class="text-66 fs-2">关注</div>
                        </div>
                        <!-- <div>丨</div> -->
                        <div class="fans-count d-flex flex-column ai-center ml-30" @click="goFans">
                            <div class="fs-9 text-33">{{ isReset? 0: userInfo.data?.profile?.followeds }}</div>
                            <div class="text-66 fs-2">粉丝</div>
                        </div>
                    </div>
                    <div class="address fs-2">
                        <div class="area d-flex ai-center mb-4" v-if="area && !isReset">
                            <span class="text-33">所在地区：</span>
                            <span class="text-66">{{ area }}</span>
                        </div>
                        <div class="social d-flex ai-center mb-4">
                            <span class="text-33">社交网络：</span>
                            <span v-if="userInfo.data?.bindings?.some(item => item.type === 2 && item.url) && !isReset">
                                <i class="iconfont icon-weibo text-primary_red_4"></i>
                                <!-- <i class="iconfont icon-QQ"></i> -->
                                <!-- <i class="iconfont icon-weixinbg"></i> -->
                            </span>
                            <span v-else class="text-66">暂无绑定</span>
                        </div>
                        <div class="introduce">
                            <span class="text-33">个人介绍：</span>
                            <span class="text-66">{{ userInfo?.data?.profile?.signature || "暂无介绍" }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { focusOrCancelPerson, getUserDetailById } from '@/service/api/user';
import { UserDetailByIdResult } from '@/service/api/user/types';
import { getArea } from '@/utils';
import Message from "@/components/message"
const props = withDefaults(defineProps<{
    isSelf: boolean
    uid: number
}>(), {
    isSelf: false
})
const router = useRouter()
const isReset = ref(false) // 用户是否注销账号
const area = ref("")
const userInfo = reactive({ data: {} as UserDetailByIdResult })

const getUserDetail = async () => {
    getUserDetailById({ uid: props.uid }).then(res => {
        userInfo.data = res
        area.value = getArea(res.profile.province, res.profile.city)
    }).catch((err) => {
        console.log(err);
        if (!err) {
            isReset.value = true
        }
    })

    // if (r.code === 404) {
    //     // 用户已注销
    //     return isReset.value = true
    // }

}
// 关注/取消关注用户 code:200 ==> TODO
const focusPerson = async () => {
    if (isReset.value) {
        return Message.error("该用户已注销，无法操作~")
    }
    const _ = {
        id: userInfo.data.profile.userId,
        t: !userInfo.data.profile.followed ? 1 : 0
    }
    const r = await focusOrCancelPerson(_)
    if (r.code === 200) {
        await getUserDetail()
        !_.t ? Message.success("关注成功！") : Message.success("取消关注成功！")
    }
}
const goFocus = () => {
    if (isReset.value) return
    // 接口没有关注总数
    router.push(`/focus?focusName=${userInfo.data.profile.nickname}&id=${props.uid}&focus=${userInfo.data.profile.follows}`)
}
const goFans = () => {
    if (isReset.value) return
    router.push(`/fans?fansName=${userInfo.data.profile.nickname}&id=${props.uid}`)
}
const goDynamic = () => {
    if (isReset.value) return
    router.push(`/dynamic?dynamicName=${userInfo.data.profile.nickname}&id=${props.uid}`)
}
getUserDetail()
</script>
<style lang="scss" scoped>
.personal-center-wrapper {
    .head-info {
        .info-left {
            @include radius(200px);

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info-right {
            flex: 1;

            .base-info {
                border-bottom: 1px solid var(--theme-ee);

                .person-level {
                    .left {
                        .vip-level {
                            width: 40px;
                            // height: 16px;
                            height: 18px;
                            border-radius: 10px;
                            padding: 1px 6px;
                            background-color: aqua;
                        }

                        .auth-type {
                            height: 16px;
                            border-radius: 10px;
                            background-color: #f9e5e3;
                            padding-right: 5px;

                            .avatar-detail {
                                width: 16px;
                                height: 16px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }

                            .auth-tags span {
                                font-size: 12px;
                                // transform: scale(0.9);
                                display: inline-block;
                                position: relative;
                                // right: 10px;
                            }
                        }

                        .account-level {
                            // height: 16px;
                            border-radius: 10px;
                            background-color: #f0f0f0;
                            padding: 0px 6px;
                        }

                        .sex {
                            @include radius(16px);
                            // background-color: #f9d0e7;
                        }
                    }

                    .right {
                        .edit-info {
                            border: 1px solid var(--theme-e5);
                            border-radius: 15px;
                            padding: 0 10px;
                        }

                        .focus {
                            // width: 75px;
                            padding: 0 10px;
                            height: 32px;
                            border-radius: 20px;
                            border: 1px solid var(--theme-e5);
                        }

                        .edit-info:hover,
                        .focus:hover {
                            background-color: rgba($color: #000000, $alpha: 0.1);
                            cursor: pointer;
                        }
                    }
                }
            }

            .account-about .count {

                .dynamic,
                .focus-count {
                    position: relative;

                    &::after {
                        content: "丨";
                        display: block;
                        position: absolute;
                        right: -52px;
                        font-size: 45px;
                        font-weight: 100;
                        color: var(--theme-ee);
                        bottom: -10px;
                    }
                }
            }
        }
    }
}
</style>
