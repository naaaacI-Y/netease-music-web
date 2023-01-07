export interface ILoginParams {
  userName: string
  passWord: string | number
}

export interface getQrCodeStatusParams {
  key: string;
}

export interface getQrcodeKeyResult {
  code: number;
  data: {
    code: number
    unikey: string;
  }
  message?: string
}
export interface getQrImgResult {
  code: number
  data: {
    qrurl: string;
    qrimg: string;
  }

}

export interface getQrcodeStatusResult {
  cookie: string;
  nickname?: string;
  avatarUrl?: string;
  code: number;
  message: string;
}
export interface account {
  id: bigint;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
};
export interface profile {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: any;
  avatarUrl: string;
  backgroundImgId: any;
  backgroundUrl: string;
  signature: string;
  createTime: number;
  userName: number;
  accountType: number;
  shortUserName: string;
  birthday: bigint;
  authority: number;
  gender: number;
  accountStatus: number;
  province: number;
  city: number;
  authStatus: number;
  description: null;
  detailDescription: null | string;
  defaultAvatar: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName: null | string;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail: null | string;
  anchor: boolean;
}



export interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
}

export interface checkLoginStatusRet {
  code: number;
  account: Account;
  profile: profile;
}

export interface checkLoginStatusResult {
  data: checkLoginStatusRet;
}