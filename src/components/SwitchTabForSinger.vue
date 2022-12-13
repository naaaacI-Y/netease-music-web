<template>
    <div class="switch-tab-wrapper mt-30">
        <div class="head d-flex jc-between">
            <div class="head-item-wrapper d-flex">
                <div class="head-item mr-30 fs-4 text-black_2" v-for="(item, index) in labelListMap"
                    :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">{{ item }}
                </div>
            </div>
            <div class="change-radio" v-if="activeIndex === 0">
                <div class="type-change d-flex">
                    <div class="type1 mr-2 d-flex ai-center jc-center"
                        :class="{ isBtnActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                        <i class="iconfont icon-datu fs-9 text-66"></i>
                    </div>
                    <div class="type2 d-flex ai-center jc-center" :class="{ isBtnActive: songListShowType === 'list' }"
                        @click="songListShowType = 'table'">
                        <i class="iconfont icon-liebiao fs-5 text-66"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="album pt-20" v-if="activeIndex === 0">
            <div class="album-card-wrap d-flex jc-between flex-wrap" v-if="songListShowType === 'card'">
                <CardForAlbum v-for="item in 12"></CardForAlbum>
            </div>
            <div class="album-list-wrap" v-if="songListShowType === 'list'">
            </div>
        </div>
        <div v-if="activeIndex === 1" class="mv">
            <div class="mv-wrapper d-flex flex-wrap pt-25 jc-between">
                <RecommendMvCard :is-show-time="true" v-for="item in 30" :is-oneline="true" :count="5">
                </RecommendMvCard>
            </div>
        </div>
        <div v-if="activeIndex === 2" class="detail">详情</div>
        <div v-if="activeIndex === 3" class="simlary">
            <div class="simlary-wrapper d-flex flex-wrap pt-25 jc-between">
                <SingerCard v-for="item in 30" :is-show-singer-flag="false"></SingerCard>
            </div>
        </div>
        <div class="performance" v-if="activeIndex === 4">演出信息</div>

    </div>
</template>

<script lang="ts" setup>
import RecommendMvCard from '@/pages/findMusic/personalRecommend/components/RecommendMvCard.vue';
import SingerCard from './SingerCard.vue';
import CardForAlbum from './CardForAlbum.vue';
import { ref } from 'vue';
const labelListMap = ["专辑", "MV", "歌手详情", "相似歌手", "演出"]

const activeIndex = ref(0)
const songListShowType = ref("card")
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

        .type-change {

            .type1,
            .type2 {
                width: 25px;
                height: 20px;
                background-color: #f2f2f2;
            }

            .type1 {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .type2 {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            .isBtnActive {
                background-color: #bfbfbf;

                i {
                    color: white;
                }
            }
        }
    }
}
</style>
