import Player from "@/utils/Player";
import useGlobalState from "./globalState";
import usePlayerState from "./player";
import useUserProfile from "./user";



export default function useStore() {
    return {
        globalState: useGlobalState(),
        userProfile: useUserProfile(),
        usePlayer: usePlayerState()
    }
}