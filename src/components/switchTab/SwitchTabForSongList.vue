<template>
    <div class="switch-tab-wrapper mt-30" ref="songListComment">
        <div class="head d-flex">
            <div class="head-item mr-30 fs-4 text-black_2" v-for="(item, index) in labelListMap"
                :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">
                <span>{{ item }}</span>
                <span v-if="item === '评论'" class="fs-2">({{ commentCount }})</span>
            </div>
        </div>
        <SongList v-if="activeIndex === 0"></SongList>
        <SongListComment v-if="activeIndex === 1" :source-type="2"></SongListComment>
        <Collectors v-if="activeIndex === 2"></Collectors>
    </div>
</template>

<script lang="ts" setup>
// 歌单 ==> 0
// 歌手 ==> 1
// 专辑 ==> 2
import { ref } from 'vue';
import SongListComment from "../song/SongListComment.vue"
import Collectors from "@/components/Collectors.vue"
import SongList from '../song/SongList.vue';
const props = defineProps<{
    commentCount: number
}>()

const labelListMap = ["歌曲列表", "评论", "收藏者"]
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
