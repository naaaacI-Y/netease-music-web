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
        <div class="category d-flex ai-center jc-between mb-15">
            <div class="category-btn d-flex ai-center jc-center">
                <span class="fs-3 mr-5">{{ activeType === -1 ? "全部歌单" : types[activeType] }}</span>
                <i class="iconfont icon-xiangyou2 fs-3"></i>
            </div>
            <div class="main-category d-flex ai-center">
                <div class="category-item fs-1 mr-18 text-black_4" v-for="(item, index) in types"
                    :class="{ isActive: activeType === index }" @click="activeType = index" :key="index">{{ item }}
                </div>
            </div>
        </div>
        <div class="song-list d-flex flex-wrap jc-between">
            <RecommendSongListCard :is-out-side="false" v-for="item in 30"></RecommendSongListCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RecommendSongListCard from './personalRecommend/components/RecommendSongListCard.vue';
import { ref } from 'vue';

const types = ["华语", "流行", "摇滚", "民谣", "电子", "另类/独立", "轻音乐", "综艺", "影视原声", "ACG"]
const activeType = ref(-1)
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

    .category {
        .category-btn {
            border: 1px solid #c4c4c4;
            padding: 4px 0;
            width: 100px;
            border-radius: 20px;
        }

        .main-category {
            .category-item {
                position: relative;
                padding: 3px 5px;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    // color: #000;
                    cursor: pointer;
                }
            }

            .isActive {
                background-color: #fcf6f5;
                color: #d33b31;
                border-radius: 8px;
            }

            .category-item:not(:last-child)::after {
                content: "丨";
                display: black;
                font-size: 12px;
                color: #e4e4e4;
                position: absolute;
                right: -15px;
            }

            // .category-item:not(:last-child) {
            //     padding-right: 12px;
            //     border-right: 1px solid #ddd;
            // }
        }
    }
}
</style>
