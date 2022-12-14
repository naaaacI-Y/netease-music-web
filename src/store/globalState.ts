import { defineStore } from "pinia"

const useGlobalState = defineStore("globalState", {
    state: () => {
        return {
            isShowLoginBox: false
        }
    },
    getters: {

    },
    actions: {

    },
    persist: true
})
export default useGlobalState