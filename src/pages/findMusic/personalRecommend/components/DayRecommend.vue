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
                    <div class="play-all fs-3 d-flex ai-center mr-10" style="color: white;" @click="playAll">
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
        <SongList :is-show-loading="showLoading"></SongList>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import SongList from '@/components/song/SongList.vue';
import { getDayRecommend } from '@/service/api/music';
import { DailySong, TrackId } from '@/service/api/music/types';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
import Message from "@/components/message"
const { checkMusicCopyright, playSongList } = useMusicPlayRelation()
const songList = reactive({ data: [] as DailySong[] })
const songListInfo = reactive({ data: [] as TrackId[] | number[] })
const day = new Date().getDate()
const showLoading = ref(true)
provide("songList", songList)
provide("songListInfo", songListInfo)
// 获取歌单列表
const getSongList = async () => {
    const r = await getDayRecommend()
    songList.data = r.data.dailySongs
    songListInfo.data = r.data.dailySongs.map(item => item.id)

    showLoading.value = false
}
// 播放全部  需要过滤列表
const playAll = () => {
    // 资源id？？？？？
    const ids: number[] = []
    songList.data.forEach(item => {
        if (checkMusicCopyright(item.fee, !item.noCopyrightRcmd)) {
            ids.push(item.id)
        }
    })
    if (!ids.length) {
        return Message.error("惊不惊喜，一首都不让你听>_<")
    }
    playSongList(JSON.stringify(ids), 100)
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

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
