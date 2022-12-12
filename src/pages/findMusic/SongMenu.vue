<template>
    <div class="song-menu-wrapper">
        <div class="head-card mt-15 d-flex mb-15">
            <div class="card-img mr-12"></div>
            <div class="main-info d-flex flex-column jc-center">
                <div class="logo fs-3 mb-20">
                    <i class="iconfont icon-huangguan mr-3"></i>
                    <span>精品歌单</span>
                </div>
                <div class="main-label text-white mb-6 fs-4">标题标题标题标题标题</div>
                <div class="main-sub-label fs-2 text-c4">副标题副标题副标题副标题</div>
            </div>
        </div>
        <CommonBtn :active-type="activeType" :types="types" @change-active-type="changeActiveType"></CommonBtn>
        <div class="song-list d-flex flex-wrap jc-between">
            <RecommendSongListCard :is-out-side="false" v-for="item in 30"></RecommendSongListCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RecommendSongListCard from './personalRecommend/components/RecommendSongListCard.vue';
import CommonBtn from '@/components/CommonBtn.vue';
import { ref } from 'vue';

const types = ["华语", "流行", "摇滚", "民谣", "电子", "另类/独立", "轻音乐", "综艺", "影视原声", "ACG"]
const activeType = ref(-1)
const changeActiveType = (num: number) => {
    activeType.value = num
}
</script>
<style lang="scss" scoped>
.song-menu-wrapper {
    padding-top: 20px;
    width: 1040px;
    margin: auto;

    .head-card {
        height: 170px;
        background-color: #9598a1;
        border-radius: 10px;
        padding: 15px;

        .card-img {
            width: 140px;
            height: 140px;
            border-radius: 10px;
            overflow: hidden;
            background-color: aqua;
        }

        .main-info {
            .logo {
                width: 100px;
                height: 30px;
                border-radius: 20px;
                border: 1px solid #deac67;
                color: #deac67;
                text-align: center;
                line-height: 30px;
            }
        }
    }
}
</style>
