<template>
    <div class="head text-99 fs-2 d-flex ai-center" :class="{ isRecentPlayPadding: !isShowOtherInfo }">
        <div class="music-title" :class="{ isRecentPlayTitle: !isShowOtherInfo }">音乐标题</div>
        <div class="music-singer" :class="{ isRecentPlaySinger: !isShowOtherInfo }">歌手</div>
        <div class="music-album" v-if="isShowOtherInfo">专辑</div>
        <div class="music-time" v-if="isShowOtherInfo">时长</div>
        <div class="play-time" v-if="!isShowOtherInfo">播放时间</div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    isShowOtherInfo?: boolean // 标识是否显示专辑以及时长
}>(), {
    isShowOtherInfo: true
})
</script>
<style lang="scss" scoped>
.head {
    height: 35px;
    padding-left: 7.2%;

    .music-title {
        width: 39%;
    }

    .isRecentPlayTitle {
        width: 49.8%;
    }

    .rate {
        width: 8%;
    }

    .music-singer {
        width: 20.7%;
    }

    .isRecentPlaySinger {
        width: 28.7%;
    }

    .music-album {
        width: 25.7%;
    }

    .music-time,
    .play-time {
        width: 9.6%;
    }

}

.isRecentPlayPadding {
    padding-left: 3.8%;
}
</style>
