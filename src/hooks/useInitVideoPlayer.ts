import { reactive } from "vue";
import Plyr from 'plyr';
import { storeToRefs } from "pinia";

import usePlayerStore from "@/store/playerStore";
export const useInitVideoPlayer = () => {
    const { player } = storeToRefs(usePlayerStore())
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
            usePlayerStore().pause();
        });

        callback(id)

    }
    return {
        initVideoPlayer,
        videoPlayer,
    }
}
