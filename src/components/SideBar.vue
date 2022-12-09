<template>
    <div class="side-bar-wrapper">
        <div class="left">
            <div class="isLoginHeader" v-if="isLogin">
                <div class="avatar">
                    <img :src="userInfo.avatarUrl" alt="">
                </div>
                <div class="toLogin">
                    <span class="fs-3 mr-2">{{ userInfo.nickname }}</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
            </div>
            <div class="isNotLoginHeader" @click="goLogin" v-if="!isLogin">
                <div class="avatar">
                    <img src="@/assets/images/defaultAvatar.png" alt="">
                </div>
                <div class="toLogin">
                    <span class="fs-3 mr-2">未登录</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
            </div>
            <div class="other mb-20" style="color:#414141">
                <div :class="['find', active('findMusic') ? isActive : '']" @click="go('/')">
                    <i class="iconfont icon-wangyiyunyinyuemusic1193417easyiconnet"></i>
                    <span>发现音乐</span>
                </div>
                <div :class="['find', active('personalFm') ? isActive : '']" @click="go('/personalFm')">
                    <i class="iconfont icon-leida"></i>
                    <span>私人FM</span>
                </div>
                <div @click="go('/video')" :class="['find', active('video') ? isActive : '']">
                    <i class="iconfont icon-shipin"></i>
                    <span>视频</span>
                </div>
                <div @click="go('/focus')" :class="['find', active('focus') ? isActive : '']">
                    <i class="iconfont icon-pengyou"></i>
                    <span>朋友</span>
                </div>
            </div>
            <div class="myMusic mt-9">
                <div class="title pl-18">我的音乐</div>
                <div class="itunes pl-18">
                    <i class="iconfont icon-itunes"></i>
                    <span>iTunes音乐</span>
                </div>
                <div class="itunes pl-18">
                    <i class="iconfont icon-xiazai"></i>
                    <span>下载管理</span>
                </div>
                <div class="itunes pl-18">
                    <i class="iconfont icon-zuijinbofang"></i>
                    <span>最近播放</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { profile } from "@/service/api/login/types"
const route = useRoute()
const router = useRouter()
const isLogin = ref(false)
const isActive = ref('isActive')
const userInfo = ref({} as profile)
const initInfo = () => {
    const info = localStorage.getItem('user_info')
    if (info) {
        isLogin.value = true
        userInfo.value = JSON.parse(info).profile
    }
}
const watchInfoUpdate = () => {
    const cb = () => {
        console.log('监听到storage变化了====');
        const info = localStorage.getItem('user_info')
        if (info) {
            isLogin.value = true
            userInfo.value = JSON.parse(info).profile
        }
        window.removeEventListener('storage', cb)
    }
    window.addEventListener('storage', cb)
}
const goLogin = () => {

}
const active = (name: string): boolean => {
    return route.path.startsWith('/' + name)
}
const go = (path: string): void => {
    if (route.path !== path && (!(path == '/' && route.path.startsWith('/find')))) {
        router.push(path)
    }

}
onMounted(() => {
    initInfo()
    if (!userInfo.value.nickname) {
        watchInfoUpdate()
    }
})
</script>
<style scoped lang="scss">
.side-bar-wrapper {
    display: flex;

    .left {
        background-color: #ededed;
        width: 200px;

        .isLoginHeader,
        .isNotLoginHeader {
            height: 60px;
            padding: 14px 10px;
            @include flex(row, flex-start, center);

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 12px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .toLogin {
                @include flex(row, flex-start, center);
            }
        }

        .other {
            div {
                height: 35px;
                @include flex(row, flex-start, center);
                padding-left: 18px;

                i {
                    font-size: 20px;
                    margin-right: 10px;
                }

                span {
                    font-size: 13px;
                }

                &:hover {
                    background-color: #e1e1e1;
                }
            }

            .isActive {
                background-color: #e2e2e2;
                color: #d6635e;
            }
        }

        .myMusic {
            .title {
                color: #909090;
                margin-bottom: 4px;
                font-size: 13px;
            }

            i {
                font-size: 18px;
                margin-right: 10px;
                color: #414141;
            }

            span {
                font-size: 13px;
            }

            div:not(:first-child) {
                height: 35px;

                @include flex(row, flex-start, center);

                &:hover {
                    background-color: #e1e1e1;
                }
            }
        }
    }
}
</style>
