<template>
    <div class="head mb-12 d-flex ai-center">推荐MV <i class="iconfont icon-xiangyou1 ml-4"></i></div>
    <div class="recommend-card-wrapper d-flex jc-between">
        <RecommendMvCard v-for="item in 4" :key="item"></RecommendMvCard>
    </div>
</template>

<script lang="ts" setup>
import RecommendMvCard from './components/RecommendMvCard.vue';
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}
</style>
