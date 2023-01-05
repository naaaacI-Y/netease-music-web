<template>
    <DefaultLayout>
        <div class="day-recommend-wrapper">
            <div class="day-recommend-head">
                <div class="main-info d-flex">
                    <div class="canlender mr-15">
                        <div class="day">{{ day }}</div>
                        <i class="iconfont icon-rili text-primary_red_4"></i>
                    </div>
                    <div class="info-des">
                        <div class="title fs-9 text-33">每日歌曲推荐</div>
                        <div class="time text-66 fs-2">根据你的音乐口味生成， 每天6:00更新</div>
                    </div>
                </div>
                <div class="btns d-flex mt-20">
                    <div class="play-all fs-3 d-flex ai-center mr-10" style="color: white;">
                        <i class="iconfont icon-bofang_o  fs-9"></i>
                        播放全部
                    </div>
                    <div class="collect-count mr-15 fs-3 d-flex ai-center text-33">
                        <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                        <span>收藏全部</span>
                        <!-- <span>已收藏</span> -->
                    </div>
                </div>
            </div>
        </div>
        <SongList></SongList>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongList from '@/components/song/SongList.vue';
import { getDayRecommend } from '@/service/api/music';
import { DailySong } from '@/service/api/music/types';
import { provide, reactive } from 'vue';
const songList = reactive({ data: [] as DailySong[] })
const day = new Date().getDate()
provide("songList", songList)
const getSongList = async () => {
    const r = await getDayRecommend()
    songList.data = r.data.dailySongs
}
getSongList()
</script>
<style lang="scss" scoped>
.day-recommend-wrapper {
    .day-recommend-head {
        padding: 15px 30px;
        border-bottom: 1px solid var(--theme-e5);

        .main-info {
            .info-des {
                padding-top: 10px;

                .title {
                    font-size: 22px;
                    font-weight: bold;
                }
            }

            .canlender {
                position: relative;

                .day {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -20%);
                    color: #d33b31;
                    font-size: 36px;
                    font-weight: bold;
                }

                i {
                    font-size: 100px
                }
            }
        }

        .btns {
            .collect-count {
                padding: 4px 12px;
                border: 1px solid var(--theme-e5);
                border-radius: 18px;
                width: 110px;

                &:hover {
                    background-color: var(--theme-f2);
                    cursor: pointer;
                }
            }

            .play-all {
                width: 105px;
                background-color: rgba($color: #d33b31, $alpha: 0.9);
                padding: 4px 12px;
                border-radius: 18px;
            }
        }
    }
}
</style>
