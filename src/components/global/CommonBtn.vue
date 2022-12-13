<template>
    <div class="category d-flex ai-center jc-between mb-15">
        <div class="category-btn d-flex ai-center jc-center" v-if="isShowBtn">
            <span class="fs-3 mr-5">{{ activeType === -1 ? "全部歌单" : types[activeType] }}</span>
            <i class="iconfont icon-xiangyou2 fs-3"></i>
        </div>
        <div class="main-category d-flex ai-center">
            <div class="category-item fs-1 mr-18 text-black_4" v-for="(item, index) in types"
                :class="{ isActive: activeType === index }" @click="emit('changeActiveType', index)" :key="index">{{
        item
                }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    types: Array<string>
    activeType: number
    isShowBtn?: boolean
}>(), {
    isShowBtn: true
})
const emit = defineEmits<{
    (e: "changeActiveType", num: number): void
}>()
</script>
<style lang="scss" scoped>
.category {
    .category-btn {
        border: 1px solid #c4c4c4;
        padding: 4px 0;
        width: 100px;
        border-radius: 20px;
    }

    .main-category {
        .category-item {
            position: relative;
            padding: 3px 5px;

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
            border-radius: 8px;
        }

        .category-item:not(:last-child)::after {
            content: "丨";
            display: black;
            font-size: 12px;
            color: #e4e4e4;
            position: absolute;
            right: -15px;
        }
    }
}
</style>
