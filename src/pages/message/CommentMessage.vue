<template>
    <div class="message-comment-wrapper">
        <div class="message-comment-content" v-if="commentList.data.length">
            <div class="message-comment-item d-flex mb-20" v-for="item in commentList.data">
                <div class="comment-avatar mr-10">
                    <img :src="formatPicUrl(item.user.avatarUrl, 35, 35)" alt="">
                    <!-- <img :src="formatPicUrl(commentContent?.user?.avatarUrl, 35, 35)" alt="" class="avatar"
                            v-if="commentContent?.user?.avatarUrl">
                        <div class="flag" v-if="commentContent?.user?.avatarDetail">
                            <img :src="formatPicUrl(commentContent?.user?.avatarDetail?.identityIconUrl, 16, 16)" alt="">
                        </div> -->
                </div>
                <div class="comment-right flex-1">
                    <div class="info d-flex ai-center jc-between">
                        <div class="author text-shadow_blue fs-2" @click="goPersonCenter(item.user.userId)">{{
                            item?.user?.nickname }}</div>
                        <div class="time text-99 fs-1">{{ formatTime(item?.time, "yyyy年MM月dd日 hh:mm:ss", true) }}</div>
                    </div>
                    <div class="comment-content fs-2 text-33 mb-10">
                        <span>回复我：</span>
                        <span class="main-info">{{ item?.content }}</span>
                    </div>
                    <div class="origin-comment bg-fa fs-2 text-33">
                        <span>{{ item?.beRepliedContent }}</span>
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
import { getMessageComment } from '@/service/api/message';
import { checkLogin, formatPicUrl, formatTime } from '@/utils';
import useUserProfileStore from "@/store/user"
import { MessageCommentResult } from '@/service/api/message/types';


const useProfile = useUserProfileStore()
const uid = useProfile?.userFile?.profile?.userId
const pages = reactive({ limit: 30, offset: 0 })
const commentList = reactive({ data: [] as MessageCommentResult["comments"] })

// 获取评论列表
const getComment = async () => {

    try {
        const ret = await getMessageComment({ ...pages, uid })
        commentList.data = ret.comments
    } catch (error) {

    }
}

// 跳转个人中心
const goPersonCenter = (id: number) => {

}

checkLogin() && getComment()
</script>

<style lang="scss" scoped>
.message-comment-wrapper {
    padding: 20px 15px 0 15px;

    .message-comment-content {
        .message-comment-item {
            padding-bottom: 30px;

            .info {
                .author:hover {
                    cursor: pointer;
                }
            }

            .comment-avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }

            .origin-comment {
                padding: 10px;
                border-radius: 10px;
            }

            .reply:hover {
                cursor: pointer;
            }

            border-bottom: 1px solid var(--theme-d4);
        }
    }
}
</style>
