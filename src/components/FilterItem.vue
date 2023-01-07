<template>
    <div class="filter d-flex mb-10 ai-center " :class="{ isBetween: isBetween }">
        <slot name="left-label"></slot>
        <!-- <div class="filter-label fs-1 mr-8 text-33">{{ label }}：</div> -->
        <div class="language-list d-flex ai-center flex-wrap">
            <div class="filter-item fs-1 mr-30 text-7d" v-for="(item) in Object.entries(typeList)"
                :class="{ isActive: activeType === item[1] }" @click="emit('changeActiveType', item[0])" :key="item[1]">
                {{ item[0] }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    activeType: number
    typeList: { [key: string]: number }
    isBetween: boolean // 是否横向左右布局
}>(), {
    isBetween: true
})
const emit = defineEmits<{
    (e: "changeActiveType", name: string): void
}>()
</script>
<style lang="scss" scoped>
.filter {
    width: 100%;
}

.isBetween {
    justify-content: space-between;
}

.head:hover {
    cursor: pointer;
}



.filter-item {
    position: relative;
    padding: 3px 8px;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
}

.isActive {
    background-color: var(--theme-fcf6f5);
    color: #d33b31 !important;
    border-radius: 10px;
}

.filter-item:not(:last-child)::after {
    content: "丨";
    display: black;
    font-size: 12px;
    color: var(--theme-e5);
    position: absolute;
    right: -20px;
    top: 4px;
}
</style>
