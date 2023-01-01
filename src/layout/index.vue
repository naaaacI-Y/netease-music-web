<template>
    <Nav :isChangeBgc='isShowPlayPage'></Nav>
    <div class="main-content" :class="{ isAuto: !isNotVideo }">
        <side-bar v-show="isNotVideo"></side-bar>
        <div class="content" :class="{ isAuto: isNotVideo }">
            <slot></slot>
        </div>
    </div>
    <Footer v-show="isNotVideo" @showPlayPage="showPlayPage" :is-show-play="isShowPlayPage">
    </Footer>
    <MusicPlay play-type="songList" v-if="isShowPlayPage" :music-id="musicId" style="" class="music-play">
    </MusicPlay>
</template>

<script lang="ts" setup>
import MusicPlay from '@/components/music/MusicPlay.vue';
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const isShowPlayPage = ref(false)
const musicId = ref<number>()
const route = useRoute()
const isNotVideo = computed(() => {
    return !route.path.startsWith('/mv-detail') && !route.path.startsWith('/video-detail')
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
</script>

<style scoped lang='scss'>
.isAuto {
    overflow: auto;
}

.main-content {
    height: 100%;
    display: flex;
    justify-content: center;
    // overflow: auto;

    .content {
        background-color: white;
        width: calc(100% - 200px);
        // overflow: auto;
        padding-bottom: 100px;
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