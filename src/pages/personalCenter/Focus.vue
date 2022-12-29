<template>
    <DefaultLayout>
        <div class="home-focus-wrapper d-flex jc-between flex-wrap pt-10">
            <FocusAndFansItem v-for="item in focusList.data" :key="item.userId" :item="item"></FocusAndFansItem>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { getFocusList } from '@/service/api/user';
import { Follow } from '@/service/api/user/types';
import { getQueryId } from '@/utils';
import { reactive } from 'vue';
import FocusAndFansItem from './components/FocusAndFansItem.vue';
const focusList = reactive({ data: [] as Follow[] })
const id = getQueryId()
const getFocuList = async () => {
    const r = await getFocusList({ uid: id })
    focusList.data = r.follow
}
getFocuList()
</script>
<style lang="scss" scoped>

</style>