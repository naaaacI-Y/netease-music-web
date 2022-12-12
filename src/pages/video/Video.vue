<template>
    <div class="video-wrapper">
        <CommonBtn :types="types" :active-type="activeType" @change-active-type="changeActiveType"></CommonBtn>
        <div class="video-list-wrap d-flex flex-wrap jc-between">
            <RecommendMvCard :is-play-btn="true" :is-show-time="true" v-for="item in 40"></RecommendMvCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CommonBtn from '@/components/CommonBtn.vue';
import RecommendMvCard from '../findMusic/personalRecommend/components/RecommendMvCard.vue';
import { ref } from 'vue';

const activeType = ref(0)
const types = ["现场", "翻唱", "舞蹈", "听BGM", "MV", "生活", "游戏", "ACG音乐", "最佳饭制"]
const changeActiveType = (num: number) => {
    activeType.value = num
}
</script>
<style lang="scss" scoped>
.video-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}
</style>
