<template>
    <div class="user-wrapper">
        <CommonItem v-for="(item, index) in userList.data" :key="item.userId" :index="index">
            <template #avatar>
                <div class="avatar mr-15">
                    <img :src="item.avatarUrl" alt="">
                    <div class="flag" v-if="item.avatarDetail">
                        <img :src="item.avatarDetail.identityIconUrl" alt="">
                    </div>
                </div>
            </template>
            <template #name>
                <div class="name fs-3 d-flex ai-center">
                    <span class="mr-10">{{ item.nickname }}</span>
                    <div class="sex d-flex ai-center jc-center"
                        :style="{ backgroundColor: item.gender === 1 ? '#d2f2f1' : '#f9d0e7' }" v-if="item.gender">
                        <i class="iconfont icon-nanxing text-male fs-2" v-if="item.gender === 1"></i>
                        <i class="iconfont icon-nvxing text-female fs-2" v-if="item.gender === 2"></i>
                    </div>
                </div>
            </template>
            <template #user-title v-if="item.description">
                <div class="user-title fs-2 text-89">
                    {{ item.description }}
                </div>
            </template>
        </CommonItem>
    </div>
</template>

<script lang="ts" setup>
import CommonItem from './CommonItem.vue';
import { SearchUserResult, Userprofile } from '@/service/api/search/types';
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { searchByType } from '@/service/api/search';
const emits = defineEmits<{
    (e: "changeTotal", num: number): void
}>()
const keywords = computed(() => {
    return useRoute().params.keywords as string
})
watch(() => keywords.value, () => {
    console.log("keywords.value 发生改变了", keywords.value);

    getSearchUserList()
})

const userList = reactive({ data: [] as Userprofile[] })
const getSearchUserList = async () => {
    const r = await searchByType({ keywords: keywords.value, type: 1002 })
    const _ = r.result as unknown as SearchUserResult
    emits("changeTotal", _.userprofileCount)
    userList.data = _.userprofiles
}
getSearchUserList()
</script>
<style lang="scss" scoped>
.user-wrapper {
    .avatar {
        position: relative;
        width: 60px;
        height: 60px;

        // overflow: hidden;

        img {
            width: 100%;
            border-radius: 50%;
            height: 100%;
        }

        .flag {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            bottom: 2px;
            right: 0px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;

            }
        }
    }

    .name .sex {
        @include radius(15px);
    }
}
</style>
