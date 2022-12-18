<template>
    <div class="filter d-flex mb-10 ai-center ">
        <div class="filter-label fs-1 mr-8 text-black_3">{{ label }}：</div>
        <div class="language-list d-flex ai-center flex-wrap">
            <div class="filter-item fs-1 mr-30 text-black_4" v-for="(item, index) in typeList"
                :class="{ isActive: activeType === item }" @click="emit('changeActiveType', item)" :key="index">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    activeType: string
    typeList: object
    label: string

}>()
const emit = defineEmits<{
    (e: "changeActiveType", name: string): void
}>()
</script>
<style lang="scss" scoped>
.filter-item {
    position: relative;
    padding: 3px 8px;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        // color: #000;
        cursor: pointer;
    }
}

.isActive {
    background-color: #fcf6f5;
    color: #d33b31;
    border-radius: 10px;
}

.filter-item:not(:last-child)::after {
    content: "丨";
    display: black;
    font-size: 12px;
    color: #e4e4e4;
    position: absolute;
    right: -20px;
    top: 4px;
}
</style>
