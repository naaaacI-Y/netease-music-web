<template>
    <DefaultLayout>
        <div class="unique-play-wrapper d-flex flex-wrap jc-between">
            <UniqueCard v-for="item in 40" :card-width="230" :card-height="86"></UniqueCard>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import UniqueCard from '../findMusic/personalRecommend/components/UniqueCard.vue';
</script>
<style lang="scss" scoped>
.unique-play-wrapper {
    padding-top: 25px;
    width: 1040px;
    margin: auto;
}
</style>
