
import useGlobalStore from "./globalStore";
import usePlayerStore from "./playerStore";
import useSideSongListStore from "./sideSongList";
import useThemeStore from "./theme";
import useUserProfileStore from "./user";



export default function useStore() {
    return {
        // useGlobal
        useGlobal: useGlobalStore(),
        useTheme: useThemeStore(),
        userProfile: useUserProfileStore(),
        // usePlayer: usePlayerStore(),
        useSideSongList: useSideSongListStore(),
        usePlayer: usePlayerStore()
    }
}