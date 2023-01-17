

import usePlayerStore from "@/store/playerStore"
export const initPlayer = () => {
    const playerStore = usePlayerStore()
    Object.defineProperty(playerStore.player, 'howler', {
        enumerable: false,
    });
    playerStore.init()
    playerStore.getLikedSongs()
}
