import { initPlayer, updatePlayer } from "@/utils"
import Player from "@/utils/Player";
import { defineStore } from "pinia"
// updatePlayer()
let player = new Player()
player = new Proxy(player, {
    set(target, prop, val) {
        (target as any)[prop] = val;
        if (prop === '_howler') return true;
        target.saveSelfToLocalStorage();
        return true;
    },
});
const usePlayerState = defineStore("player", {
    state: () => {
        return {
            dailyTracks: [],
            lastfm: JSON.parse(localStorage.getItem('lastfm')!) || {},
            // player: JSON.parse(localStorage.getItem('player')!) as Player,
            player: player,
        }
    },
    getters: {

    },
    actions: {
        updateDailyTracks(dailyTracks: any) {
            this.dailyTracks = dailyTracks;
        },
        updateLastfm(session: any) {
            this.lastfm = session;
        },
    },
    persist: true
})
export default usePlayerState