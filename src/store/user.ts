import { profile } from "@/service/api/login/types"
import { UserDetailByIdResult } from "@/service/api/user/types"
import { defineStore } from "pinia"

const useUserProfileStore = defineStore("user", {
    state: () => {
        return {
            userFile: {} as UserDetailByIdResult
        }
    },
    getters: {

    },
    actions: {
        clearUserInfo() {
            this.userFile = {} as UserDetailByIdResult
        },
        setUserProfile(profile: UserDetailByIdResult) {
            this.userFile = profile
        }
    },
    persist: true
})
export default useUserProfileStore