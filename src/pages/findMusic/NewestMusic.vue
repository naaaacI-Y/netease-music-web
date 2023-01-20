<template>
    <div class="newest-music-wrapper d-flex flex-column">
        <!-- <div class="tab-wrap d-flex jc-center mb-25">
            <div class="tab d-flex fs-1 text-33 jc-between">
                <div class="song flex-1 d-flex jc-center ai-center" @click="tabType = 0"
                    :class="{isTabActive: tabType === 0}">
                    新歌速递</div>
                <div class="disc flex-1 d-flex jc-center ai-center" @click="tabType = 1"
                    :class="{ isTabActive: tabType === 1 }">
                    新碟上架
                </div>
            </div>
        </div> -->
        <div class="filter-wrap d-flex ai-center text-7d mb-8 jc-between">
            <div class="filter d-flex ai-center">
                <div class="filter-item fs-3 mr-30" v-for="(item) in filterList" @click="filterType = Number(item[0])"
                    :class="{ isFilterActive: filterType === Number(item[0]) }" :key="Number(item[0])">
                    {{ item[1]}}
                </div>
            </div>
            <div class="operate d-flex jc-between" v-if="!isShowLoading">
                <div class="play-all fs-1 d-flex ai-center mr-10" style="color:white" @click="playAll">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <!-- <div class="collect fs-1 d-flex ai-center">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                    <span>收藏全部</span>
                </div> -->
            </div>
        </div>
        <div class="song-list-wrap" v-show="!isShowLoading">
            <NewMusicItemInside v-for="(item, index) in musicList.data" :index="Number(index) + 1" :key="index"
                @play-singel-music="playSingle" :is-out-side="false" :music-item="item">
            </NewMusicItemInside>
        </div>
        <Loading v-show="isShowLoading"></Loading>
    </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import NewMusicItemInside from './personalRecommend/components/NewMusicItemInside.vue';
import { getNewMusic } from "@/service/api/music/index"
import { newestMusicType } from "@/utils/const"
import { reactive, ref, watch } from 'vue';
import Message from "@/components/message"
import { NewMusicRet } from '@/service/api/music/types';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const filterList = Object.entries(newestMusicType)
const { playSongList, playSingleMusic, checkMusicCopyright } = useMusicPlayRelation()
const filterType = ref(0)
const isShowLoading = ref(false)
const musicList = reactive<Record<string, NewMusicRet[]>>({ data: [] })
watch(filterType, () => {
    // 重新请求  如果是频繁切换的话 TODO
    getMusic()
})
const getMusic = async () => {
    isShowLoading.value = true
    const r = await getNewMusic({ type: filterType.value })
    musicList.data = r.data
    isShowLoading.value = false
}

/**
 * 播放单曲
 * @param id 歌曲id
 */
const playSingle = (id: number) => {
    const ids = musicList.data.map(item => item.id)
    playSingleMusic(ids, id, filterType.value)
}

/**
 * 播放全部
 * 对应playSourceId,暂时先这么区分
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 */
const playAll = () => {
    // 排除不能播放的
    const ids: number[] = []
    musicList.data.forEach(item => {
        if (checkMusicCopyright(item.fee, item.copyrightId)) {
            ids.push(item.id)
        }
    })
    if (!ids.length) {
        return Message.error("惊不惊喜，一首都不让你听>_<")
    }
    playSongList(JSON.stringify(ids), filterType.value)
}
getMusic()
</script>
<style lang="scss" scoped>
.newest-music-wrapper {
    width: 1040px;
    margin: auto;
    padding-top: 25px;

    // .tab {
    //     width: 230px;
    //     height: 32px;
    //     border-radius: 20px;
    //     border: 1px solid var(--theme-b3);

    //     .song,
    //     .disc {
    //         border-radius: 20px;

    //         &:hover {
    //             cursor: pointer;
    //             background-color: var(--theme-f5);
    //         }
    //     }

    //     .isTabActive {
    //         color: white;
    //         background-color: var(--theme-b3);
    //     }
    // }

    .filter-wrap .filter {
        .isFilterActive {
            color: var(--theme-3a);
        }

        .filter-item:hover {
            cursor: pointer;
        }
    }

    .operate {

        .collect {
            padding: 1px 12px;
            border: 1px solid var(--theme-e5);
            border-radius: 18px;

            &:hover {
                background-color: var(--theme-f2);
                cursor: pointer;
            }
        }

        .play-all {
            background-color: rgba($color: #d33b31, $alpha: 0.9);
            padding: 1px 12px;
            border-radius: 18px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .song-list-wrap {
        // padding: 0 -30px;
        width: calc(100% + 60px);
        position: relative;
        right: 30px;
        margin: auto;
    }
}
</style>
