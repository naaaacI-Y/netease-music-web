<template>
    <DefaultLayout>
        <div class="home-fans-wrapper d-flex jc-between flex-wrap pt-10">
            <FocusAndFansItem v-for="item in fansList.data" :key="item.userId" :item="item"></FocusAndFansItem>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { getFansList } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import { getQueryId } from '@/utils';
import { reactive } from 'vue';
import FocusAndFansItem from './components/FocusAndFansItem.vue';
const fansList = reactive({ data: [] as Follow[] })
const id = getQueryId()
const getFanList = async () => {
    const r = await getFansList({ uid: id })
    fansList.data = r.followeds
}
getFanList()
</script>
<style lang="scss" scoped>

</style>
