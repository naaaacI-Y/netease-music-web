import { getUserDetailById, passengerLogin } from '@/service/api/user'
import useStore from '@/store'
import { setCookieExpireTime } from '@/utils'
import Cookies from 'js-cookie'
// 初始化个人信息
const initUser = async () => {
    console.log("initUserInfo");
    const { userProfile } = useStore()
    // 检查cookie是否存在或者是否过期
    const isExpire = checkCookie()
    if (isExpire) {
        return clearCookieInfo()
    }
    // 重新获取个人信息
    if (userProfile.userFile?.profile?.userId) {
        const r = await getUserDetailById({ uid: userProfile.userFile?.profile?.userId })
        userProfile.setUserProfile(r)
    }
}

export const clearCookieInfo = async () => {
    console.log("清理cookie以及游客登录");

    // const { userProfile, useSideSongList } = useStore()
    // 清空侧边栏歌单列表
    // useSideSongList.updateCreatedSongList([])
    // useSideSongList.updateCollectedSongList([])
    Cookies.remove("__csrf")
    // userProfile.clearUserInfo()
    // 游客登录
    const r = await passengerLogin()
    // 存储过期时间
    setCookieExpireTime(r.cookie)
}
// 获取cookie 检查是否过期
const checkCookie = () => {
    const _csrf = Cookies.get("__csrf")
    if (!_csrf) {
        // 没有登陆
        return true
    }
    const expireTiem = Number(localStorage.getItem("expireTime"))
    if (expireTiem > new Date().getTime()) {
        return false
    }
    return true
}
export default initUser

