<template>
    <div class="switch-tab-wrapper mt-30" ref="songListComment">
        <div class="head d-flex">
            <div class="head-item mr-30 fs-4 text-4e" v-for="(item, index) in labelListMap"
                :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">
                <span>{{ item }}</span>
                <span v-if="item === '评论'" class="fs-2">({{ commentOfCount }})</span>
            </div>
        </div>
        <SongList v-show="activeIndex === 0" :is-show-loading="isShowLoading"
            @update-header-info="emits('updateInfo', { id: Number(route.params.id), flag: true })">
        </SongList>
        <SongListComment v-if="activeIndex === 1" :source-type="2" @change-comment-count="changeCommentCount">
        </SongListComment>
        <Collectors v-if="activeIndex === 2"></Collectors>
    </div>
</template>

<script lang="ts" setup>
// 歌单 ==> 0
// 歌手 ==> 1
// 专辑 ==> 2
import { ref, watch } from 'vue';
import { labelListMap } from "@/utils/const"
import SongListComment from "../song/SongListComment.vue"
import Collectors from "@/components/Collectors.vue"
import SongList from '../song/SongList.vue';
import { useRoute } from 'vue-router';
const commentOfCount = ref(0)
const route = useRoute()
const props = defineProps<{
    commentCount: number
    isShowLoading: boolean
}>()
const emits = defineEmits<{
    (e: "updateInfo", query: { id: number, flag: boolean }): void
}>()
watch(() => props.commentCount, (newVal) => {
    commentOfCount.value = newVal
})
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
