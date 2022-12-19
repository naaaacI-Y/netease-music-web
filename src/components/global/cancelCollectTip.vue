<template>
    <div class="cancel-collect-wrapper d-flex ai-center jc-center">
        <div class="close">
            <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="content">{{ content }}</div>
        <div class="confirm text-white bg-primary_red_4" @clic="confirm2cancelCollect">确定</div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    content: string
}>()
const emits = defineEmits<{
    (e: "confirm2Cancel"): void
}>()
const confirm2cancelCollect = () => {
    // 取消收藏 TODO

    emits("confirm2Cancel")
}
</script>
<style lang="scss" scoped>
.cancel-collect-wrapper {
    width: 470px;
    height: 145px;
    border-radius: 5px;
    box-shadow: 1px 1px 4px #ccc;
    position: relative;

    .close {
        position: absolute;
        top: 15px;
        left: 15px;
    }

    .confirm {
        width: 90px;
        height: 32px;
        text-align: center;
        line-height: 32px;
    }
}
</style>
