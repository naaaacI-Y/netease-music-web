import useGlobalState from "./globalState";

export default function useStore() {
    return {
        globalState: useGlobalState()
    }
}