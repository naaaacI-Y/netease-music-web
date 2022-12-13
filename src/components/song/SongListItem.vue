<template>
    <div class="song-list-item-wrapper d-flex" :class="{ odd: index % 2 !== 0 }">
        <div class="left d-flex ai-center fs-2 jc-event" v-if="type !== 3">
            <div class="index text-c4">{{ paddingLeft(index) }}</div>
            <i class="iconfont icon-aixin text-black_13"></i>
            <i class="iconfont icon-xiazai text-black_13"></i>
        </div>
        <div class="rank d-flex ai-center" v-if="type === 3">
            <div class="index">{{ index }}</div>
            <div class="flag">-</div>
        </div>
        <div class="main-info fs-2 d-flex ">
            <div class="song-name">
                <span class="text-black_3">歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名</span>
                <span class="text-black_13">(别名)</span>
            </div>
            <div class="singer  text-black_13" v-if="isShow === 'all' || isShow === 'rank'">
                歌手名称歌手名称歌手名称歌手名称歌手名称歌手名称
            </div>
            <div class="album  text-black_13" v-if="isShow === 'all'">
                专辑名称
            </div>
            <div class="time text-c4 d-flex ai-center" v-if="isShow === 'all' || isShow === 'singer'">03:01</div>
            <div class="count" v-if="isShow === 'listen'">7次</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 歌单页

// 我的听歌排行
// 歌手页
// 排行榜
import { computed } from 'vue';


const props = withDefaults(defineProps<
    {
        type?: number
        index: number
    }>(), {
    type: 2,
})
const paddingLeft = (num: number) => {
    if (num < 10) return `0${num}`
    return num
}
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
</script>
<style lang="scss" scoped>
.song-list-item-wrapper {
    height: 35px;
    width: 100%;

    .left {
        width: 7.2%;
        justify-content: space-evenly;

        i:hover {
            color: #565656;
            cursor: pointer;
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
        }

        .singer,
        .album {

            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
                cursor: pointer;
                color: #565656;
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
        background-color: #f2f2f3;
    }
}

.odd {
    background-color: #fafafa;
}
</style>
