//login.ts
import http from '@/service/http'
import * as T from './types'

// // 登陆之后的用户信息
// // {
// //     data:{
// //       account:{
// //         anonimousUser: false
// //         ban: 0
// //         baoyueVersion: -2
// //         createTime: 1450346002062
// //         donateVersion: 0
// //         id: 112573435
// //         paidFee: false
// //         status: 0
// //         tokenVersion: 3
// //         type: 1
// //         userName: "1_********381"
// //         vipType: 0
// //         whitelistAuthority: 0
// //       },
// //       code:200,
// //       profile:{
// //         accountStatus: 0
// //         accountType: 1
// //         anchor: false
// //         authStatus: 0
// //         authenticated: false
// //         authenticationTypes: 0
// //         authority: 0
// //         avatarDetail: null
// //         avatarImgId: 109951166380171400
// //         avatarUrl: "http://p2.music.126.net/F4CRLku95eszrSl34Wa9Ug==/109951166380171386.jpg"
// //         backgroundImgId: 3241360282584965
// //         backgroundUrl: "http://p1.music.126.net/27ISGsrwRU7X71FwFMqYBA==/3241360282584965.jpg"
// //         birthday: -631180800000
// //         city: 1000100
// //         createTime: 1450346054184
// //         defaultAvatar: false
// //         description: null
// //         detailDescription: null
// //         djStatus: 0
// //         expertTags: null
// //         experts: null
// //         followed: false
// //         gender: 0
// //         lastLoginIP: "240e:45a:494:aeff:6570:1a26:7683:7785"
// //         lastLoginTime: 1650242074077
// //         locationStatus: 30
// //         mutual: false
// //         nickname: "naaaAci_Y"
// //         province: 1000000
// //         remarkName: null
// //         shortUserName: "********381"
// //         signature: ""
// //         userId: 112573435
// //         userName: "1_********381"
// //         userType: 0
// //         vipType: 0
// //         viptypeVersion: 1644165282752
// //       }
// //     }
// //   }

/**
 * 获取二维码key
 */
export function getQrcodeKey() {
  const timeStamp = new Date().getTime();
  return http.get<T.getQrcodeKeyResult>(`/login/qr/key?timestamp=${timeStamp}`);
}

/**
 * @param {*} key 获取二维码的key
 * @returns
 */
export function getQrImg(key: string) {
  const timeStamp = new Date().getTime();
  return http.get<T.getQrImgResult>(
    `/login/qr/create?key=${key}&timeStamp=${timeStamp}&qrimg=1`
  );
}

/**
 * @param {*} key
 * @returns 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
 */
export function getQrcodeStatus(key: string) {
  const timeStamp = new Date().getTime();
  return http.get<T.getQrcodeStatusResult>(
    `/login/qr/check?key=${key}&timeStamp=${timeStamp}`
  );
}

/**
 * 獲取登錄狀態
 * @returns
 */
export function checkLoginStatus() {
  return http.get<T.checkLoginStatusResult>("/login/status");
}