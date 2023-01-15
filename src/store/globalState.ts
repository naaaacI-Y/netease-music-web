import { defineStore } from "pinia"

const useGlobalStore = defineStore("globalState", {
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
export default useGlobalStore