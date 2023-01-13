import { reactive, ref } from "vue";
import Plyr from 'plyr';
import { storeToRefs } from "pinia";

import usePlayerState from "@/store/player";
export const useInitVideoPlayer = () => {
    const { player } = storeToRefs(usePlayerState())
    const videoPlayer = reactive({ data: null as unknown as Plyr })
    // 初始化视频播放器
    const initVideoPlayer = (callback: Function, id: number | string, el: HTMLElement) => {
        let videoOptions = {
            settings: ['quality'],
            autoplay: false,
            quality: {
                default: 1080,
                options: [1080, 720, 480, 240],
            },
        };
        videoOptions.autoplay = true;
        videoPlayer.data = new Plyr(el, videoOptions);
        videoPlayer.data.volume = player.value?.volume;
        videoPlayer.data.on('playing', () => {
            player.value.pause();
        });

        callback(id)

    }
    return {
        initVideoPlayer,
        videoPlayer,
    }
}
