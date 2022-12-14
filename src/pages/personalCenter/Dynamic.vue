<template>
    <DefaultLayout>
        <div class="home-dynamic-wrapper">
            <DynamicItem v-for="item in 10"></DynamicItem>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import DynamicItem from './components/DynamicItem.vue'
</script>
<style lang="scss" scoped>
.home-dynamic-wrapper {
    width: 100%;
    padding: 18px 30px;
    margin: auto;
}
</style>