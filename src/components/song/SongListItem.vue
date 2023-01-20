<template>
    <div class="song-list-item-wrapper d-flex flex-column" :class="{ odd: index % 2 !== 0 }"
        v-on:dblclick.stop="playMusic">
        <div class="item-wrap d-flex" style="height:35px">

            <!--左侧喜欢相关-->
            <div class="left d-flex ai-center fs-2 jc-event" v-if="type !== 3">
                <div class="index" v-show="isPlaying">
                    <i class="iconfont icon-yinlianglabashengyin" style="color: #c3473a"></i>
                </div>
                <div class="index text-c4" v-show="!isPlaying">{{ paddingLeft(index) }}</div>
                <slot name="flagInside" v-if="rankType === 1"></slot>
                <i class="iconfont icon-aixin text-99" @click="likeMusic(item?.id!, true)"
                    v-show="!isLikeMusic(item?.id!)"></i>
                <i class="iconfont icon-aixin_shixin text-primary_red_4"
                    @click="likeMusic(item?.id!, false, updateSongListHeadeInfo)" v-show="isLikeMusic(item?.id!)"></i>
                <i class="iconfont icon-xiazai text-99"></i>
            </div>

            <!--歌曲标识 上升下架等信息-->
            <div class="rank d-flex ai-center mr-5 pl-8" v-if="type === 3">
                <div class="index fs-4 mr-8" :class="{ isTop3: index <= 3 }">{{ index }}</div>
                <slot name="flag"></slot>
            </div>

            <!--主要信息-->
            <div class="main-info fs-2 d-flex ">
                <div class="song-name d-flex ai-center" :style="{ width: rankType === -1 ? '34.8%' : '42.8%' }">
                    <div class="text-33 mr-4" v-if="!colorful"
                        :class="[isPlaying ? 'isPlaying' : '', isHaveCopyRight ? '' : 'isNeddCopyRight']">{{
                            item?.name
                        }}
                    </div>
                    <div class="text-33 mr-4" v-if="colorful"
                        :class="[isPlaying ? 'isPlaying' : '', isHaveCopyRight ? '' : 'isNeddCopyRight']"
                        v-html="keywordsColorful(item.name, keywords)">
                    </div>
                    <div class="text-99 mr-4" v-if="item?.alia?.length">({{ item?.alia[0] }})</div>
                    <!-- <i class="iconfont icon-h-square text-primary_red_4 fs-2" v-if="item?.sq && type !== 3"></i> -->
                    <div class="sq d-flex ai-center" v-if="item?.sq && type !== 3">
                        <span>SQ</span>
                    </div>
                    <i class="iconfont icon-bofang2 text-primary_red_4 ml-4 fs-7" v-if="item.mv && type !== 3"
                        @click="goMvDetail"></i>
                </div>
                <!--飙升率-->
                <slot name="rate"></slot>
                <div class="singer  text-99" v-if="(isShow === 'all' || isShow === 'rank') && !colorful"
                    @click="goSingerPage">
                    {{ item.ar[0]?.name }}
                </div>
                <div class="singer  text-99" v-if="(isShow === 'all' || isShow === 'rank') && colorful"
                    @click="goSingerPage" v-html="keywordsColorful(item.ar[0]?.name, keywords)">
                </div>
                <div class="album  text-99" v-if="isShow === 'all' && !colorful" @click="goAlbumPage">
                    {{ item.al.name }}
                </div>
                <div class="album  text-99" v-if="isShow === 'all' && colorful" @click="goAlbumPage"
                    v-html="keywordsColorful(item.al.name, keywords)">
                </div>
                <div class="time text-c4 d-flex ai-center" v-if="isShow === 'all' || isShow === 'singer'">{{
                    formatSongTime(item!.dt)
                }}</div>
                <!-- <div class="count text-c4 d-flex ai-cente" v-if="isShow === 'listen'">7次</div> -->
            </div>
        </div>
        <slot name="lyric"></slot>
        <slot name="song"></slot>
    </div>
</template>

<script lang="ts" setup>
// 歌单页
// 我的听歌排行
// 歌手页
// 排行榜
import { TrackId } from '@/service/api/music/types';
import { HotSong } from '@/service/api/singer/types';
import { formatSongTime, paddingLeft, keywordsColorful } from '@/utils';
import { computed, inject, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Message from "@/components/message"
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
const injectSongListInfo = inject<{ data: TrackId[] }>("songListInfo")
const route = useRoute()
const router = useRouter()
const rankType = Number(route.query.rankType)
const { createdSongList, likeMusic, player, messageTip, checkMusicCopyright, isLikeMusic, playSingleMusic, isHaveCopyRight } = useMusicPlayRelation()



const props = withDefaults(defineProps<
    {
        type?: number
        index: number
        item: HotSong
        info?: TrackId
        isLiked?: boolean
        colorful?: boolean // 歌词高亮
    }>(), {
    type: 2,
    isLiked: false,
    colorful: false
})
const emits = defineEmits<{
    (e: "updateLikedList"): void
    (e: "updateSongListInfo"): void
    (e: "updateSongListHeaderInfo"): void
}>()
const keywords = computed(() => {
    return route.params.keywords as string
})
const isShow = computed(() => {
    switch (props.type) {
        case 0:
            return "all" // 显示所有
        case 1:
            return "listen" // 显示收听次数
        case 2:
            return "singer" // 显示时间
        case 3:
            return "rank" // 显示歌手
        default:
            break;
    }
})
const isPlaying = computed(() => {
    return !player.value.isPersonalFM && player.value.currentTrack.id === props.item?.id
})


// 更新歌单头部信息
// 如果是自己喜欢歌曲的界面 取消喜欢之后直接删除列表中的某一项
const updateSongListHeadeInfo = () => {
    // 是否是自己喜欢歌单界面
    const idx = createdSongList.value.findIndex(item => item.id == Number(route.params.id))
    if (idx !== -1) {
        emits("updateSongListHeaderInfo")

    }
}

// 前往歌手页
const goSingerPage = () => {
    router.push(`/singer-home/${props.item?.ar[0].id}`)
}
// 前往专辑页面
const goAlbumPage = () => {
    // 如果在当前专辑也就不用跳转
    if (Number(route.query.id) === props.item?.id) return
    router.push(`/album/${props.item?.al.id}`)
}
// mv详情
const goMvDetail = () => {
    router.push(`/mv-detail/${props.item?.mv}`)
}
// 列表歌曲播放
const playMusic = async () => {
    const isShowTip = messageTip()
    if (isShowTip) return
    // 在外层过滤
    const trackIds = injectSongListInfo?.data.map(item => item.id) || []

    const sourceId = Number(route.params?.id) || (!props.colorful ? 100 : -1) // 每日歌曲推荐没有资源id 写死100目前  900是搜索界面的播放
    // 如果是搜索界面的话 trackids传空 不新开playlist 在原有基础上添加该首歌曲
    playSingleMusic(props.colorful ? [] : trackIds!, props.item!.id, sourceId)
}
checkMusicCopyright(props.item.fee, !props.item.noCopyrightRcmd)
</script>
<style lang="scss" scoped>
.song-list-item-wrapper {
    // height: 35px;
    width: 100%;

    .left {
        width: 7.2%;
        justify-content: space-evenly;

        .index {
            width: 20px;
        }

        i:hover {
            color: var(--theme-56);
            cursor: pointer;
        }
    }

    .rank {
        .index {
            color: #999;
            width: 10px;
        }

        .isTop3 {
            color: #ff3133;
        }
    }

    .main-info {
        width: 92.8%;

        .song-name {
            width: 42.8%;
            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .sq {
                @include SQ;
            }

            .icon-bofang2:hover {
                cursor: pointer;
            }
        }

        .isPlaying {
            color: #c3473a;
        }

        .isNeddCopyRight {
            color: var(--theme-d4);
        }

        .singer,
        .album {

            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
                cursor: pointer;
                color: var(--theme-56); // dark: #b7b7b7b
            }
        }

        .singer {
            width: 20.7%;
        }

        .album {
            width: 25.7%;
        }

        .time {
            width: 9.6%;
        }
    }

    &:hover {
        background-color: var(--theme-f2); // dark: #323232
    }
}

.odd {
    background-color: var(--theme-fa); // dark: #292929
}
</style>
