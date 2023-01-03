<template>
    <div class="album-wrapper">
        <CommonItem v-for="(item, index) in albumList.data" :key="item.id" :index="index">
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
            <template #author>
                <div class="author fs-1 d-flex ai-center">
                    <span class="text-black_5">{{ item.artist.name }}</span>
                    <span class="alia text-black_6" v-if="item.alias?.length">({{ item.alias[0] }})</span>
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup name="Album">
import { reactive, ref } from 'vue';
import CommonItem from './CommonItem.vue';
import { Album } from "@/service/api/recommend/types"
import { useRoute } from 'vue-router';
import { searchByType } from '@/service/api/search';
import { SearchAlbumResult } from '@/service/api/search/types';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const total = ref(0)
const keywords = useRoute().params.keywords as string
const albumList = reactive({ data: [] as Album[] })
const getSearchAlbumList = async () => {
    const r = await searchByType({ keywords: keywords, type: 10 })
    const _ = r.result as unknown as SearchAlbumResult
    albumList.data = _.albums
    total.value = _.albumCount
    emits("changeTotal", total.value)
}
getSearchAlbumList()
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

.author {
    width: 45%;
}
</style>
