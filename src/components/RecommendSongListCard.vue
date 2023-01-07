<template>
    <div class="recommend-songlist-card-wrapper" @click="goSongList">
        <div class="img-wrapper mb-6">
            <img :src="songListItem.coverImgUrl" alt="">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="play-count d-flex ai-center fs-2">
                <i class="iconfont icon-bofang1 fs-7"></i>
                {{ formatPlayCount(songListItem.playCount) }}
            </div>
            <div class="play-btn">
                <div class="trangel"></div>
            </div>
            <div class="songlist-author" v-if="!isOutSide" style="color: white;">
                <i class="iconfont icon-iconfontyonghuming  mr-2 "></i>
                <div class="author-name fs-2 mr-2 pt-2">{{ songListItem.creator.nickname }}</div>
                <img :src="songListItem.creator.avatarDetail.identityIconUrl" alt=""
                    v-if="songListItem.creator.avatarDetail" />
                <!-- <div class="author-flag" >

                </div> -->
            </div>

        </div>
        <div class="songlist-name fs-3 text-4e" :class="{ isOneLine: isOneline }">{{ songListItem.name }}</div>
        <slot name="songCount"></slot>
    </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import { Playlist } from '@/service/api/music/types';
import { formatPlayCount } from '@/utils';
const props = withDefaults(defineProps<{
    isOutSide?: boolean
    isOneline?: boolean
    songListItem: Playlist
}>(), {
    isOutSide: true,
    isOneline: false
})
const goSongList = () => {
    router.push(`/song-list/${props.songListItem.id}`)
}
</script>
<style lang="scss" scoped>
.recommend-songlist-card-wrapper {
    width: calc(20% - 18px);
    margin-bottom: 45px;


    .img-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        // border: 1px solid #eee;

        img {
            width: 100%;
            // height: 100%;
        }

        .mask-top,
        .mask-bottom {
            position: absolute;
            right: 0px;
            width: 100%;
            height: 30px;
        }

        .mask-top {
            top: 0;
            background-image: linear-gradient(rgba(#000, 0.3), rgba(#000, 0));
        }

        .mask-bottom {
            bottom: 0;
            background-image: linear-gradient(rgba(#000, 0), rgba(#000, 0.3));
        }

        .play-count {
            position: absolute;
            right: 5px;
            top: 5px;
            color: white;
            // background-color: rgba($color: #000000, $alpha: 0.1);
        }

        .play-btn {
            display: none;
            position: absolute;
            bottom: 10px;
            right: 10px;
            @include radius(30px);
            background-color: rgba($color: #bebebb, $alpha: 0.6);

            .trangel {
                width: 0;
                height: 0;
                position: absolute;
                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 10px solid #d33b31;
                left: 50%;
                top: 50%;
                transform: translate(-30%, -50%);
            }
        }

        .isCenter {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        &:hover {
            cursor: pointer;

            .play-btn {
                display: block;

            }
        }

        .songlist-author {
            position: absolute;
            bottom: 10px;
            display: flex;
            align-items: center;
            left: 10px;
            color: white;

            img {
                width: 13px;
                height: 13px;
            }

            // .author-flag {
            //     // background-color: #d33b31;
            //     // @include radius(14px);
            //     width: 13px;
            //     height: 13px;

            //     img {
            //         width: 100%;
            //         height: 100%;
            //     }
            // }
        }

    }

    .songlist-name {
        word-break: break-all;


        &:hover {
            color: var(--theme-3a);
            cursor: pointer;
        }
    }

    .isOneLine {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>
