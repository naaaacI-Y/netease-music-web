<template>
    <div class="search-result-box-wrapper" id="search-result-box-wrapper" :class="{ isShowBoxShadow: theme !== 'dark' }">
        <!--搜索头部-->
        <div class="result-title fs-1 mb-10 d-flex ai-center text-33" v-if="searchKeywords"
            @click="goSearchResult(searchKeywords)">
            搜“<span class="text-deep_blue">{{ searchKeywords }}</span>”相关结果 >
        </div>
        <!--搜索历史-->
        <div class="search-history" v-if="searchHistoryList && !searchKeywords">
            <div class="history-title d-flex ai-center text-66 mb-10">
                <span class="fs-4">搜索历史</span>
                <i class="iconfont icon-delete fs-8 ml-6" @click="clearHistory"></i>
            </div>
            <div class="search-his-wrap d-flex ai-center flex-wrap">
                <div class="search-item fs-2 text-4b mr-10 mb-10" v-for="item in Object.keys(searchHistoryList)"
                    @click="goSearchResult(item)">{{
                        item
                    }}</div>
            </div>
        </div>
        <!---搜索结果-->
        <div class="search-result" v-if="searchKeywords">
            <!--搜索单曲-->
            <div class="song mb-10" v-if="searchResult?.data?.songs?.length">
                <div class="label-title ">
                    <i class="iconfont icon-yinle mr-5 text-66"></i>
                    <span>单曲</span>
                </div>
                <div class="song-content">
                    <div class="item d-flex ai-center text-33" v-for="item in searchResult?.data?.songs" :key="item.id">
                        {{ item?.name }}&ensp;-&ensp;{{ item.artists[0]?.name }}
                    </div>
                </div>
            </div>
            <!--搜索歌手-->
            <div class="singer mb-10" v-if="searchResult?.data?.artists?.length">
                <div class="label-title">
                    <i class="iconfont icon-iconfontyonghuming mr-5"></i>
                    <span>歌手</span>
                </div>
                <div class="singer-content">
                    <div class="item text-33" v-for="item in searchResult?.data?.artists" :key="item.id">{{ item.name }}
                    </div>
                </div>
            </div>
            <!--搜索专辑-->
            <div class="album mb-10" v-if="searchResult?.data?.albums?.length">
                <div class="label-title">
                    <i class="iconfont icon-yinle1 mr-5"></i>
                    <span>专辑</span>
                </div>
                <div class="album-content">
                    <div class="item text-33" v-for="item in searchResult?.data?.albums" :key="item.id">
                        <span>{{ item?.name }}</span>
                        <span>&ensp;-&ensp;</span>
                        <span>{{ item?.artist?.name }}</span>
                    </div>
                </div>
            </div>
            <!--搜索歌单-->
            <div class="song-list" v-if="searchResult?.data?.playlists?.length">
                <div class="label-title">
                    <i class="iconfont icon-gedan mr-5"></i>
                    <span>歌单</span>
                </div>
                <div class="song-list-content">
                    <div class="item text-33" v-for="item in searchResult?.data?.playlists" :key="item.id"> {{
                        item.name
                    }}
                    </div>
                </div>
            </div>
        </div>
        <!--热搜列表-->
        <div class="search-hot" v-show="!searchKeywords">
            <div class="hot-title fs-3 text-66 mb-10">热搜榜</div>
            <div class="hot-item d-flex ai-center" v-for="(item, index) in hotSearchList.data" :key="item.searchWord"
                @click="goHotItemDetail(item.searchWord)">
                <div class="index mr-20 text-cf" :class="{ isTop: index <= 2 }">{{ index + 1 }}</div>
                <div class="main-info">
                    <div class="search-word fs-1 d-flex ai-center">
                        <span class="text-33" :class="{ isTop: index <= 2 }">{{ item.searchWord }}</span>
                        <div class="icon ml-5" v-if="item.iconUrl">
                            <img :src="item.iconUrl" alt="">
                        </div>
                        <div class="score text-c4 ml-10">{{ item.score }}</div>
                    </div>
                    <div class="content fs-1 mt-5 text-66" v-if="item.content">{{ item.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getHotSearchList, searchSuggest } from '@/service/api/search';
import { HotSearchListRet, SearchSuggestRet } from '@/service/api/search/types';
import useThemeState from '@/store/theme';
import { getSearchHistory, setSearchHistory, clearSearchHistory } from '@/utils';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
const props = defineProps<{
    searchKeywords: string
}>()
const emits = defineEmits<{
    (e: "hideSearchBox"): void
}>()
const { theme } = storeToRefs(useThemeState())
// 监听输入框值改变
watch(() => props.searchKeywords, async (newVal: string) => {
    if (newVal) {
        // 搜索
        getSuggest(newVal)
        // 添加历史搜索记录
        setSearchHistory(props.searchKeywords)
    } else {
        getHotSearch()
    }

})
const hotSearchList = reactive({ data: [] as HotSearchListRet[] }) // 热搜列表
const searchResult = reactive({ data: {} as SearchSuggestRet }) // 搜索结果
const searchHistoryList = ref(getSearchHistory())  // 历史搜索记录
const goHotItemDetail = (keywords: string) => {

}
// 清空搜索历史
const clearHistory = () => {
    clearSearchHistory()
    searchHistoryList.value = getSearchHistory()
}
// 前往搜索结果详情页
const goSearchResult = (kwywords: string) => {
    // 隐藏弹出框
    emits("hideSearchBox")
    router.push(`/search-result-detail/${kwywords}`)
}
// 搜索
const getSuggest = async (keywords: string) => {
    const r = await searchSuggest({ keywords })
    searchResult.data = r.result
}
// 获取热搜列表
const getHotSearch = async () => {
    const r = await getHotSearchList()
    hotSearchList.data = r.data
}
props.searchKeywords ? getSuggest(props.searchKeywords) : getHotSearch()

</script>
<style lang="scss" scoped>
.search-result-box-wrapper {
    width: 350px;
    position: fixed;
    right: 0;
    top: 50px;
    height: calc(100vh - 110px);
    z-index: 99;
    background-color: var(--theme-search);
    overflow-y: auto;

    .search-hot {
        height: 100%;

        .hot-title {
            padding: 0 20px;
        }

        .hot-item {
            height: 55px;
            padding: 0 20px;

            &:hover {
                background-color: var(--theme-f2);
                cursor: pointer;
            }

            .isTop {
                color: #c3473a;
            }

            .main-info {
                .search-word {
                    .icon img {
                        width: 20px;
                        height: 10px;
                    }

                    .isTop {
                        font-weight: bold;
                        color: var(--theme-31);
                    }
                }
            }
        }
    }

    .search-history {
        padding: 15px 20px;

        .search-item {
            border: 1px solid var(--theme-e5);
            padding: 4px 12px;
            border-radius: 15px;

            &:hover {
                cursor: pointer;
                background-color: var(--theme-f2);
            }
        }
    }

    .search-result {
        .label-title {
            padding-left: 10px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            color: var(--theme-66);
            font-size: 14px;

            &:hover {
                cursor: pointer;
            }
        }

        .item {
            height: 30px;
            padding: 0 30px;
            display: flex;
            align-items: center;
            font-size: 13px;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            &:hover {
                cursor: pointer;
                background-color: var(--theme-f2);
            }
        }

    }

    .result-title {
        padding: 10px;

        &:hover {
            cursor: pointer;
        }
    }
}

.isShowBoxShadow {
    box-shadow: -5px 0 5px -5px #ccc;
}
</style>
