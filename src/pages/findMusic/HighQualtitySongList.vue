<template>
    <DefaultLayout>
        <RecycleScroller id="scroller" :items="highQualityList.data" :item-size="155" key-field="id" :buffer="1550"
            style="height: 100%;width: 100%;">
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
                <Loading v-show="isShowLoading"></Loading>
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
import { debounce, FormatList, formatListData } from '@/utils';

const route = useRoute()
const router = useRouter()
const type = route.query.type ?? "全部"
const isShowLoading = ref(false)
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
const getList = async () => {
    if (loaded.value || loading.value) return
    isShowLoading.value = true
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
    isShowLoading.value = false
    highQualityList.data = highQualityList.data.concat(..._)
    pages.page++

    loading.value = false
    loaded.value = !r.more
}
// 监听歌手列表滚动
const handleListener = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    const clientHeight = target.clientHeight
    const scrollHeight = target.scrollHeight

    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        // 滚动到底部 加载更多
        if (!loaded.value && !loading.value) {
            getList()
        }
    }

}
const handleFn = debounce(handleListener, 100)
const listenListScroll = () => {
    const wrapper = document.getElementById("scroller")
    wrapper?.addEventListener("scroll", handleFn)
}
onMounted(() => {
    listenListScroll()
})
onUnmounted(() => {
    const wrapper = document.getElementById("scroller")
    wrapper?.removeEventListener("scroll", handleFn)
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


    .tags {
        border: 1px solid #c3473a;
        border-radius: 4px;
        padding: 0 5px;
    }

    .summary {
        color: var(--theme-dd);
    }
}
</style>
