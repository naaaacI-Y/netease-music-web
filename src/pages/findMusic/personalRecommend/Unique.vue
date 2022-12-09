<template>
    <div class="head mb-12 d-flex ai-center">独家放送 <i class="iconfont icon-xiangyou1 ml-4"></i></div>
    <div class="unique-wrapper d-flex jc-between mb-30">
        <UniqueCard v-for="item in 4" :key="item"></UniqueCard>
    </div>
</template>

<script lang="ts" setup>
import UniqueCard from './components/UniqueCard.vue';
</script>
<style lang="scss" scoped>
.head:hover {
    cursor: pointer;
}
</style>
