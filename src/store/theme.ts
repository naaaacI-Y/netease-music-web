import { defineStore } from "pinia"

const useThemeState = defineStore("theme", {
    state: () => {
        return {
            theme: "dark"
        }
    },
    actions: {
        changeThemem(payload: string) {
            this.theme = payload
        }
    },
    persist: true
})

export default useThemeState