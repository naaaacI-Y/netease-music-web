<template>
    <Nav :isChangeBgc='isShowPLayPage'></Nav>
    <div class="main-content" :class="{ isAuto: route.path.startsWith('/video-detail') }">
        <side-bar v-if="route.path !== '/video-detail'"></side-bar>
        <div class="content" :class="{ isAuto: !route.path.startsWith('/video-detail') }">
            <slot></slot>
        </div>
    </div>
    <Footer v-if="route.path !== '/video-detail'"></Footer>
</template>

<script lang="ts" setup>
// import musicPlayOther from '@/components/music-play-other'
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const isShowPLayPage = ref(false)
const route = useRoute()
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
</style>