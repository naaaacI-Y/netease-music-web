<template>
    <div class="nav-wrapper d-flex ai-center" :class='{ "active": isChangeBgc }'>
        <div class="right d-flex ai-center jc-end" :class='{ "hasLeft": isHasLeft }'>
            <div class="find d-flex" v-if="isActive('/findMusic')">
                <div :class="{ 'active': acIdx === 0 }" @click="goInside(0)">个性推荐</div>
                <div :class="{ 'active': acIdx === 1 }" @click="goInside(1)">歌单</div>
                <div :class="{ 'active': acIdx === 3 }" @click="goInside(3)">排行榜</div>
                <div :class="{ 'active': acIdx === 4 }" @click="goInside(4)">歌手</div>
                <div :class="{ 'active': acIdx === 5 }" @click="goInside(5)">最新音乐</div>
            </div>
            <div class="collection d-flex" v-if="isActive('/my-collection')">
                <div :class="{ 'active': acIdx === 6 }" @click="goInside(6)">专辑</div>
                <div :class="{ 'active': acIdx === 7 }" @click="goInside(7)">歌手</div>
                <div :class="{ 'active': acIdx === 8 }" @click="goInside(8)">视频</div>
            </div>
            <div class="personalCenter pl-30 text-33" v-if="isActive('/dynamic')">{{ dynamicName }}动态</div>
            <div class="personalCenter pl-30 text-33" v-if="isActive('/focus')">{{ focusName }}的关注</div>
            <div class="personalCenter pl-30 text-33" v-if="isActive('/fans')">{{ fansName }}的粉丝</div>
            <div class="unique-play pl-30" v-if="isActive('/unique-play')"> 独家放送</div>
            <div class="personalfm" v-if="isActive('/personal-fm')"></div>
            <div class="dayRecommend" v-if="isActive('/songlist')"></div>
            <div class="all-video pl-30 fs-4" v-if="isActive('/video/all-mv')">全部MV</div>
            <div class="video d-flex pl-30 fs-4" v-if="isActive('/video/video-inside', '/video/mv')">
                <div class="video-inside mr-20" :class="{ isVideo: route.path === '/video/video-inside' }"
                    @click="goInside('/video/video-inside')">视频</div>
                <div class="video-mv" :class="{ isVideo: route.path === '/video/mv' }" @click="goInside('/video/mv')">
                    MV
                </div>
            </div>
            <div class="friends" v-if="isActive('/friends')">
                动态 / 发布动态
            </div>
            <div class="hot-comment fs-3 pl-30" v-if="isActive('/hot-comment')">
                精彩评论
            </div>
            <div class="recent-play fs-3 pl-30" v-if="isActive('/recent-play')">
                最近播放
            </div>
            <div class="set d-flex">
                <div class="search mr-15 d-flex ai-center jc-center">
                    <div class="searchIcon">
                        <i class="iconfont icon-sousuo "></i>
                    </div>
                    <input type="text" placeholder="搜索" v-model="searchKeyWords" id="search-box" />
                </div>
                <!--消息通知-->
                <div class="skin d-flex ai-center jc-center mr-15">
                    <i class="iconfont icon-youjian1 fs-9" :class="{ isSkinActive: isShowNotification }" id="skin-icon"></i>
                </div>
                <!--皮肤-->
                <div class="skin d-flex ai-center jc-center" @click="showSetTheme">
                    <i class="iconfont icon-icon-pifu fs-9" :class="{ isSkinActive: isShowSetTheme }"></i>
                </div>

                <div class="set-theme-box fs-1 d-flex jc-around ai-center" v-if="isShowSetTheme"
                    :class="{ isShowShadow: theme !== 'dark' }">
                    <div class="white-box" @click="setTheme('white')">
                        <div class="circle white" :class="{ isWhite: theme !== 'dark' }">
                            <i class="iconfont icon-gou- fs-7" style="color:#c3473a" v-if="theme == 'white'"></i>
                        </div>
                        <div>浅色</div>
                    </div>
                    <div class="red-box" @click="setTheme('red')">
                        <div class="circle red">
                            <i class="iconfont icon-gou- fs-7" style="color:white " v-if="theme === 'red'"></i>
                        </div>
                        <div>红色</div>
                    </div>
                    <div class="dark-box" @click="setTheme('dark')">
                        <div class="circle dark">
                            <i class="iconfont icon-gou- fs-7" style="color:white " v-if="theme === 'dark'"></i>
                        </div>
                        <div>深色</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { debounce } from "@/utils"
import { storeToRefs } from 'pinia';
import useThemeStore from '@/store/theme';
import { changeTheme } from '@/config/theme';
import { firstPagePath, paths } from '@/utils/const';

const props = withDefaults(defineProps<{
    isChangeBgc: boolean
    isShowNotification: boolean
}>(), {
    isChangeBgc: false
})
const emits = defineEmits<{
    (e: "handleKeyWordsChange", keywords: string): void
}>()

const route = useRoute()
const router = useRouter()
const { dynamicName, focusName, fansName } = route.query  // 动态 关注  粉丝
const searchKeyWords = ref("") // 搜索关键字
const isShowSetTheme = ref(false) // 是否显示主题设置弹窗
const { theme } = storeToRefs(useThemeStore())

const isHasLeft = computed(() => { // 头部flex横向布局相关
    if (route.path.startsWith("/video-detail") || route.path.startsWith("/mv-detail")) return false
    return paths.some(item => route.path.startsWith(item))
})
watch(() => searchKeyWords.value, () => {
    debounceTextChange()
})

const acIdx = computed(() => {
    return firstPagePath.findIndex(item => item === route.path)
})

// 输入框值改变 触发搜索
const handleKeyWordsChange = () => {
    emits("handleKeyWordsChange", searchKeyWords.value)
}
// 显示/隐藏主题设置弹窗
const showSetTheme = () => {
    isShowSetTheme.value = !isShowSetTheme.value
}

// 主题设置显示/隐藏
const setTheme = (theme: string) => {
    changeTheme(theme)
    isShowSetTheme.value = false
}


const debounceTextChange = debounce(handleKeyWordsChange, 200)

const isActive = (path1: string, path2?: string) => {
    if (props.isChangeBgc) return false
    if (path2) {
        return route.path.startsWith(path1) || route.path.startsWith(path2)
    }
    return route.path.startsWith(path1)

}


const goInside = (path: string | number) => {
    if (typeof path === "number" && route.path !== firstPagePath[path]) {
        return router.push(firstPagePath[path])
    }
    if (typeof path === "string" && route.path !== path) {
        router.push(path)
    }
}


</script>
<style lang="scss" scoped>
.nav-wrapper {
    height: 50px;
    background-color: var(--theme-head-f6); // red: ca5b4f
    width: 100%;

    .video {
        color: var(--theme-head-89);

        &:hover {
            color: var(--theme-head-00);
        }
    }

    .hot-comment,
    .recent-play {
        font-weight: bold;
        color: var(--theme-head-00);
    }

    .right {
        margin-left: 200px;
        // flex: 1;
        padding: 0 18px 0 0;
        width: 100%;
        position: relative;
        // @include flex(row, flex-end, center);


        .find,
        .collection {
            @include flex(row, flex-start, center);
            font-size: 14px;
            flex: 1;

            div {
                margin-right: 28px;
                color: var(--theme-head-89);

                &:hover {
                    color: var(--theme-head-00);
                    font-weight: bold;
                    cursor: pointer;
                }
            }

            .active {
                color: var(--theme-head-00);
                font-weight: bold;
            }
        }

        .isVideo {
            color: var(--theme-head-00)
        }

        .video-inside,
        .video-mv {
            &:hover {
                cursor: pointer;
            }
        }

        .all-video {
            color: var(--theme-head-00)
        }

        .set {
            // position: ;
            @include flex(row, center, center);
            color: #585858;
            position: relative;

            .search {
                width: 150px;
                height: 27px;
                border-radius: 20px;
                background-color: var(--theme-head-ec);
                @include flex(row, flex-start, center);
                padding-left: 6px;

                input {
                    width: calc(100% - 30px);
                    outline: none;
                    border: none;
                    color: var(--theme-head-4c);
                    background-color: var(--theme-head-ec);
                }

                input::placeholder {
                    color: var(--theme-head-cb);
                }

                .searchIcon i {
                    color: var(--theme-7a); // 000000 7a7a7a efceca
                }
            }

            .setting,
            .skin,
            .info {
                width: 25px;
                height: 25px;

                i {
                    color: var(--theme-4a); // 4a 7f ecc5c1
                }
            }

            .isSkinActive {
                // :style="{ color: isShowSetTheme ? '#c3473a' : '' }"
                color: var(--theme-c3473a) !important;
            }

            .setting:hover,
            .skin:hover,
            .info:hover {
                width: 25px;
                height: 25px;
                background-color: var(--theme-head-ea);
                border-radius: 50%;
            }

            .set-theme-box {
                position: absolute;
                width: 185px;
                height: 85px;
                border-radius: 5px;
                background-color: var(--theme-settheme);
                top: 40px;
                right: -5px;
                z-index: 10;

                .circle {
                    width: 25px;
                    height: 25px;
                    border-radius: 50px;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .white {
                    background-color: white;
                }

                .red {
                    background-color: #c3473a;
                }

                .dark {
                    background-color: #000;
                }

                .isWhite {
                    background-color: #f6f6f6;
                }

                &::after {
                    display: block;
                    content: "";
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid var(--theme-head-36);
                    top: -10px;
                    right: 10px;
                }
            }

            .isShowShadow {
                box-shadow: 0px -5px 5px -5px #ccc, -5px 0 5px -5px #ccc, 5px 5px 5px -5px #ccc;
            }
        }
    }

    .hasLeft {
        display: flex;
        justify-content: space-between;
    }
}

.active {

    .right {
        justify-content: flex-end;
        // background-color: white !important;
    }
}
</style>
