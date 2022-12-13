<template>
    <div class="switch-tab-wrapper mt-30">
        <div class="head d-flex">
            <div class="head-item mr-30 fs-4 text-black_2" v-for="(item, index) in labelListMap"
                :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">{{ item }}</div>
        </div>
        <SongList v-if="activeIndex === 0"></SongList>
        <SongListComment v-if="activeIndex === 1"></SongListComment>
        <div v-if="activeIndex === 2" class="detail">专辑详情</div>
    </div>
</template>

<script lang="ts" setup>
import SongListComment from "../song/SongListComment.vue"
import SongList from '../song/SongList.vue';
import { ref } from 'vue';

const labelListMap = ["歌曲列表", "评论", "专辑详情"]

const activeIndex = ref(0)
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
    .head {
        border-bottom: 1px solid #eee;

        .head-item {
            padding-bottom: 10px;

        }

        .isActive {
            border-bottom: 2px solid red;
            color: #d33b31;
        }
    }
}
</style>
