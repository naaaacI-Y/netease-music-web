<template>
    <div class="switch-tab-wrapper mt-30">
        <div class="head d-flex">
            <div class="head-item mr-30 fs-4 text-black_2" v-for="(item, index) in labelListMap"
                :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">{{ item }}</div>
        </div>
        <div class="album" v-if="activeIndex === 0">专辑</div>
        <div v-if="activeIndex === 1" class="mv">mv</div>
        <div v-if="activeIndex === 2" class="detail">详情</div>
        <div v-if="activeIndex === 3" class="simlary">相似歌手</div>
        <div class="performance" v-if="activeIndex === 4">演出信息</div>
    </div>
</template>

<script lang="ts" setup>import { ref } from 'vue';
const labelListMap = ["专辑", "MV", "歌手详情", "相似歌手", "演出"]

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
