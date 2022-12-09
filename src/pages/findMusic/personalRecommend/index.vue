<template>
    <div class="personal-recommend-wrapper d-flex flex-column">
        <RecommendCarousel></RecommendCarousel>
        <RecommendSonglist></RecommendSonglist>
        <Unique></Unique>
        <NewMusic></NewMusic>
        <RecommendMv></RecommendMv>
    </div>
</template>

<script lang="ts" setup>
import NewMusic from './NewMusic.vue';
import RecommendCarousel from './RecommendCarousel.vue';
import RecommendSonglist from './RecommendSonglist.vue';
import Unique from './Unique.vue';
import RecommendMv from './RecommendMv.vue';
</script>
<style lang="scss" scoped>
.personal-recommend-wrapper {
    // height: 100%;
    width: 1040px;
    margin: auto;
}
</style>
