<template>
    <DefaultLayout>
        <div class="persoanl-center-wrapper">
            <PersonalCenterHead></PersonalCenterHead>
            <div class="song-list-wrapper">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title">
                        <span class="fs-5" style="font-weight: bold;">我创建的歌单</span>
                        <span class="text-66 fs-2">(6)</span>
                    </div>
                    <div class="type-change d-flex">
                        <div class="type1 mr-2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                            <i class="iconfont icon-datu fs-9 text-66"></i>
                        </div>
                        <div class="type2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'table' }" @click="songListShowType = 'table'">
                            <i class="iconfont icon-liebiao fs-5 text-66"></i>
                        </div>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap jc-between" v-if="songListShowType === 'card'">
                        <RecommendSongListCard v-for="item in 10" :is-oneline="true">
                            <template #songCount>
                                <div class="text-66 fs-2">200首</div>
                            </template>
                        </RecommendSongListCard>
                    </div>
                    <div class="content-type2" v-if="songListShowType === 'table'">

                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import PersonalCenterHead from '@/components/PersonalCenterHead.vue';
import RecommendSongListCard from '../findMusic/personalRecommend/components/RecommendSongListCard.vue';
import { ref } from 'vue';
const songListShowType = ref("card") // card | table
</script>
<style lang="scss" scoped>
.persoanl-center-wrapper {
    padding: 15px 30px;
}

.song-list-wrapper {
    .head {
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

            .isActive {
                background-color: #bfbfbf;

                i {
                    color: white;
                }
            }
        }
    }

    .list-content {}
}
</style>
