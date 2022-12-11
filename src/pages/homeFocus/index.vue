<template>
    <DefaultLayout>
        <div class="home-focus-wrapper d-flex jc-between flex-wrap pt-10">
            <FocusAndFansItem v-for="item in 20"></FocusAndFansItem>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import FocusAndFansItem from '@/components/FocusAndFansItem.vue';
</script>
<style lang="scss" scoped>
.home-focus-wrapper {}
</style>
