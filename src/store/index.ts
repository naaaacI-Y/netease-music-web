
import useGlobalStore from "./globalStore";
// import usePlayerStore from "./playerStore";
import usePlayerStoreTest from "./playerStoreTest";
import useSideSongListStore from "./sideSongList";
import useUserProfileStore from "./user";



export default function useStore() {
    return {
        // useGlobal
        useGlobal: useGlobalStore(),
        userProfile: useUserProfileStore(),
        // usePlayer: usePlayerStore(),
        useSideSongList: useSideSongListStore(),
        usePlayerTest: usePlayerStoreTest()
    }
}