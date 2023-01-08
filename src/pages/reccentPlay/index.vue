<template>
    <DefaultLayout>
        <div class="recent-play-wrapper">
            <div class="total mb-20 fs-2 text-66">共{{ total }}首</div>
            <div class="operate d-flex jc-between ai-center mb-20">
                <div class="play-all fs-3 d-flex ai-center mr-10" style="color: white;">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="clear-list fs-4 text-deep_blue" @click="clearList">清空列表</div>
            </div>
            <div class="list-wrap">
                <Header :is-show-other-info="false"></Header>
                <div class="play-item d-flex ai-center fs-2" v-for="(item, index) in playList.data"
                    :key="item.resourceId" :class="{ odd: index % 2 === 0 }">
                    <div class="index fs-1 text-66">{{ paddingLeft(index+ 1) }}</div>
                    <div class="title text-33">{{ item.data?.name }}</div>
                    <div class="singer">{{ item.data?.ar[0]?.name }}</div>
                    <div class="time">{{ calcTime(item.playTime) }}</div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import Header from '@/components/header/Header.vue';
import { calcTime, paddingLeft } from '@/utils';

import { getRecentPlay } from "@/service/api/music";
import { recentPlayList } from "@/service/api/music/types"
import { reactive, ref } from 'vue';

const playList = reactive({ data: [] as recentPlayList[] })
const total = ref(0)
// 清空最近播放列表
const clearList = () => {

}
const getPlayList = async () => {
    const r = await getRecentPlay()
    playList.data = r.data.list
    total.value = r.data.total
}
getPlayList()
</script>
<style lang="scss" scoped>
.recent-play-wrapper {
    padding: 18px 30px;

    .play-all {
        background-color: rgba($color: #d33b31, $alpha: 0.9);
        padding: 4px 12px;
        border-radius: 18px;
    }

    .list-wrap {
        margin: 0 -30px;
        border-top: 1px solid var(--theme-f2);

        .play-item {
            height: 35px;

            .index {
                width: 3.8%;
                padding-left: 30px;
                // width: ;
            }

            .title {
                width: 48.2%;
            }

            .singer {
                width: 27.7%;
            }

            .time {
                width: 9.6%;
            }

            &:hover {
                background-color: var(--theme-f2);
            }
        }


        .odd {
            background-color: var(--theme-fa);
        }


    }
}
</style>
