<template>
    <div class="lyric-wrapper">
        <Header></Header>
        <SongListItem v-for="(item, index) in LyricList.data" :key="item.id" :index="index" :type="0" :item="item">
            <template #lyric>
                <div class="lyric-wrap d-flex ai-start mt-5" v-if="item.lyrics">
                    <div class="lyric fs-2 text-89">
                        <div class="item mb-8" v-for="it in item.lyrics.slice(0, 1)">{{ it }}</div>
                        <div class="other" v-for="it in item.lyrics.slice(1, 4)" v-show="item.isFold">{{ it }}</div>
                        <div class="other" v-for="it in item.lyrics.slice(1)" v-show="!item.isFold">{{ it }}</div>
                    </div>
                    <div class="operate fs-2 text-black_1 d-flex ai-center">
                        <div class="more d-flex ai-center jc-center mr-10" @click="foldLyric(index)">{{ item.isFold ?
        '展开歌词' : '收起歌词'
}}</div>
                        <div class="copy d-flex ai-center jc-center" @click="copyToClipboard(item.lyrics!)">复制歌词</div>
                    </div>
                </div>

            </template>
        </SongListItem>
    </div>
</template>

<script lang="ts" setup>
import SongListItem from '@/components/song/SongListItem.vue';
import { searchByType } from '@/service/api/search';
import { SearchLyricResult } from '@/service/api/search/types';
import { Song } from '@/service/api/singer/types';
import Message from "@/components/message"
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from './Header.vue';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = useRoute().params.keywords as string
const total = ref(0)
const LyricList = reactive({ data: [] as Song[] })
const isFold = ref(false)
const unFoldIndex = ref(-1)

const foldLyric = (index: number) => {
    LyricList.data[index].isFold = !LyricList.data[index].isFold
}
const copyToClipboard = (text: string[]) => {
    const t = text.slice(1).join("\n")
    navigator.clipboard.writeText(t);
    Message.success("已复制到剪切板")
}
const getLyrics = async () => {
    const r = await searchByType({ keywords, type: 1006 })
    const _ = r.result as unknown as SearchLyricResult
    LyricList.data = _.songs.map(item => {
        item.isFold = true
        return item
    })
    total.value = _.songCount
    emits('changeTotal', _.songCount)
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
            border: 1px solid #ccc;
            border-radius: 20px;
            padding: 4px 10px;

            &:hover {
                background-color: #e4e4e4;
            }
        }
    }
}
</style>
