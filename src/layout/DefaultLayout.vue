<template>
    <Nav :isChangeBgc='isShowPlayPage' @handle-key-words-change="handleKeyWordsChange">
    </Nav>
    <div class="main-content" :class="[!isNotVideo ? 'isAuto' : '', !isNotVideo ? 'isVideoPlay' : '']">
        <side-bar v-show="isNotVideo"></side-bar>
        <div class="content bg-white" :class="{ isAuto: isNotVideo && isNotSearch }" id="content">
            <slot></slot>
            <SearchResultBox :search-keywords="searchKeyWords" v-if="isShowSearchBox" @hideSearchBox="hideSearchBox">
            </SearchResultBox>
        </div>
    </div>
    <Footer v-show="isNotVideo" @showPlayPage="showPlayPage" :is-show-play="isShowPlayPage">
    </Footer>
    <transition>
        <MusicCommon v-if="isShowPlayPage" :music-id="player.currentTrack.id" style="" class="music-play"
            play-type="songList">
        </MusicCommon>
    </transition>
    <Login v-if="isShowLoginBox"></Login>
</template>

<script lang="ts" setup>
import Login from '@/components/Login.vue';
import MusicCommon from '@/components/music/MusicCommon.vue';
import SearchResultBox from '@/pages/search/SearchResultBox.vue';
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useStore from '@/store';

const { useGlobal, usePlayer } = useStore()
const { isShowLoginBox, isShowPlayPage } = storeToRefs(useGlobal)
const { player } = storeToRefs(usePlayer)
const isShowSearchBox = ref(false)
const searchKeyWords = ref("")
const musicId = ref<number>()
const route = useRoute()

const isNotVideo = computed(() => {
    return !route.path.startsWith('/mv-detail') && !route.path.startsWith('/video-detail')
})
const isNotSearch = computed(() => {
    return !route.path.startsWith('/search-result-detail')
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
// 隐藏搜索框
const hideSearchBox = () => {
    isShowSearchBox.value = false
}
// // 输入框获取焦点
// const inputOnFocus = (value: string) => {
//     console.log("inputOnFocus");

//     searchKeyWords.value = value
//     isShowSearchBox.value = true
// }
// 输入框值改变 触发的函数
const handleKeyWordsChange = (value: string) => {
    searchKeyWords.value = value
}
onMounted(() => {
    document.addEventListener("click", (e: Event) => {
        const targetId = (e.target as any)?.id
        const offsetParentId = (e.target as any)?.offsetParent?.id
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
    // background-color: var(--theme-white);
    // // height: 100vh;
    // height: 100%;
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
</style>