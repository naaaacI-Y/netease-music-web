<template>
    <div class="rank-wrapper">
        <div class="official">
            <div class="official-title mb-15">
                官方榜
            </div>
            <div class="official-list">
                <div class="official-list-item d-flex mb-25" v-for="(item, index) in rankankList.data.slice(0, 4)"
                    :key="item.id">
                    <RankCard :card-width="172" :rank-item="item" :is-show-right="true"
                        :rank-type="index === 0 ? -1 : 1" class="rank-item-official">
                        <template #updateTime>
                            <div class="update-time text-white fs-2">
                                {{ formatTime(item.updateTime, "MM月dd日") }}更新</div>
                        </template>

                    </RankCard>
                </div>
            </div>
        </div>
        <div class="global">
            <div class="global-title mb-15">
                全球榜
            </div>
            <div class="global-list d-flex flex-wrap">
                <RankCard v-for="(item, index) in rankankList.data.slice(4)" :key="item.id" :card-width="158"
                    @click="goGlobalRank(item.id)" :rank-type="1" :rank-item="item" class="rank-card-item">
                    <template #playCount>
                        <div class="play-count d-flex ai-center fs-1 text-white jc-end ">
                            <i class="iconfont icon-bofang1 text-white fs-7"></i>
                            {{ formatPlayCount(item.playCount) }}
                        </div>
                    </template>
                    <template #songListName>
                        <div class="song-list-name fs-3">{{ item.name }}</div>
                    </template>
                </RankCard>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RankCard from '@/components/RankCard.vue';
import { reactive } from 'vue';
import { getAllRank } from '@/service/api/rank';
import { RankList } from '@/service/api/rank/types';
import { formatPlayCount, formatTime } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter()
const rankankList = reactive({ data: [] as RankList[] })
const goGlobalRank = (id: number) => {
    router.push(`/song-list?id=${id}&rankType=1`)
}
const getRank = async () => {
    const r = await getAllRank()
    rankankList.data = r.list
}
getRank()
</script>
<style lang="scss" scoped>
.rank-wrapper {
    width: 1040px;
    padding-top: 30px;
    margin: auto;
}

.official {
    .official-list {
        .official-list-item {
            .rank-item-official {
                width: 100%;

                .update-time {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, 100%);
                }
            }

            .left {
                width: 172px;
                height: 172px;
                border-radius: 10px;
                position: relative;
            }
        }
    }


}

.global {
    .rank-card-item {
        margin-right: 18px;
    }

    .rank-card-item:nth-child(6n) {
        margin-right: 0;
    }
}

.play-count {
    position: absolute;
    top: 5px;
    right: 5px;
}

.song-list-name {
    width: 158px;
    // @include multiEllipsis;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
