<template>
    <Nav :isChangeBgc='isShowPlayPage' @handle-key-words-change="handleKeyWordsChange"
        :is-show-notification="isShowMessageBox">
    </Nav>
    <div class="main-content" :class="[!isNotVideo ? 'isAuto' : '', !isNotVideo ? 'isVideoPlay' : '']">
        <side-bar v-show="isNotVideo"></side-bar>
        <div class="content bg-white" :class="{ isAuto: isNotVideo && isNotSearch }" id="content" v-if="!isShowReset">
            <slot></slot>
            <SearchResultBox :search-keywords="searchKeyWords" v-if="isShowSearchBox" @hideSearchBox="hideSearchBox">
            </SearchResultBox>
            <MessageBox v-if="isShowMessageBox"></MessageBox>
        </div>
        <div class="content" v-if="isShowReset">
        </div>
    </div>
    <Footer v-show="isNotVideo" @showPlayPage="showPlayPage" :is-show-play="isShowPlayPage">
    </Footer>
    <transition name="fade">
        <MusicCommon v-if="isShowPlayPage" :music-id="player.currentTrack.id" style="" class="music-play"
            play-type="songList">
        </MusicCommon>
    </transition>
    <Login v-if="isShowLoginBox"></Login>
    <div class="reset d-flex ai-center jc-center" v-if="isShowReset">
        正在为您生成个性化推荐
    </div>
</template>

<script lang="ts" setup>
import Login from '@/components/Login.vue';
import MusicCommon from '@/components/music/MusicCommon.vue';
import SearchResultBox from '@/pages/search/SearchResultBox.vue';
import MessageBox from "@/pages/message/index.vue"
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { clearCookieInfo } from '@/config/user';

const { useGlobal, usePlayer, userProfile } = useStore()
const { isShowLoginBox, isShowPlayPage, loginOrLogout } = storeToRefs(useGlobal)
const { player } = storeToRefs(usePlayer)
const isShowSearchBox = ref(false) // 是否显示搜索弹窗
const isShowMessageBox = ref(false) // 是否显示消息通知
const searchKeyWords = ref("")
const musicId = ref<number>()
const route = useRoute()
const router = useRouter()

const isNotVideo = computed(() => {
    return !route.path.startsWith('/mv-detail') && !route.path.startsWith('/video-detail')
})
const isNotSearch = computed(() => {
    return !route.path.startsWith('/search-result-detail')
})
const isShowReset = computed(() => {
    return !!loginOrLogout.value
})

// 监听登录/退出状态
watch(() => loginOrLogout.value, (newVal, oldVal) => {
    if (route.path !== "/findMusic/personal-recommend" && newVal) {
        // 回到首页
        router.replace("/findMusic/personal-recommend")
    }
    newVal && setTimeout(async () => {
        if (newVal === -1) {
            clearCookieInfo()
        }
        // 页面刷新
        window.location.reload()
    }, 2000)
})
watch(() => isShowPlayPage.value, (newVal) => {
    if (!newVal) {
        musicId.value = undefined
    }
})

// 是否显示音乐播放界面
const showPlayPage = (id: number) => {
    useGlobal.isShowPlayPage = !useGlobal.isShowPlayPage
    musicId.value = id
}

// const notificationChange = (isShow: boolean) => {
//     isShowMessageBox.value = isShow
// }

// 隐藏搜索框
const hideSearchBox = () => {
    isShowSearchBox.value = false
}

// 输入框值改变 触发的函数
const handleKeyWordsChange = (value: string) => {
    searchKeyWords.value = value
}

onMounted(() => {
    document.addEventListener("click", (e: Event) => {
        const targetId = (e.target as any)?.id
        const offsetParentId = (e.target as any)?.offsetParent?.id
        if (targetId === "skin-icon") {
            isShowMessageBox.value = !isShowMessageBox.value
        }
        if (targetId !== "skin-icon" && offsetParentId !== "message-box-wrapper") {
            isShowMessageBox.value = false
        }
        if (offsetParentId === "message-box-wrapper" || targetId === "message-box-wrapper") {
            isShowMessageBox.value = true
        }
        if (targetId !== "search-box" && offsetParentId !== "search-result-box-wrapper") {
            // 不是点击的搜索框或者搜索结果弹出框
            isShowSearchBox.value = false
        } else {
            isShowSearchBox.value = true
        }
    })
})
</script>

<style scoped lang='scss'>
.main-content {
    height: calc(100% - 110px);
    display: flex;
    justify-content: center;
    // overflow: auto;

    .content {
        width: calc(100% - 200px);
        position: relative;
        // overflow: auto;
        // padding-bottom: 100px;
    }
}

.isAuto {
    overflow: auto;
}

.isVideoPlay {
    background-color: var(--theme-white);
    height: 100vh;
}



.music-play {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    overflow: scroll;
    height: calc(100vh - 110px);
    background-color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.reset {
    position: absolute;
    width: calc(100% - 200px);
    height: calc(100% - 110px);
    top: 50px;
    right: 0;
    color: var(--theme-3a);
    background-color: var(--theme-white);
}
</style>