<template>
    <div class="rank-wrapper">
        <div class="official">
            <div class="official-title mb-15">
                官方榜
            </div>
            <div class="official-list">
                <div class="official-list-item d-flex mb-25" v-for="item in 5">
                    <div class="left mr-30"></div>
                    <div class="right">
                        <SongListItem :type="3" :index="item" v-for="item in 5"></SongListItem>
                        <div class="check-all mt-4" @click="checkAll">
                            <span class="fs-2 text-66">查看全部</span>
                            <i class="iconfont icon-xiangyou2 fs-2 text-66"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="global">
            <div class="global-title mb-15">
                全球榜
            </div>
            <div class="global-list d-flex jc-between flex-wrap">
                <RecommendSongListCard :card-width="158" v-for="item in 50">
                </RecommendSongListCard>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import SongListItem from '@/components/song/SongListItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const checkAll = () => {
    router.push("/song-list")
}
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
            .left {
                width: 172px;
                height: 172px;
                border-radius: 10px;
                background-color: aqua;
            }

            .right {
                // flex: 1;
                // height: 300px;
                width: calc(100% - 202px);

                .check-all:hover {
                    cursor: pointer;
                    color: #222;
                }
            }
        }
    }
}
</style>
