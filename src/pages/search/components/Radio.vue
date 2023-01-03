<template>
    <div class="radio-wrapper">
        <CommonItem v-for="(item, index) in radioList.data" :key="item.id" :index="index">
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
                <div class="author fs-1 d-flex ai-center text-cd">
                    <span class="by mr-5">by</span>
                    <span class="auth">{{ item.dj.nickname }}</span>
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import { DjRadio, SearchRadioResult } from '@/service/api/search/types';
import { reactive } from 'vue';
import { useRoute } from "vue-router"
import { defineEmits } from 'vue';
import CommonItem from './CommonItem.vue';
import { searchByType } from '@/service/api/search';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().params.keywords as string
const radioList = reactive({ data: [] as DjRadio[] })
const getSearchRadioLIst = async () => {
    const r = await searchByType({ keywords, type: 1009 })
    const _ = r.result as unknown as SearchRadioResult
    emits("changeTotal", _.djRadiosCount)
    radioList.data = _.djRadios
}
getSearchRadioLIst()
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

.author .auth:hover {
    color: #333;
    cursor: pointer;
}
</style>
