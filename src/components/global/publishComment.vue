<template>
    <div class="comment-dialog-wrapper">
        <div class="comment-dialog-body">
            <div class="close-btn" @click="emits('close')">
                <i class="iconfont icon-guanbi fs-9"></i>
            </div>
            <div class="head mb-10 text-center">{{ params?.title }}</div>
            <div class="comment-input">
                <textarea id="textArea" rows="7" maxlength="140" v-model="commentContent"
                    :placeholder="params?.replyName ? `回复 ${params?.replyName}：` : '发表评论'"></textarea>
            </div>
            <div class="max-length fs-3 text-97 pr-10">{{ maxLength }}</div>
            <div class="submit-comment  fs-4 bg-primary_red_4 d-flex ai-center jc-center mt-13" style="color:white"
                :class="maxLength === 140 ? 'hasNoContent' : ''" @click="submitContent">评 论</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { sendOrReplyComment } from '@/service/api/comment';
import { list, SendOrReplyCommentParam, t } from '@/service/api/comment/types';
import { computed, ref } from 'vue';
import Message from "@/components/message"
import { ConfigType } from '../message/types';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import useInsertComment from "@/hooks/useInsertComment"
const props = defineProps<{
    params: ConfigType
}>()

const emits = defineEmits<{
    (e: "submitComment", content: string): void
    (e: "close"): void
}>()
const commentContent = ref("")
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})
const submitContent = async () => {
    if (!commentContent.value.length) return
    const { useGlobal } = useStore()
    const { cContent } = storeToRefs(useGlobal)
    const { usePlayer } = useStore()
    const { player } = storeToRefs(usePlayer)
    const _: SendOrReplyCommentParam = {
        t: props.params.t as t,
        type: props.params.sType as list,
        content: commentContent.value,
        id: useGlobal.isShowPlayPage ? player.value.currentTrack.id : props.params.queryId!,
    }

    if (props.params.t === 2) {
        _.commentId = props.params.commentId
    }
    try {
        const r = await sendOrReplyComment(_)
        // 关闭弹窗
        emits("close")
        setTimeout(() => {
            Message.success("评论成功")
        }, 15)
        // 更新评论信息 构造一条数据
        const dt = JSON.parse(JSON.stringify(r.comment))
        if (dt.beRepliedUser && props.params.parentContent) {
            dt.beRepliedUser.content = props.params.parentContent
        }
        cContent.value = useInsertComment(dt)

    } catch (error) {
    }

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
        transform: translate(-50%, -65%);
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
