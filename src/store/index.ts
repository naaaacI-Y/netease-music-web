import Player from "@/utils/Player";
import useGlobalStore from "./globalState";
import usePlayerStore from "./player";
import useSideSongListStore from "./sideSongList";
import useUserProfileStore from "./user";



export default function useStore() {
    return {
        globalState: useGlobalStore(),
        userProfile: useUserProfileStore(),
        usePlayer: usePlayerStore(),
        useSideSongList: useSideSongListStore()
    }
}