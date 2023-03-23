<template>
    <div class="message-comment-wrapper">
        <div class="message-comment-content">
            <div class="message-comment-item d-flex mb-20" v-for="item in commentList.data">
                <div class="comment-avatar mr-10">
                    <!-- <img :src="formatPicUrl(commentContent?.user?.avatarUrl, 35, 35)" alt="" class="avatar"
                            v-if="commentContent?.user?.avatarUrl">
                        <div class="flag" v-if="commentContent?.user?.avatarDetail">
                            <img :src="formatPicUrl(commentContent?.user?.avatarDetail?.identityIconUrl, 16, 16)" alt="">
                        </div> -->
                </div>
                <div class="comment-right flex-1">
                    <div class="info d-flex ai-center jc-between">
                        <div class="author text-shadow_blue fs-2">作者</div>
                        <div class="time text-99 fs-1">2023年10月20日</div>
                    </div>
                    <div class="comment-content fs-2 text-33 mb-10">
                        <span>回复我：</span>
                        <span class="main-info">回复的内容回复的内容回复的内容</span>
                    </div>
                    <div class="origin-comment bg-fa fs-2 text-33">
                        <span>我的评论：</span>
                        <span>我的评论回复的内容回复的内容回复的内容</span>
                    </div>
                    <div class="reply mt-30 d-flex jc-end fs-2 text-99 ai-center">
                        <i class="iconfont icon-liuyan-duandian fs-5"></i>
                        <span class="ml-5">回复</span>
                    </div>
                </div>

            </div>
        </div>
        <div class="no-data fs-1 text-66 d-flex jc-center mt-30" v-if="!commentList.data.length">暂无评论内容</div>
    </div>
</template>

<script lang="ts" setup>
const commentList = reactive({ data: [1, 2, 3, 4, 5, 6, 7, 8, 8.9, 10] })
</script>

<style lang="scss" scoped>
.message-comment-wrapper {
    padding: 20px 15px 0 15px;

    .message-comment-content {
        .message-comment-item {
            padding-bottom: 30px;

            .comment-avatar {
                width: 35px;
                height: 35px;
                background-color: red;
                border-radius: 50%;
            }

            .origin-comment {
                padding: 10px;
                border-radius: 10px;
            }

            border-bottom: 1px solid var(--theme-d4);
        }
    }
}
</style>
