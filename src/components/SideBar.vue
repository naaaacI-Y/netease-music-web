<template>
    <div class="side-bar-wrapper bg-ed">
        <div class="head-info">
            <div class="isLoginHeader" v-if="userFile?.userId" @click="goPersonalCenter">
                <div class="avatar">
                    <img :src="userFile.avatarUrl" alt="">
                </div>
                <div class="toLogin">
                    <span class="fs-3 mr-2">{{ userFile.nickname }}</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
            </div>
            <div class="isNotLoginHeader" @click="goPersonalCenter" v-if="!userFile?.userId">
                <div class="avatar">
                    <img src="@/assets/images/defaultAvatar.png" alt="">
                </div>
                <div class="toLogin">
                    <span class="fs-3 mr-2">未登录</span>
                    <i class="iconfont icon-xiangyou fs-1" style="color:#8e8e8e"></i>
                </div>
            </div>
        </div>
        <div class="other-navigator">
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
                <div class="my-collection pl-18" :class="{ isActive: active('my-collection') }" v-if="userFile?.userId"
                    @click="go('/my-collection')">
                    <i class="iconfont icon-shoucang fs-7"></i>
                    <span class="fs-7">我的收藏</span>
                </div>
            </div>
            <div class="created-song-list text-41 fs-18 mb-20 pl-3" v-if="userFile?.userId">
                <div class="title" @click="isShowCreated = !isShowCreated">
                    <i class="iconfont icon-xiangyou fs-1" v-show="!isShowCreated"></i>
                    <i class="iconfont icon-xiangxia fs-1" v-show="isShowCreated"></i>
                    <span class="ml-3">创建的歌单</span>
                </div>
                <div class="created-wrap" v-show="isShowCreated">
                    <div class="list-item fs-2 text-41 pl-18" v-for="item in createdSongList"
                        @click="goSongList(item.id)" :class="{ isActiveSongList: activeId === item.id }">
                        <i class="iconfont icon-gedan fs-5"></i>
                        <span class="fs-2 ml-3">{{ item.name }}</span>
                    </div>
                </div>
            </div>
            <div class="collected-song-list" v-if="userFile?.userId">
                <div class="title pl-3" @click="isShowCollected = !isShowCollected">
                    <i class="iconfont icon-xiangyou fs-1" v-show="!isShowCollected"></i>
                    <i class="iconfont icon-xiangxia fs-1" v-show="isShowCollected"></i>
                    <span class="ml-3">收藏的歌单</span>
                </div>
                <div class="collected-wrap mt-10" v-show="isShowCollected">
                    <div class="list-item fs-2 text-41 pl-18" v-for="item in collectedSongList"
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
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStore from "@/store"
import { storeToRefs } from 'pinia';
const { useGlobal, userProfile, useSideSongList } = useStore()
const route = useRoute()
const router = useRouter()
const isActive = ref('isActive')
const { userFile } = storeToRefs(userProfile)
const { createdSongList, collectedSongList } = storeToRefs(useSideSongList)
const isShowCreated = ref(false) // 是否展开创建的歌单
const isShowCollected = ref(false) // 是否展开收藏的歌单
const activeId = computed(() => {
    if (route.path.startsWith('/song-list')) {
        return Number(route.params?.id)
    }
})

const goPersonalCenter = () => {
    const id = userFile.value?.userId
    if (id) {
        return router.push(`/personal-center/${id}`)
    }
    useGlobal.isShowLoginBox = true
}
const active = (name1: string, name2?: string): boolean => {
    if (name2) {
        return route.path.startsWith('/' + name1) || route.path.startsWith('/' + name2)
    }
    return route.path.startsWith('/' + name1)
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
        }
    }

    .other-navigator {
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
