<template>
    <DefaultLayout>
        <div class="search-result-detail-wrapper">
            <div class="head d-flex ai-center mb-12 pt-20">
                <div class="keywords mr-5">{{ keywords }}</div>
                <div class="total fs-2 text-66">找到&ensp;{{ total }}&ensp;{{ showWord }}</div>
            </div>
            <div class="switch-tab-wrap d-flex">
                <div class="switch-tab-item mr-30 fs-3 text-black_1 pb-5"
                    v-for="(item, index) in Object.keys(searchTypeList)" @click="changeItem(item)"
                    :class="{ isActive: index === activeIndex }">{{ item }}</div>
            </div>
            <div class="result-wrapper">
                <component :is="tabsComponents[showWhichComponent]" @changeTotal="changeTotal"></component>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Album from "./components/Album.vue"
import Lyric from "./components/Lyric.vue"
import Singer from "./components/Singer.vue"
import Video from "./components/Video.vue"
import Song from "./components/Song.vue"
import User from "./components/User.vue"
import Radio from "./components/Radio.vue"
import SongList from "./components/SongLIst.vue"
import { searchTypeList } from "@/utils/const"
import { computed, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
const tabsComponents = {
    Album, Lyric, Singer, Video, Song, User, Radio, SongList
}
const keywords = ref(useRoute().params.keywords)
const activeIndex = ref(0)
const total = ref(50)
onBeforeRouteUpdate((to, from, next) => {
    keywords.value = to.params.keywords
    activeIndex.value = 0
    next()
})
const showWord = computed(() => {
    const type = Object.keys(searchTypeList)[activeIndex.value] as keyof typeof searchTypeList
    return searchTypeList[type].unit + type
})
const showWhichComponent = computed(() => {
    const type = Object.keys(searchTypeList)[activeIndex.value] as keyof typeof searchTypeList
    return searchTypeList[type].component
})
const changeItem = (item: string) => {
    const index = Object.keys(searchTypeList).findIndex(it => it === item)
    activeIndex.value = index
}
const changeTotal = (num: number) => {
    total.value = num
}
</script>
<style lang="scss" scoped>
.search-result-detail-wrapper {
    width: 100%;
    height: 100%;

    .head {
        padding: 20px 30px 0;

        .keywords {
            font-size: 22px;
            font-weight: bold;
        }
    }

    .switch-tab-wrap {
        border-bottom: 1px solid #f2f2f2;
        // padding: 0 30px;
        margin: 0 30px;

        .switch-tab-item {
            &:hover {
                cursor: pointer;
            }
        }

        .isActive {
            color: #c3473a;
            border-bottom: 2px solid #c3473a;
            font-weight: bold;
        }
    }

    .result-wrapper {
        overflow: auto;
        height: calc(100% - 90px);
    }
}
</style>
