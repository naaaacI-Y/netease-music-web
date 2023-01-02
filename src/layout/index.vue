<template>
    <Nav :isChangeBgc='isShowPlayPage' @input-on-focus="inputOnFocus" @input-on-blur="inputOnBlur"
        @handle-key-words-change="handleKeyWordsChange"></Nav>
    <div class="main-content" :class="{ isAuto: !isNotVideo }">
        <side-bar v-show="isNotVideo"></side-bar>
        <div class="content" :class="{ isAuto: isNotVideo && isNotSearch }">
            <slot></slot>

            <SearchResultBox :search-keywords="searchKeyWords" v-if="isShowSearchBox"></SearchResultBox>
        </div>
    </div>
    <Footer v-show="isNotVideo" @showPlayPage="showPlayPage" :is-show-play="isShowPlayPage">
    </Footer>
    <MusicPlay play-type="songList" v-if="isShowPlayPage" :music-id="musicId" style="" class="music-play">
    </MusicPlay>
</template>

<script lang="ts" setup>
import SearchResultBox from '@/pages/search/SearchResultBox.vue';
import MusicPlay from '@/components/music/MusicPlay.vue';
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const isShowPlayPage = ref(false)
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
const showPlayPage = (id: number) => {
    isShowPlayPage.value = !isShowPlayPage.value
    musicId.value = id
}
// 输入框获取焦点
const inputOnFocus = (value: string) => {
    searchKeyWords.value = value
    isShowSearchBox.value = true
}
// 输入框失去焦点
const inputOnBlur = (value: string) => {
    searchKeyWords.value = value
    isShowSearchBox.value = false
}
// 输入框值改变 触发的函数
const handleKeyWordsChange = (value: string) => {
    searchKeyWords.value = value
}
</script>

<style scoped lang='scss'>
.isAuto {
    overflow: auto;
}

.main-content {
    height: calc(100% - 110px);
    display: flex;
    justify-content: center;
    // overflow: auto;

    .content {
        background-color: white;
        width: calc(100% - 200px);
        position: relative;
        // overflow: auto;
        // padding-bottom: 100px;
    }
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