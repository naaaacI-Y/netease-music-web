<template>
    <div class="comment-dialog-wrapper">
        <div class="comment-dialog-body">
            <div class="close-btn">
                <i class="iconfont icon-guanbi fs-9"></i>
            </div>
            <div class="head mb-10 text-center">{{ headName }}</div>
            <div class="comment-input">
                <textarea id="textArea" rows="7" maxlength="140" v-model="commentContent"
                    :placeholder="placeHolder"></textarea>
            </div>
            <div class="max-length fs-3 text-black_6 pr-10">{{ maxLength - commentContent.length }}</div>
            <div class="submit-comment text-white fs-4 bg-primary_red_1 d-flex ai-center jc-center mt-13"
                :class="maxLength === 140 ? 'hasNoContent' : ''" @click="submitContent">评 论</div>
        </div>
    </div>
</template>

<script lang="ts" setup>import { computed, ref } from 'vue';

withDefaults(defineProps<
    {
        headName?: string,
        placeHolder?: string
    }>(), {
    headName: "评论",
    placeHolder: "发表评论"
})
const emit = defineEmits<{
    (e: "submitComment", content: string): void
}>()
const commentContent = ref("")
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})
const submitContent = () => {
    if (!commentContent.value.length) return
    emit("submitComment", commentContent.value)
}
</script>
<style lang="scss" scoped>
.comment-dialog-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;

    .comment-dialog-body {
        width: 470px;
        position: absolute;
        height: 257px;
        left: 50%;
        top: 50%;
        background-color: white;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 1px 1px 4px #ddd;
        padding: 15px;

        .close-btn {
            position: absolute;
            top: 15px;
            left: 15px;

            &:hover {
                cursor: pointer;
            }
        }

        #textArea {
            width: 100%;
            resize: none;
            border: 1px solid #d4d4d4;
            border-radius: 8px;
            padding: 8px 12px;
        }

        .max-length {
            direction: rtl;
        }

        .submit-comment {
            width: 85px;
            height: 30px;
            border-radius: 20px;
        }

        .submit-comment {
            position: relative;
            left: 355px;

            &:hover {
                cursor: pointer;
            }
        }

        .hasNoContent {
            background-color: rgba($color: #d33b31, $alpha: 0.5);
        }
    }
}
</style>
