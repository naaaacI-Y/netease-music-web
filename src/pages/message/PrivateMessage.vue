<template>
    <div class="private-wrapper">
        <div class="private-content" v-if="privateInfoLIst.data.length">
            <div class="private-item d-flex ai-center" v-for="item in privateInfoLIst.data">
                <div class="private-img mr-5">
                    <img :src="formatPicUrl(item.fromUser.avatarUrl, 35, 35)" alt="">
                </div>
                <div class="private-content d-flex flex-column jc-center flex-1">
                    <div class="line1 d-flex jc-between">
                        <div class="author fs-2 text-deep_blue">{{ item.fromUser.nickname }}</div>
                        <div class="timne fs-1 text-66">{{ formatTime(item.lastMsgTime, "yyyy年MM月dd日 hh:mm:ss", true) }}
                        </div>
                    </div>
                    <div class="summary text-33 fs-2">
                        <span v-if="formatPrivateMsg(item.lastMsg)[0]">{{ formatPrivateMsg(item.lastMsg)[0] }}:</span>
                        <span>{{ formatPrivateMsg(item.lastMsg)[1] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-data fs-1 text-66 d-flex jc-center mt-30" v-if="!privateInfoLIst.data.length">暂无私信内容</div>
    </div>
</template>

<script lang="ts" setup>
import { getMessagePrivateInfo } from '@/service/api/message';
import { checkLogin, formatPicUrl, formatTime } from '@/utils';
import { PrivateResult } from "@/service/api/message/types"

const pages = reactive({ limit: 30, offset: 0 })
const privateInfoLIst = reactive({ data: [] as PrivateResult["msgs"] })

/**
 * 格式化私信内容，如果有text则需要添加「text」
 * @param lastMsg
 */
const formatPrivateMsg = (lastMsg: any) => {
    if (lastMsg.promotionUrl) {
        return [`${lastMsg.promotionUrl.text}`, `「${lastMsg.msg}」`]
    }
    return ["", lastMsg.msg]
}

// 获取私信列表
const getPrivateInfo = async () => {
    try {
        const ret = await getMessagePrivateInfo(pages)
        privateInfoLIst.data = ret.msgs.map(item => {
            item.lastMsg = JSON.parse(item.lastMsg)
            return item
        })

    } catch (error) {

    }
}

checkLogin() && getPrivateInfo()
</script>
<style lang="scss" scoped>
.private-wrapper {
    .private-item {
        height: 60px;
        padding: 0 20px;

        .private-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &:hover {
            cursor: pointer;
            background-color: var(--theme-fa);
        }

        .private-content {
            height: 100%;
            border-bottom: 1px solid var(--theme-d4);

            .summary {
                width: 270px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>
