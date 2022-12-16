import useGlobalState from "./globalState";
import useUserProfile from "./user";

export default function useStore() {
    return {
        globalState: useGlobalState(),
        userProfile: useUserProfile()
    }
}