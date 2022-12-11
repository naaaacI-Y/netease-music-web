<template>
    <div class="nav-wrapper d-flex ai-center">
        <div class="right bg-black_12 d-flex ai-center" :class='{ "active": isChangeBgc, "hasLeft": isHasLeft }'>
            <div class="find d-flex" v-if="isActive('/findMusic')">
                <div :class="{ 'active': activeIndex == 0 }" @click="activeIndex = 0">
                    个性推荐
                </div>
                <div :class="{ 'active': activeIndex == 1 }" @click="activeIndex = 1">
                    歌单
                </div>
                <div :class="{ 'active': activeIndex == 2 }" @click="activeIndex = 2">
                    主播电台
                </div>
                <div :class="{ 'active': activeIndex == 3 }" @click="activeIndex = 3">
                    排行榜
                </div>
                <div :class="{ 'active': activeIndex == 4 }" @click="activeIndex = 4">
                    歌手
                </div>
                <div :class="{ 'active': activeIndex == 5 }" @click="activeIndex = 5">
                    最新音乐
                </div>
            </div>
            <div class="personalfm" v-if="isActive('/personalFm')"></div>
            <div class="dayRecommend" v-if="isActive('/songlist')"></div>
            <div class="video" v-if="isActive('/video')">
                视频 / mv
            </div>
            <div class="friends" v-if="isActive('/friends')">
                动态 / 发布动态
            </div>
            <div class="pretty" v-if="isActive('/prettyCommon')">
                精彩评论
            </div>
            <div class="set d-flex">
                <div class="search">
                    <div class="searchIcon">
                        <i class="iconfont icon-sousuo"></i>
                    </div>
                    <input type="text" placeholder="搜索" />
                </div>
                <div class="setting">
                    <i class="iconfont icon-shezhi fs-9"></i>
                </div>
                <div class="info">
                    <i class="iconfont icon-youjian1 fs-9"></i>
                </div>
                <div class="skin">
                    <i class="iconfont icon-icon-pifu fs-9"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
withDefaults(defineProps<{
    isChangeBgc: boolean
}>(), {
    isChangeBgc: false
})
const activeIndex = ref(0)
const route = useRoute()
const router = useRouter()
const isHasLeft = computed(() => {
    const paths = ["/findMusic", "/video", "/friends", "/prettyCommon"]
    return paths.includes(route.path)
})
watch(activeIndex, () => {
    console.log(route.path, "route.pathroute.pathroute.pathroute.pathroute.path");

    if (!route.path.startsWith('/find')) return;
    switch (activeIndex.value) {
        case 0:
            router.push('/findMusic/personalRecommend')
            break;
        case 1:
            router.push('/findMusic/songMenu')
            // findMusic/songList
            break;
        case 2:
            router.push('/findMusic/hostRadio')
            break;
        case 3:
            router.push('/findMusic/rank')
            break;
        case 4:
            router.push('/findMusic/singer')
            break;
        case 5:
            router.push('/findMusic/newestMusic')
            break;
        default:
            break;
    }
})
watch(() => route.path, (newVal: string) => {
    console.log(newVal, "newVal");

    switch (newVal) {
        case "/findMusic/personalRecommend":
            activeIndex.value = 0
            break;
        case "/findMusic/songMenu":
            activeIndex.value = 1
            break;
        case "/findMusic/hostRadio":
            activeIndex.value = 2
            break;
        case "/findMusic/rank":
            activeIndex.value = 3
            break;
        case "/findMusic/singer":
            activeIndex.value = 4
            break;
        case "/findMusic/newestMusic":
            activeIndex.value = 5
            break;
        default:
            break;
    }
})


const isActive = (path: string) => {
    return route.path.startsWith(path)
}
</script>
<style lang="scss" scoped>
.nav-wrapper {
    height: 50px;
    background-color: #f8f8f8;
    width: 100%;

    .right {
        margin-left: 200px;
        // flex: 1;
        padding: 0 18px 0 0;
        width: 100%;
        position: relative;
        @include flex(row, flex-end, center);


        .find {
            @include flex(row, flex-start, center);
            font-size: 14px;
            flex: 1;

            div {
                margin-right: 28px;
                color: #898989;

                &:hover {
                    color: #000;
                    font-weight: bold;
                    cursor: pointer;
                }
            }

            .active {
                color: #000;
                font-weight: bold;
            }
        }

        .set {
            // position: ;
            @include flex(row, center, center);
            color: #585858;

            .search {
                width: 150px;
                height: 27px;
                border-radius: 20px;
                background-color: #ececec;
                @include flex(row, flex-start, center);
                padding-left: 6px;

                input {
                    width: calc(100% - 30px);
                    outline: none;
                    border: none;
                    background-color: #ececec;
                }

                input::placeholder {
                    color: #cbcbcb;
                }
            }

            .setting,
            .skin,
            .info {
                width: 25px;
                height: 25px;
            }

            .setting:hover,
            .skin:hover,
            .info:hover {
                width: 25px;
                height: 25px;
                background-color: #e9e9e9;
                border-radius: 50%;
            }

            >div {
                margin-right: 16px;
                @include flex(row, center, center);
            }

            div:last-child {
                margin-right: 0;
            }
        }
    }

    .hasLeft {
        display: flex;
        justify-content: space-between;
    }
}
</style>
