<template>
    <div class="song-list-comment-wrapper">
        <div class="comment pt-20">
            <div class="comment-input">
                <textarea id="textArea" rows="4" maxlength="140" v-model="commentContent"
                    placeholder="输入评论或@朋友"></textarea>
            </div>
            <div class="max-length fs-2 text-black_13 pr-10">{{ maxLength - commentContent.length }}</div>
            <div class="bottom-line mt-6 d-flex ai-center jc-between">
                <div class="operate">
                    <i class="iconfont icon-Smile fs-7 mr-9"></i>
                    <i class="iconfont icon-aite1 fs-7 mr-9"></i>
                    <i class="iconfont icon-wangge fs-7"></i>
                </div>
                <div class="submit-comment  fs-4 d-flex ai-center jc-center text-66"
                    :class="maxLength === 140 ? 'hasNoContent' : ''" @click="submitContent">评 论</div>
            </div>
            <div class="top-vote-comment mt-20">
                <div class="comment-label text-black_2 mb-15">精彩评论</div>
                <CommentItem v-for="item in 10"></CommentItem>
            </div>
            <div class="new-comment mt-30">
                <div class="comment-label text-black_2 mb-15">最新评论</div>
                <CommentItem v-for="item in 10"></CommentItem>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>import { computed, ref } from 'vue';
import CommentItem from '../CommentItem.vue';
const maxLength = computed(() => {
    return 140 - commentContent.value.length
})
const commentContent = ref("")
const submitContent = () => {

}
</script>
<style lang="scss" scoped>
.comment {
    position: relative;

    #textArea {
        width: 100%;
        resize: none;
        border: 1px solid #e4e4d4;
        border-radius: 8px;
        padding: 8px 12px;

        &::placeholder {
            color: #d4d4d4;
        }
    }

    .max-length {
        position: absolute;
        top: 75px;
        right: 0px;
    }

    .submit-comment {
        width: 60px;
        height: 30px;
        border-radius: 20px;
        border: 1px solid #e4e4d4;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
