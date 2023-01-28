<template>
    <div class="card-for-album-wrapper" @click="goAlbum">
        <div class="img-wrapper mb-5">
            <LazyLoadImg :src="formatPicUrl(albumItem.picUrl, 375, 375)"></LazyLoadImg>
            <div class="play-btn" @click.stop="playAlbum">
                <div class="trangel"></div>
            </div>
        </div>
        <div class="album-info">
            <div class="name mb-2 fs-3 text-33">
                <span>{{ albumItem.name }}</span>
                <span v-if="albumItem.alias?.length" class="fs-2 text-99">({{ albumItem.alias[0] }})</span>
            </div>
            <div class="time fs-2 text-97">{{ formatTime(albumItem.publishTime, "yyyy-MM-dd") }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HotAlbum } from '@/service/api/singer/types';
import LazyLoadImg from "@/components/LazyLoadImg.vue"
import { formatTime } from "@/utils/index"
import { useRouter } from 'vue-router';
import { formatPicUrl } from '@/utils/index';
import { useMusicPlayRelation } from '@/hooks/useMusicPlayRelation';
import { getAlbumInfo } from '@/service/api/album';
import Message from "@/components/message"
const { player, checkMusicCopyright, playSongList } = useMusicPlayRelation()

const router = useRouter()
const props = defineProps<{
    albumItem: HotAlbum
}>()

// 前往专辑页
const goAlbum = () => {
    router.push(`/album/${props.albumItem.id}`)
}

// 播放专辑所有歌曲
const playAlbum = async () => {
    // 获取专辑详情
    const albumId = props.albumItem.id
    if (player.value.playing && player.value.playlistSource.id === albumId) return
    try {
        const r = await getAlbumInfo({ id: albumId })
        const ids = r.songs?.filter((item) => {
            return checkMusicCopyright(item.fee, !item.noCopyrightRcmd, item.copyright)
        }).map(item => item.id)
        if (!ids?.length) {
            return Message.error("惊不惊喜，一首都不让你听>_<")
        }
        playSongList(JSON.stringify(ids), albumId)
    } catch (error) {
    }
}
</script>
<style lang="scss" scoped>
.card-for-album-wrapper {
    width: 16%;
    margin-bottom: 35px;

    .img-wrapper {

        height: 0;
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        // background-color: aqua;
        img {
            width: 100%;
        }

        .play-btn {
            @include common-play-btn(40px, 7px, 10px);
            left: 50%;
            top: 50%;
            display: none;
        }

        &:hover {
            .play-btn {
                display: block;
            }

            cursor: pointer;
        }

    }

    .album-info {
        .name {
            @include multiEllipsis;
        }

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
