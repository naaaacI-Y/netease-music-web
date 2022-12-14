<template>
    <div class="song-for-list-wrapper d-flex">
        <div class="song-for-list-left">

        </div>
        <div class="song-for-list-right flex-1">
            <div class="title-info d-flex mb-10 ai-center">
                <div class="title-name fs-5 mr-30" style="font-weight: bold">热门50首</div>
                <div class="operate d-flex ai-center">
                    <i class="iconfont icon-bofang_o mr-8"></i>
                    <div style="font-size: 12px;color:#ddd;margin-right:10px">丨</div>
                    <i class="iconfont icon-xinjianwenjianjia" style="font-size: 20px;"></i>
                </div>
            </div>
            <div class="list-wrap flex-1">
                <SongListItem v-for="item in 20" :index="item" :type="2"></SongListItem>
                <div class="check-all d-flex ai-center text-89 jc-end pr-20">
                    <span class="fs-2">查看全部</span>
                    <i class="iconfont icon-jiantou_liebiaoxiangyou_o fs-9"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SongListItem from './song/SongListItem.vue';
</script>
<style lang="scss" scoped>
.song-for-list-wrapper {
    margin-bottom: 45px;

    .song-for-list-left {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        margin-right: 60px;
        background-color: aquamarine;


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
