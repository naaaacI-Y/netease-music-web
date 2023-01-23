<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" class="pb-30" :items="highQualityList.data" :item-size="155" key-field="id"
            :buffer="1550" style="height: 100%;width: 100%;">
            <template #before>
                <div class="title mb-10 fs-5 text-33 mt-10">精品歌单 - {{ type === "" ? '全部' : type }}</div>
            </template>
            <template v-slot="{ item }">
                <div class="d-flex flex-wrap song-list-wrapper">
                    <RecommendSongListCard v-for="it in item.dataList" :key="it.id + 1" :song-list-item="it"
                        class="recommend-song-list-card" :is-high-quality="true">
                        <template #rank-flag>
                            <div class="rank-flag">
                                <div class="flag">
                                    <i class="iconfont icon-huangguan fs-6" style="color: white;"></i>
                                </div>
                            </div>
                        </template>
                        <template #right-info>
                            <div class="right-info-wrap ml-10 pt-20">
                                <div class="song-list-name mb-10 fs-3 text-33">{{ it.name }}</div>
                                <div class="song-list-author mb-20 fs-1 d-flex text-99"
                                    @click.stop="goAuthorPage(it.userId)">
                                    by&nbsp;{{ it.creator.nickname }}
                                    <img :src="it.creator.avatarDetail.identityIconUrl" alt=""
                                        v-if="it.creator.avatarDetail" />
                                </div>
                                <div class="song-list-des fs-1 d-flex ai-center">
                                    <div class="tags fs-1 text-primary_red_4 mr-5">
                                        <span>{{ it?.tags?.join('、') }}</span>
                                    </div>
                                    <div class="summary" v-if="it.copywriter">{{ it.copywriter }}</div>
                                </div>
                            </div>
                        </template>
                    </RecommendSongListCard>
                </div>
            </template>
            <template #after>
                <div style="margin-top: -10px;">
                    <Loading :is-need-show-scroll="false" :is-show-padding-top="false" v-show="loading"></Loading>
                </div>
            </template>
        </RecycleScroller>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';

import Loading from '@/components/Loading.vue';
import { getHighqualitySongList } from "@/service/api/music"
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { Playlist } from '@/service/api/music/types';
import { FormatList, formatListData } from '@/utils';
import { useScroll } from '@/hooks/useScroll';

const { listenListScroll, removeListener } = useScroll()
const route = useRoute()
const router = useRouter()
const type = route.query.type ?? "全部"
const loaded = ref(false)
const loading = ref(false)
const pages = reactive({
    limit: 30,
    page: 1
})
const highQualityList = reactive({ data: [] as FormatList<Playlist> })

// 前往歌单作者界面
const goAuthorPage = (id: number) => {
    router.push(`/personal-center/${id}`)
}
// 获取列表数据
const getList = async () => {
    if (loaded.value || loading.value) return
    loading.value = true
    const info: { [key: string]: any } = {
        cat: type === "" ? "全部" : type,
        limit: pages.limit
    }
    if (pages.page !== 1) {
        const lastData = highQualityList.data[highQualityList.data.length - 1]
        info.before = lastData.dataList[lastData.dataList.length - 1].updateTime
    }
    const r = await getHighqualitySongList(info)
    const _ = formatListData<Playlist>(r.playlists, 3)
    highQualityList.data = highQualityList.data.concat(..._)
    pages.page++

    loading.value = false
    loaded.value = !r.more
}

onMounted(() => {
    const scroller = document.getElementById("scroller")
    setTimeout(() => {
        // 这里不用定时的话 传递进去的值是在获取数据结束之前的
        listenListScroll(scroller!, [getList, loaded.value, loading.value])
    }, 1000)
})
onUnmounted(() => {
    const scroller = document.getElementById("scroller")

    removeListener(scroller!, [getList, loaded.value, loading.value])
})
getList()
</script>
<style lang="scss" scoped>
.title,
.song-list-wrapper {
    padding: 0 30px;
}

.recommend-song-list-card {
    width: 33.333%;

    .rank-flag {
        position: absolute;
        top: 0;
        left: 0;
        // background-color: #e9b393;
        width: 0;
        height: 0;
        border-top: 30px solid #e9b393;
        border-right: 30px solid transparent;

        .flag {
            transform: rotateZ(-45deg);
            position: absolute;
            top: -30px;
            left: 50%;
        }
    }
}

.right-info-wrap {
    width: calc(100% - 145px);

    .song-list-author {
        img {
            width: 15px;
            height: 15px;
            margin-left: 5px;
        }

        &:hover {
            color: var(--theme-89);
            cursor: pointer;
        }
    }

    .song-list-des {
        width: 100%;

    }

    .tags {
        border: 1px solid #c3473a;
        border-radius: 4px;
        padding: 0 2px;
        white-space: nowrap;
        display: inline !important;
        // span {
        //     transform: scale(0.9);
        //     display: inline-block;
        // }
    }

    .summary {
        color: var(--theme-dd);
        display: inline !important;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>
