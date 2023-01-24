<template>
    <div class="lyric-wrapper">
        <div class="wrap" v-show="!isShowLoading && pages.total">
            <Header></Header>
            <SongListItem v-for="(item, index) in LyricList.data" :key="item.id" :index="index" :type="0" :item="item"
                :colorful="true">
                <template #lyric>
                    <div class="lyric-wrap d-flex ai-start mt-5" v-if="item.lyrics">
                        <div class="lyric fs-1 text-88">
                            <div class="item mb-8" v-for="it in item.lyrics.slice(0, 1)"
                                v-html="keywordsColorful(it, keywords)"></div>
                            <div class="other" v-for="it in item.lyrics.slice(1, 4)" v-show="item.isFold">{{ it }}</div>
                            <div class="other" v-for="it in item.lyrics.slice(1)" v-show="!item.isFold">{{ it }}</div>
                        </div>
                        <div class="operate fs-1 text-33 d-flex ai-center">
                            <div class="more d-flex ai-center jc-center mr-10" @click="foldLyric(index)">{{
                                item.isFold ?
                                    '展开歌词' : '收起歌词'
                            }}</div>
                            <div class="copy d-flex ai-center jc-center" @click="copyToClipboard(item.lyrics!)">复制歌词
                            </div>
                        </div>
                    </div>

                </template>
            </SongListItem>
        </div>
        <Pagination id="pagination" v-if="pages.total >= pages.size && !isShowLoading && pages.total"
            :total="pages.total" :size="pages.size" :page="pages.page" @page-change="handlePageChange"
            class="mt-30 mb-30"></Pagination>
        <Loading v-show="isShowLoading"></Loading>
        <div class="no-data fs-2  d-flex jc-center text-33" v-show="!isShowLoading && !pages.total"
            style="margin-top: 100px;">
            很抱歉，未能找到与<span class="text-deep_blue">"{{ keywords }}"</span>相关的任何歌词
        </div>
    </div>

</template>

<script lang="ts" setup>
import SongListItem from '@/components/song/SongListItem.vue';
import Pagination from '@/components/Pagination.vue';
import { searchByType } from '@/service/api/search';
import { SearchLyricResult } from '@/service/api/search/types';
import { Song } from '@/service/api/singer/types';
import Message from "@/components/message"
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import Header from '@/components/header/Header.vue';
import { scrollToTop } from '@/utils';
import { keywordsColorful } from '@/utils';


const isShowLoading = ref(false)
const keywords = useRoute().params.keywords as string
const LyricList = reactive({ data: [] as Song[] })
const pages = reactive({
    page: 1,
    size: 30,
    total: 0
})

const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()

provide("songListInfo", [])
// 总数变化了，触发更新
watch(() => pages.total, (newVal) => {
    emits('changeTotal', newVal)
})



// 歌词折叠
const foldLyric = (index: number) => {
    LyricList.data[index].isFold = !LyricList.data[index].isFold
}

// 页码变化
const handlePageChange = (num: number) => {
    pages.page = num
    getLyrics()
}

// 复制到剪切板
const copyToClipboard = (text: string[]) => {
    const t = text.slice(1).join("\n")
    navigator.clipboard.writeText(t);
    Message.success("已复制到剪切板")
}

// 给获取歌词
const getLyrics = async () => {
    // 滚动到顶部
    scrollToTop("search-result-wrapper")
    isShowLoading.value = true
    try {
        const r = await searchByType({ keywords, type: 1006, limit: pages.size, offset: (pages.page - 1) * pages.size })
        const _ = r.result as unknown as SearchLyricResult
        LyricList.data = _.songs?.map(item => {
            item.isFold = true
            return item
        })
        isShowLoading.value = false
        pages.total = _.songCount
        if (pages.total === 0) {
            emits("changeTotal", pages.total)
        }
    } catch (error) {
        isShowLoading.value = false
    }

}
getLyrics()
</script>
<style lang="scss" scoped>
.lyric-wrapper {
    padding: 0 30px;

    .lyric-wrap {
        padding-left: 7.2%;
        padding-bottom: 10px;

        .lyric {
            width: 68%;
        }

        .operate div {
            border: 1px solid var(--theme-cc);
            border-radius: 20px;
            padding: 2px 12px;

            &:hover {
                background-color: var(--theme-e4);
                cursor: pointer;
            }
        }
    }
}
</style>
