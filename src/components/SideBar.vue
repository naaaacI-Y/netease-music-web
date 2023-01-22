<template>
    <div class="side-bar-wrapper bg-ed">
        <!--头像信息-->
        <div class="head-info">
            <div class="isLoginHeader" v-if="userFile?.profile?.userId" @click="goPersonalCenter">
                <div class="avatar">
                    <img :src="userFile?.profile?.avatarUrl" alt="">
                </div>
                <div class="toLogin">
                    <span class="fs-3 mr-2">{{ userFile?.profile?.nickname }}</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
            </div>
            <div class="isNotLoginHeader" v-if="!userFile?.profile?.userId">
                <div class="avatar" @click="goPersonalCenter">
                    <img src="@/assets/images/defaultAvatar.png" alt="">
                </div>
                <div class="toLogin" id="toLogin" @click.stop="showInfoBox">
                    <span class="fs-3 mr-2">未登录</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
                <div class="info-box d-flex flex-column ai-center jc-center" v-show="isShowInfoBox" id="info-box"
                    @mouseenter="isShowInfoBox = true" @mouseleave="isShowInfoBox = false"
                    :class="{ isShowBoxShadow: theme !== 'dark' }">
                    <div class="account-info mb-20">
                        <div class="count d-flex mb-4">
                            <div class="dynamic d-flex flex-column ai-center mr-30" @click="goDynamic">
                                <div class="fs-9 text-33">{{ userFile?.profile?.eventCount?? 0 }}</div>
                                <div class="text-66 fs-2">动态</div>
                            </div>
                            <div class="focus-count d-flex flex-column ai-center mr-30 ml-30" @click="goFocus">
                                <div class="fs-9 text-33">{{ userFile.profile?.follows ?? 0 }}</div>
                                <div class="text-66 fs-2">关注</div>
                            </div>
                            <div class="fans-count d-flex flex-column ai-center ml-30" @click="goFans">
                                <div class="fs-9 text-33">{{ userFile.profile?.followeds ?? 0 }}</div>
                                <div class="text-66 fs-2">粉丝</div>
                            </div>
                        </div>
                    </div>
                    <div class="log-out text-33 fs-2" @click="logout">退出登录</div>
                </div>
            </div>
        </div>
        <!--所有的导航-->
        <div class="all-navigator">
            <!--主要的导航-->
            <div class="main-navigator mb-20 text-41">
                <div :class="['find', active('findMusic') ? isActive : '']"
                    @click="go('/findMusic/personal-recommend')">
                    <i class="iconfont icon-wangyiyunyinyuemusic1193417easyiconnet"></i>
                    <span>发现音乐</span>
                </div>
                <div :class="['find', active('personal-fm') ? isActive : '']" @click="go('/personal-fm')">
                    <i class="iconfont icon-leida"></i>
                    <span>私人FM</span>
                </div>
                <div @click="go('/video/video-inside')" :class="['find', active('video/video-inside', 'video/mv') ?
                isActive : '']">
                    <i class="iconfont icon-shipin"></i>
                    <span>视频</span>
                </div>
                <!-- <div @click="go('/focus')" :class="['find', active('focus') ? isActive : '']">
                        <i class="iconfont icon-pengyou"></i>
                        <span>朋友</span>
                    </div> -->
            </div>

            <!--我的音乐-->
            <div class="my-music mt-9 text-41 mb-20">
                <div class="title pl-18">我的音乐</div>
                <!-- <div class="itunes pl-18">
                    <i class="iconfont icon-itunes text-41"></i>
                    <span class="fs-13">iTunes音乐</span>
                </div>
                <div class="itunes pl-18">
                    <i class="iconfont icon-xiazai"></i>
                    <span class="fs-13">下载管理</span>
                </div> -->
                <div class="recent-play pl-18" @click="go('/recent-play')" :class="{ isActive: active('recent-play') }">
                    <i class="iconfont icon-zuijinbofang fs-7"></i>
                    <span class="fs-7">最近播放</span>
                </div>
                <div class="my-collection pl-18" :class="{ isActive: active('my-collection') }"
                    v-if="userFile?.profile?.userId" @click="go('/my-collection')">
                    <i class="iconfont icon-shoucang fs-7"></i>
                    <span class="fs-7">我的收藏</span>
                </div>
            </div>

            <!--创建的歌单-->
            <div class="created-song-list text-41 fs-18 mb-20 pl-3" v-if="userFile?.profile?.userId">
                <div class="title" @click="isShowCreated = !isShowCreated">
                    <i class="iconfont icon-xiangyou fs-1" v-show="!isShowCreated"></i>
                    <i class="iconfont icon-xiangxia fs-1" v-show="isShowCreated"></i>
                    <span class="ml-3">创建的歌单</span>
                </div>
                <div class="created-wrap" v-show="isShowCreated">
                    <div class="list-item fs-2 text-41 pl-18 d-flex ai-center" v-for="item in createdSongList"
                        @click="goSongList(item.id)" :class="{ isActiveSongList: activeId === item.id }">
                        <i class="iconfont icon-gedan fs-5"></i>
                        <span class="fs-2 ml-3">{{ item.name }}</span>
                    </div>
                </div>
                <!--留给未登录的 暂时不做处理-->
                <!-- <div class="created-wrap" v-show="isShowCreated && !userFile?.userId">
                    <div class="list-item fs-2 text-41 pl-18 d-flex ai-center" v-for="item in tempCreatedSongList"
                        @click="goSongList(item.id)" :class="{ isActiveSongList: activeId === item.id }">
                        <i class="iconfont icon-24gl-heart"></i>
                        <span class="fs-2 ml-3">{{ item.name }}</span>
                    </div>
                </div> -->
            </div>

            <!--收藏的歌单-->
            <div class="collected-song-list" v-if="userFile?.profile?.userId">
                <div class="title pl-3" @click="isShowCollected = !isShowCollected">
                    <i class="iconfont icon-xiangyou fs-1" v-show="!isShowCollected"></i>
                    <i class="iconfont icon-xiangxia fs-1" v-show="isShowCollected"></i>
                    <span class="ml-3">收藏的歌单</span>
                </div>
                <div class="collected-wrap mt-10" v-show="isShowCollected">
                    <div class="list-item fs-2 text-41 pl-18 d-flex ai-center" v-for="item in collectedSongList"
                        @click="goSongList(item.id)" :class="{ isActiveSongList: activeId === item.id }">
                        <i class="iconfont icon-gedan fs-5"></i>
                        <span class="fs-2 ml-3">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useStore from "@/store"
import { storeToRefs } from 'pinia';
import { logOut } from '@/service/api/login/login';
import Cookies from 'js-cookie';


const { useGlobal, userProfile, useSideSongList, useTheme } = useStore()
const route = useRoute()
const router = useRouter()
const isActive = ref('isActive')
const { userFile } = storeToRefs(userProfile)
const { theme } = storeToRefs(useTheme)
const { createdSongList, collectedSongList, tempCreatedSongList } = storeToRefs(useSideSongList)
const isShowCreated = ref(true) // 是否展开创建的歌单
const isShowCollected = ref(true) // 是否展开收藏的歌单
const isShowInfoBox = ref(false) // 信息框， 用于退出登录



// 当前选中的歌单
const activeId = computed(() => {
    if (route.path.startsWith('/song-list')) {
        return Number(route.params?.id)
    }
})

// 前往个人中心
const goPersonalCenter = () => {
    const id = userFile.value?.profile?.userId
    if (id) {
        return router.push(`/personal-center/${id}`)
    }
    useGlobal.isShowLoginBox = true
}

// 是否选中某个导航栏
const active = (name1: string, name2?: string): boolean => {
    if (name2) {
        return route.path.startsWith('/' + name1) || route.path.startsWith('/' + name2)
    }
    return route.path.startsWith('/' + name1)
}

const showInfoBox = () => {
    if (isShowInfoBox.value) {
        return isShowInfoBox.value = false
    }
    isShowInfoBox.value = true
}

// 动态
const goDynamic = () => {
    // 接口没有关注总数
    router.push(`/focus?focusName=${userFile.value.profile.nickname}&id=${userFile.value.profile.userId}&focus=${userFile.value.profile.follows}`)
}

// 关注
const goFocus = () => {
    router.push(`/fans?fansName=${userFile.value.profile.nickname}&id=${userFile.value.profile.userId}`)
}

// 粉丝
const goFans = () => {
    router.push(`/dynamic?dynamicName=${userFile.value.profile.nickname}&id=${userFile.value.profile.userId}`)
}

// 退出登录
const logout = async () => {
    const r = await logOut()
    // 如果当前不是在首页
    if (route.path !== "/findMusic/personal-recommend") {
        // 清空数据
        userProfile.clearUserInfo()
        Cookies.remove("__csrf")
        // 回到首页
        router.replace("/findMusic/personal-recommend")
        //
    }
}
// 跳转
const go = (path: string): void => {
    if (route.path !== path) {
        if (path === "/my-collection") {
            router.push('/my-collection/1')
            return
        }
        router.push(path)
    }
}

// 前往歌单
const goSongList = (id: number) => {
    if (Number(route.params.id) !== id) {
        router.push(`/song-list/${id}`)
    }
}

// 检查点击区域， 用于隐藏点击的个人信息弹窗
const checkClickArea = (e: Event) => {
    const id = (e.target as any).id
    console.log(id, "iddddd");
    console.log(isShowInfoBox.value, "isShowInfoBox.valueisShowInfoBox.valueisShowInfoBox.value");
    if (id !== "info-box" && isShowInfoBox.value) {
        isShowInfoBox.value = false
    }
}

onMounted(() => {
    document.addEventListener("click", checkClickArea)
})
onUnmounted(() => {
    document.removeEventListener("click", checkClickArea)
})
</script>
<style scoped lang="scss">
.side-bar-wrapper {
    // display: flex;
    width: 200px;

    .head-info {
        height: 60px;

        .isLoginHeader,
        .isNotLoginHeader {
            height: 60px;
            padding: 14px 10px;
            @include flex(row, flex-start, center);
            position: relative;

            .avatar {
                margin-right: 12px;
                @include radius(40px);

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .toLogin {
                span {
                    color: var(--theme-e0);
                }

                @include flex(row, flex-start, center);
            }

            #info-box {
                width: 320px;
                height: 150px;
                position: absolute;
                top: 10px;
                left: 150px;
                border-radius: 10px;
                background-color: var(--theme-36);

                z-index: 10;

                .log-out {
                    width: 95px;
                    height: 30px;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid var(--theme-e5);

                    &:hover {
                        background-color: var(--theme-f2);
                    }
                }

                .account-info {

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
                            color: var(--theme-e5);
                            bottom: -10px;
                        }
                    }
                }
            }

            .isShowBoxShadow {
                box-shadow: -4px 0 6px -4px var(--theme-cc), 4px 4px 6px -4px var(--theme-cc), 4px -4px 6px -4px var(--theme-cc);
            }
        }
    }

    .all-navigator {
        height: calc(100% - 60px);
        overflow-y: auto;

        &::-webkit-scrollbar-track {
            background: var(--theme-ed);
            box-shadow: inset 0 0 5px var(--theme-ed);
        }
    }

    .main-navigator {
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
                background-color: var(--theme-e6); // dark: #1d1d1d
            }
        }
    }

    .title {
        color: #909090;
        margin-bottom: 4px;
        font-size: 13px;
    }

    .my-music {

        i {
            // font-size: 18px;
            margin-right: 10px;
        }

        span {
            font-size: 13px;
        }

        div:not(:first-child) {
            height: 35px;

            @include flex(row, flex-start, center);

            &:hover {
                background-color: var(--theme-e1);
            }
        }
    }

    .collected-song-list,
    .created-song-list {
        .list-item {
            height: 35px;
            width: 100%;
            line-height: 35px;
            @include no-wrap(192px);

            // display: flex;
            &:hover {
                background-color: var(--theme-e6); // dark: #1d1d1d
            }
        }
    }

    .isActive,
    .isActiveSongList {
        background-color: var(--theme-e1); // dark: #1b1b1b
        color: #d6635e;
    }
}
</style>
