<template>
    <div class="newest-music-wrapper d-flex flex-column">
        <div class="tab-wrap d-flex jc-center mb-25">
            <div class="tab d-flex fs-1 text-black_3 jc-between">
                <div class="song flex-1 d-flex jc-center ai-center" @click="tabType = 0"
                    :style="{ backgroundColor: `${tabType === 0 ? '#b3b3b3' : ''}`, color: `${tabType === 0 ? 'white' : ''}` }">
                    新歌速递</div>
                <div class="disc flex-1 d-flex jc-center ai-center" @click="tabType = 1"
                    :style="{ backgroundColor: `${tabType === 1 ? '#b3b3b3' : ''}`, color: `${tabType === 1 ? 'white' : ''}` }">
                    新碟上架
                </div>
            </div>
        </div>
        <div class="filter-wrap d-flex ai-center text-black_4 mb-8 jc-between">
            <div class="filter d-flex ai-center">
                <div class="filter-item fs-3 mr-30" v-for="(item) in filterList" @click="filterType = Number(item[0])"
                    :style="{ color: `${filterType === Number(item[0]) ? '#000' : ''}` }" :key="Number(item[0])">{{
                            item[1]
                    }}</div>
            </div>
            <div class="operate d-flex jc-between">
                <div class="play-all fs-1 d-flex ai-center text-white mr-10">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect fs-1 d-flex ai-center">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                    <span>收藏全部</span>
                </div>
            </div>
        </div>
        <div class="song-list-wrap">
            <NewMusicItemInside v-for="(item, index) in musicList.data" :index="Number(index) + 1" :key="index"
                :is-out-side="false" :music-item="item">
            </NewMusicItemInside>
        </div>
    </div>
</template>

<script lang="ts" setup>
import NewMusicItemInside from './personalRecommend/components/NewMusicItemInside.vue';
import { getNewMusic } from "@/service/api/music/index"
import { newestMusicType } from "@/utils/const"
import { reactive, ref, watch } from 'vue';
import { NewMusicParam, NewMusicRet } from '@/service/api/music/type';
const filterList = Object.entries(newestMusicType)
const tabType = ref(0)
const filterType = ref(0)
const musicList = reactive<Record<string, NewMusicRet[]>>({ data: [] })
watch(filterType, () => {
    // 重新请求 TODO
})
const getMusic = async () => {
    const r = await getNewMusic({ type: filterType.value })
    musicList.data = r.data
}
getMusic()
</script>
<style lang="scss" scoped>
.newest-music-wrapper {
    width: 1040px;
    margin: auto;
    padding-top: 25px;

    .tab {
        width: 230px;
        height: 32px;
        border-radius: 20px;
        border: 1px solid #ccc;

        .song,
        .disc {
            border-radius: 20px;

            &:hover {
                cursor: pointer;
                background-color: #f5f5f5;
            }
        }
    }

    .filter-wrap .filter .filter-item:hover {
        cursor: pointer;
    }

    .operate {

        .collect {
            padding: 1px 12px;
            border: 1px solid #e5e5e5;
            border-radius: 18px;

            &:hover {
                background-color: #f2f2f2;
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
