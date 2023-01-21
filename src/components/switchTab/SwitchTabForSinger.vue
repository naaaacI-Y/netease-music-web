<template>
    <div class="switch-tab-wrapper mt-30">
        <div class="head d-flex jc-between">
            <div class="head-item-wrapper d-flex">
                <div class="head-item mr-30 fs-4 text-4e" v-for="(item, index) in labelList"
                    :class="{ isActive: activeIndex === index }" @click="activeIndex = index" :key="index">{{ item }}
                </div>
            </div>
            <!--展示类型切换  后面再做-->
            <!-- <div class="change-radio" v-if="activeIndex === 0">
                <div class="type-change d-flex">
                    <div class="type1 mr-2 d-flex ai-center jc-center"
                        :class="{ isBtnActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                        <i class="iconfont icon-datu fs-9 text-66"></i>
                    </div>
                    <div class="type2 d-flex ai-center jc-center" :class="{ isBtnActive: songListShowType === 'list' }"
                        @click="songListShowType = 'list'">
                        <i class="iconfont icon-liebiao fs-5 text-66"></i>
                    </div>
                </div>
            </div> -->
        </div>
        <!--专辑--->
        <keep-alive>
            <div class="album pt-20" v-show="activeIndex === 0">
                <div class="album-card-wrap d-flex flex-wrap" v-show="singerAlbumList.data.length && !isShowLaoding">
                    <CardForAlbum v-for="item in singerAlbumList.data" :key="item.id" :album-item="item"
                        class="card-for-album"></CardForAlbum>
                </div>
                <div class="no-data text-66 fs-2" v-if="!singerAlbumList.data.length && !isShowLaoding">没有相关专辑</div>
                <Loading v-show="isShowLaoding"></Loading>
            </div>
        </keep-alive>
        <!--mv--->
        <keep-alive>
            <div v-show="activeIndex === 1" class="mv">
                <div class="mv-wrapper d-flex flex-wrap pt-25" v-show="singerMvList.data.length && !isShowLaoding">
                    <RecommendMvCard :is-show-time="true" v-for="item in singerMvList.data" :is-oneline="true"
                        :count="5" :recommend-mv-item="item" class="recommend-mv-card">
                    </RecommendMvCard>
                </div>
                <div class="no-data text-66 fs-2" v-if="!singerMvList.data.length && !isShowLaoding">没有相关mv</div>
                <Loading v-show="isShowLaoding"></Loading>
            </div>
        </keep-alive>
        <!--歌手详情-->
        <keep-alive>
            <div v-show="activeIndex === 2" class="detail">
                <div class="detail-wrap mb-30 pt-20" v-if="singerDetail.data.length && !isShowLaoding">
                    <div class="detail-item " v-for="item in singerDetail.data">
                        <div class="detail-title f-2 mb-20 text-33">{{ item.ti }}</div>
                        <div class="detail-content fs-1 mb-20 text-bc" v-for="it in item.txt.split('\n')">
                            {{ it }}
                        </div>
                    </div>
                </div>
                <div class="no-data text-66 fs-3" v-if="!singerDetail.data.length && !isShowLaoding">暂无介绍</div>
                <Loading v-show="isShowLaoding"></Loading>
            </div>
        </keep-alive>
        <!--相似歌手-->
        <keep-alive>
            <div v-show="activeIndex === 3" class="simlary">
                <div class="simlary-wrapper d-flex flex-wrap pt-25"
                    v-if="similarSingerList.data.length && !isShowLaoding">
                    <SingerCard v-for="item in similarSingerList.data" :is-show-singer-flag="false" :singer-item="item"
                        class="singer-card">
                    </SingerCard>
                </div>
                <div class="no-data text-66 fs-3" v-if="!similarSingerList.data.length && !isShowLaoding">
                    没有相关歌手</div>
                <Loading v-show="isShowLaoding"></Loading>
            </div>
        </keep-alive>
    </div>
</template>

<script lang="ts" setup>
import RecommendMvCard from '../RecommendMvCard.vue';
import SingerCard from '../singer/SingerCard.vue';
import CardForAlbum from '../CardForAlbum.vue';
import { getSingerAlbum, getSimilarSinger, getSingerDes, getSingerMv } from "@/service/api/singer"
import { labelList } from "@/utils/const"
import { useRoute } from 'vue-router';
import { Artist, HotAlbum, Introduction, Mv } from '@/service/api/singer/types';
import Loading from '../Loading.vue';

const route = useRoute()
const activeIndex = ref(0)
// const songListShowType = ref("card")  // 暂时用不到
const singerId = ref(Number(route.params.id)) // 歌手id
const singerAlbumList = reactive<Record<string, HotAlbum[]>>({ data: [] }) // 专辑信息
const singerMvList = reactive<Record<string, Mv[]>>({ data: [] }) // mv
const similarSingerList = reactive<Record<string, Artist[]>>({ data: [] }) // 相似歌手
const singerDetail = reactive<Record<string, Introduction[]>>({ data: [] }) // 歌手详情
const isShowLaoding = ref(false)

watch(() => route.params.id, (newVal) => {
    activeIndex.value = 0
    singerAlbumList.data = []
    singerMvList.data = []
    similarSingerList.data = []
    singerDetail.data = []
    singerId.value = Number(newVal)
})
// 获取专辑  分页TODO
const getAlbum = async () => {
    isShowLaoding.value = true
    const r = await getSingerAlbum({ id: singerId.value })
    singerAlbumList.data = r.hotAlbums
    isShowLaoding.value = false
}

// mv
const getMv = async () => {
    isShowLaoding.value = true
    const r = await getSingerMv({ id: singerId.value })
    singerMvList.data = r.mvs
    isShowLaoding.value = false
}
// 相似歌手
const getSimilar = async () => {
    isShowLaoding.value = true
    const r = await getSimilarSinger({ id: singerId.value })
    similarSingerList.data = r.artists
    isShowLaoding.value = false
}
// 歌手详情
const getSingerDetail = async () => {
    isShowLaoding.value = true
    const r = await getSingerDes({ id: singerId.value })
    singerDetail.data = r.introduction
    isShowLaoding.value = false
}
watchEffect(() => {
    switch (activeIndex.value) {
        case 0:
            if (!singerAlbumList.data.length) {
                getAlbum()
            }
            break
        case 1:
            if (!singerMvList.data.length) {
                getMv()
            }
            break
        case 2:
            if (!singerDetail.data.length) {
                getSingerDetail()
            }
            break
        case 3:
            if (!similarSingerList.data.length) {
                getSimilar()
            }
            break

    }
})
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
    .head {
        border-bottom: 1px solid var(--theme-ee);

        .head-item {
            padding-bottom: 10px;

        }

        .isActive {
            border-bottom: 2px solid red;
            color: #d33b31;
        }

        .type-change {

            .type1,
            .type2 {
                width: 25px;
                height: 20px;
                background-color: var(--theme-f2);
            }

            .type1 {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .type2 {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            .isBtnActive {
                background-color: var(--theme-bf);

                i {
                    color: white;
                }
            }
        }
    }

    // .card-for-album,
    // .singer-card {
    //     margin-right: 20px;
    // }

    .card-for-album:not(:nth-child(6n)),
    .singer-card:not(:nth-child(6n)) {
        margin-right: calc(4% / 5);
    }

    .recommend-mv-card:not(:nth-child(5n)) {
        margin-right: calc(5% / 4);
    }

    .no-data {
        text-align: center;
        margin-top: 110px;
    }
}
</style>
