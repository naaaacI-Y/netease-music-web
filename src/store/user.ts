import { profile } from "@/service/api/login/types"
import { defineStore } from "pinia"

const useUserProfile = defineStore("user", {
    state: () => {
        return {
            userFile: {} as profile
        }
    },
    getters: {

    },
    actions: {
        clearUserInfo() {
            this.userFile = {} as profile
        },
        setUserProfile(profile: profile) {
            this.userFile = profile
        }
    },
    persist: true
})
export default useUserProfile