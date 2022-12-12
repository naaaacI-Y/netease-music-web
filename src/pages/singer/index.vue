<template>
    <DefaultLayout>
        <div class="singer-homepage-wrapper">
            <SingerHeader></SingerHeader>
            <SwitchTab :type="1"></SwitchTab>
        </div>
    </DefaultLayout>

</template>

<script lang="ts" setup>
import SingerHeader from '@/components/SingerHeader.vue';
import SwitchTab from '@/components/SwitchTab.vue';
</script>
<style lang="scss" scoped>
.singer-homepage-wrapper {
    padding: 15px 30px;
}
</style>
