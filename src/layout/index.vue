<template>
    <Nav :isChangeBgc='isShowPLayPage'></Nav>
    <div class="main-content">
        <side-bar></side-bar>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import musicPlayOther from '@/components/music-play-other'
// import Footer from '@/components/footer'
import SideBar from '@/components/SideBar.vue'
import Nav from "@/components/Nav.vue"
import { ref } from 'vue';
const isShowPLayPage = ref(false)
</script>

<style scoped lang='scss'>
.main-content {
    height: 100%;
    display: flex;

    .content {
        // height: 100%;
        background-color: white;
        width: calc(100% - 200px);
        overflow: scroll;
        padding-bottom: 100px;
    }
}
</style>