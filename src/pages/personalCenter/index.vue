<template>
    <DefaultLayout>
        <div class="persoanl-center-wrapper">
            <UserHeader :is-self="isSelf" :uid="id"></UserHeader>
            <div class="song-list-wrapper mb-30">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title">
                        <span class="fs-5" style="font-weight: bold;">{{ isSelf ? '我创建的歌单' : '歌单' }}</span>
                        <span class="text-66 fs-2">({{ songList.data.length }})</span>
                    </div>
                    <div class="type-change d-flex">
                        <div class="type1 mr-2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                            <i class="iconfont icon-datu fs-9 text-66"></i>
                        </div>
                        <div class="type2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'table' }" @click="songListShowType = 'table'">
                            <i class="iconfont icon-liebiao fs-5 text-66"></i>
                        </div>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap" v-if="songListShowType === 'card'">
                        <RecommendSongListCard v-for="(item, index) in songList.data" :is-oneline="true"
                            :song-list-item="item"
                            :style="{ marginRight: index % 4 === 0 && index !== 0 ? '0' : '18px' }" :key="item.id">
                            <template #songCount>
                                <div class="text-66 fs-2">{{ item.trackCount }}首</div>
                            </template>
                        </RecommendSongListCard>
                    </div>
                    <!-- <div class="content-type2" v-if="songListShowType === 'table'">
                        <songForList v-for="item in 4"></songForList>
                    </div> -->
                </div>
            </div>
            <div class="song-list-wrapper" v-if="collectSongList.data.length">
                <div class="head d-flex jc-between mb-15 ai-center">
                    <div class="title">
                        <span class="fs-5" style="font-weight: bold;">{{ isSelf ? '我收藏的歌单' : '收藏' }}</span>
                        <span class="text-66 fs-2">({{ collectSongList.data.length }})</span>
                    </div>
                    <div class="type-change d-flex">
                        <div class="type1 mr-2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'card' }" @click="songListShowType = 'card'">
                            <i class="iconfont icon-datu fs-9 text-66"></i>
                        </div>
                        <div class="type2 d-flex ai-center jc-center"
                            :class="{ isActive: songListShowType === 'table' }" @click="songListShowType = 'table'">
                            <i class="iconfont icon-liebiao fs-5 text-66"></i>
                        </div>
                    </div>
                </div>
                <div class="list-content-wrapper ">
                    <div class="content-type1 d-flex flex-wrap " v-if="songListShowType === 'card'">
                        <RecommendSongListCard v-for="(item, index) in collectSongList.data" :is-oneline="true"
                            :style="{ marginRight: index % 4 === 0 && index !== 0 ? '0' : '18px' }"
                            :song-list-item="item" :key="item.id">
                            <template #songCount>
                                <div class="text-66 fs-2">{{ item.trackCount }}首</div>
                            </template>
                        </RecommendSongListCard>
                    </div>
                    <!-- <div class="content-type2" v-if="songListShowType === 'table'">
                        <songForList v-for="item in 4"></songForList>
                    </div> -->
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import UserHeader from '@/components/header/UserHeader.vue';
import RecommendSongListCard from '@/components/RecommendSongListCard.vue';
import songForList from '@/components/songForList.vue';
import { getSongList } from '@/service/api/user';
import { Playlist_user } from '@/service/api/user/types';
import useStore from '@/store';
import { checkLogin, getQueryId } from '@/utils';
import { computed, reactive, ref } from 'vue';
const songListShowType = ref("card") // card | table
const songList = reactive({ data: [] as Playlist_user[] }) // 创建的歌单
const collectSongList = reactive({ data: [] as Playlist_user[] }) // 收藏的歌单
const id = getQueryId()
const isSelf = computed(() => {
    if (!checkLogin()) return false
    const store = useStore()
    const uid = store.userProfile.userFile?.userId
    if (uid === id) return true
    return false
})
const getList = async () => {
    const r = await getSongList({ uid: id })
    songList.data = r.playlist.filter(item => item.creator.userId === id)
    collectSongList.data = r.playlist.filter(item => item.creator.userId !== id)
}
getList()
</script>
<style lang="scss" scoped>
.persoanl-center-wrapper {
    padding: 15px 30px;
}

.song-list-wrapper {
    .head {
        .type-change {

            .type1,
            .type2 {
                width: 25px;
                height: 20px;
                background-color: #f2f2f2;
            }

            .type1 {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .type2 {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            .isActive {
                background-color: #bfbfbf;

                i {
                    color: white;
                }
            }
        }
    }
}
</style>
