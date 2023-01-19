<template>
    <div class="switch-tab-wrapper mt-30">
        <div class="head d-flex">
            <div class="head-item mr-30 fs-4 text-4e" v-for="(item, index) in labelListMap"
                :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">
                <span>{{ item }}</span>
                <span v-if="item === '评论'" class="fs-2">({{ commentOfCount }})</span>
            </div>
        </div>
        <SongList v-show="activeIndex === 0" :is-show-loading="isShowLoading"></SongList>
        <SongListComment v-if="activeIndex === 1" :source-type="3" @change-comment-count="changeCommentCount">
        </SongListComment>
        <div v-show="activeIndex === 2" class="detail pt-20">
            <div class="title mb-15 text-33 fs-4">专辑介绍</div>
            <div v-for="item in detailInfo" class="fs-1  mb-20 text-bc">{{ item }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SongListComment from "../song/SongListComment.vue"
import SongList from '../song/SongList.vue';
import { computed, ref, watch } from 'vue';
const props = defineProps<{
    commentCount: number
    albumDetailInfo: string
    isShowLoading: boolean
}>()
const commentOfCount = ref(0)
watch(() => props.commentCount, (newVal) => {
    commentOfCount.value = newVal
})
const detailInfo = computed(() => {
    return props.albumDetailInfo.split("\n")
})
const labelListMap = ["歌曲列表", "评论", "专辑详情"]
const activeIndex = ref(0)
const changeCommentCount = (count: number) => {
    commentOfCount.value = count
}
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
    .head {
        border-bottom: 1px solid var(--theme-ee);

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
