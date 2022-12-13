<template>
    <div class="head mb-12 d-flex ai-center ">最新音乐 <i class="iconfont icon-xiangyou1 ml-4"></i></div>

    <div class="new-music-wrapper d-flex ai-center jc-between mb-30">

        <div class="new-music-left">
            <div class="new-music-item" v-for="item in 5" :key="item">
                <NewMusicItem :index="item"></NewMusicItem>
            </div>

        </div>
        <div class="new-music-right">
            <div class="new-music-item" v-for="item in 5" :key="item">
                <NewMusicItem :index="item"></NewMusicItem>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import NewMusicItem from './components/NewMusicItem.vue';
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}

.new-music-wrapper {

    .new-music-left,
    .new-music-right {
        width: 513px;

        .new-music-item {
            border-top: 1px solid #eee;

            &:hover {
                background-color: #f5f5f5;
            }
        }

        // .new-music-item
    }
}
</style>
