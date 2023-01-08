<template>
    <div class="pagination-wrapper d-flex ai-center jc-center">
        <div id="pagination"></div>
    </div>
</template>

<script lang="ts" setup>
import Pagination from '@/utils/Pagination';
import { onMounted, ref, watch } from 'vue';
const props = defineProps<{
    size: number
    page: number
    total: number
    index?: number
}>()
const emits = defineEmits<{
    (e: "pageChange", num: number): void
}>()
let pagination = ref(null) as any
const initPagination = () => {
    pagination.value = null
    return new Pagination({
        //实例化组件
        wrap: document.getElementById('pagination'), //容器
        page: props.page, // 当前页,默认初始为1
        size: props.size, //页面条数
        total: props.total,
        callback: function (page: number) {
            // 触发页码更新
            emits("pageChange", page)

        }
    })
}
watch(() => props.index, () => {
    initPagination()
    if (pagination.value) {
        pagination.value.changeTotal(props.total)

    }
})
onMounted(() => {
    initPagination()
})
</script>
<style lang="scss">
.pagination-wrapper {
    #pagination {
        [class$=_pager] {
            user-select: none;
            list-style: none;
            display: inline-block;
            vertical-align: top;
            font-size: 0;
            padding: 0;
            margin: 0;
        }

        button,
        li {
            display: inline-block;
            vertical-align: top;
            font-size: 13px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            padding: 0 4px;
            height: 25px;
            line-height: 25px;
            margin: 0 5px;
            background-color: var(--theme-white);
            border: 1px solid var(--theme-f2);
            color: #606266;
            min-width: 25px;
            border-radius: 4px;
        }

        button:disabled {
            color: #c0c4cc;
        }

        li:hover {
            background-color: var(--theme-f5); // dark: #2e2e2e
        }

        .number.active {
            background-color: #c3473a;
            color: #fff;
            cursor: default;
        }

        li.btn-quicknext,
        li.btn-quickprev {
            font-weight: bold;
            line-height: 20px;
        }

        li.btn-quicknext.active,
        li.btn-quickprev.active {
            font-size: 12px;
            letter-spacing: -2px;
            line-height: 26px;
        }
    }

}
</style>
