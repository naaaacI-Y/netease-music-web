<template>
    <div class="song-wrapper">
        <CommonItem v-for="(item, index) in singerList.data" :key="item.id" :index="index">
            <template #avatar>
                <div class="avatar mr-15">
                    <img :src="item.picUrl" alt="">
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    {{ item.name }}
                </div>
            </template>
            <template #singer-flag v-if="item.accountId">
                <div class="singer-flag fs-3 d-flex ai-center jc-center">
                    <i class="iconfont icon-iconfontyonghuming text-white"></i>
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import { searchByType } from '@/service/api/search';
import { useRoute } from "vue-router"
import { Artist, SearchSingerResult } from '@/service/api/search/types';
import { reactive } from 'vue';
import CommonItem from './CommonItem.vue';
const singerList = reactive({ data: [] as Artist[] })

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().query.keywords as string
const getSearchSinger = async () => {
    const r = await searchByType({ keywords: keywords, type: 100 })
    const _ = r.result as unknown as SearchSingerResult
    singerList.data = _.artists
    emits("changeTotal", _.artistCount)
}
getSearchSinger()
</script>
<style lang="scss" scoped>
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;

    }
}

.singer-flag {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #c3473a;
}
</style>
