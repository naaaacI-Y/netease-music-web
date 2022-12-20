<template>
    <div class="song-for-list-wrapper d-flex">
        <div class="song-for-list-left">
            <div class="listenRank d-flex ai-center jc-center" v-if="type !== 'singer'">
                <i class="iconfont icon-mn_paiming_fill text-white"></i>
            </div>
            <div class="listenRank d-flex ai-center jc-center text-white flex-column" v-if="type === 'singer'"
                style="line-height: 0.8;">
                <span style="font-size: 40px;font-weight: bold;">TOP</span>
                <span style="font-size: 60px;font-weight: bold;">50</span>
            </div>
        </div>
        <div class="song-for-list-right flex-1">
            <div class="title-info d-flex mb-10 ai-center">
                <div class="title-name fs-5 mr-30" style="font-weight: bold" v-if="type === 'singer'">热门50首</div>
                <div class="title-name fs-5 mr-30" style="font-weight: bold" v-if="type === 'user'">我的听歌排行</div>
                <div class="title-name fs-5 mr-30" style="font-weight: bold" v-if="type === 'otherUser'">听歌排行</div>
                <div class="operate d-flex ai-center" v-if="isShowPlayAndCollect">
                    <i class="iconfont icon-bofang_o mr-8"></i>
                    <div style="font-size: 12px;color:#ddd;margin-right:10px" v-if="props.type !== 'user'">丨</div>
                    <i class="iconfont icon-xinjianwenjianjia" style="font-size: 20px;"
                        v-if="props.type !== 'user'"></i>
                </div>
            </div>
            <div class="list-wrap flex-1">
                <SongListItem v-for="item in 20" :index="item" :type="2"></SongListItem>
                <div class="check-all d-flex ai-center text-89 jc-end pr-20">
                    <span class="fs-2">查看全部{{ }}首</span>
                    <i class="iconfont icon-jiantou_liebiaoxiangyou_o fs-9"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SongListItem from './song/SongListItem.vue';
const props = defineProps<{
    type: string // user | singer | otherUser
    index?: number
}>()
const isShowPlayAndCollect = computed(() => {
    if (props.type === "singer") return true
    if (props.type !== "singer") {
        // 进入到个人中心 ==> 自己的
        // 听歌排行不展示 其他的只展示一个播放按钮
        if (props.index === 0) return false
        return true

    }
})
</script>
<style lang="scss" scoped>
.song-for-list-wrapper {
    margin-bottom: 45px;

    .song-for-list-left {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        margin-right: 60px;

        .listenRank {
            border-radius: 10px;
            width: 100%;
            height: 100%;
            background-color: #000;

            i {
                font-size: 40px;
            }
        }

    }

    i:nth-child(1) {
        font-size: 24px;
    }

    .song-for-list-right {
        .check-all {
            height: 30px;

            background-color: #fafafa;

            &:hover {
                cursor: pointer;
            }
        }
    }

}
</style>
