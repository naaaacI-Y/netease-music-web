<template>
    <div class="collectors-wrapper">
        <div class="collectors d-flex flex-wrap jc-between mt-20">
            <div class="collector-item d-flex ai-center mb-20" v-for="item in collectorsList.data" :key="item.userId">
                <div class="avatar mr-10" @click="goPersonCenter(item.userId)">
                    <img :src="item.avatarUrl" alt="">
                </div>
                <div class="info d-flex flex-column jc-center">
                    <div class="name mb-10 d-flex ai-center" :style="{ marginBottom: item.signature ? '10px' : '0' }">
                        <div class="fs-3 text-4e mr-5 nickname" @click="goPersonCenter(item.userId)">{{
                            item.nickname
                        }}</div>
                        <div class="sex d-flex ai-center jc-center" v-if="item.gender"
                            :style="{ backgroundColor: item.gender === 1 ? '#d2f2f1' : '#f9d0e7' }">
                            <i class="iconfont icon-nanxing text-male fs-2" v-if="item.gender === 1"></i>
                            <i class="iconfont icon-nvxing text-female fs-2" v-if="item.gender === 2"></i>
                        </div>
                    </div>
                    <div class="intrucduce fs-2 text-99" v-if="item.signature">{{ item.signature }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Subscriber } from '@/service/api/music/types';
import { getCollectors4SongList } from '@/service/api/music';
import { getQueryId } from '@/utils';
import router from '@/router';
const collectorsList = reactive({ data: [] as Subscriber[] })
const id = getQueryId()
const getCollectors = async () => {
    const r = await getCollectors4SongList({ id })
    collectorsList.data = r.subscribers
}
const goPersonCenter = (userId: number) => {
    router.push(`/personal-center?id=${userId}`)
}
getCollectors()
</script>
<style lang="scss" scoped>
.collectors {
    .collector-item {
        width: 370px;

        .avatar {
            @include radius(90px);

            img {
                width: 100%;
                height: 100%;
            }

            &:hover {
                cursor: pointer;
            }
        }

        .info .name {
            .nickname:hover {
                cursor: pointer;
            }

            .sex {
                @include radius(15px);
            }
        }
    }
}
</style>
