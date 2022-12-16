<template>
    <div class="login-mask">
        <div class="loginWrapper">

            <div class="head">
                <div class="closeWrapper" @click="closeDialog">
                    <i class="iconfont icon-guanbi close"></i>
                </div>
                <div class="acctountTipWrapper" v-if="status.isAccountLogin">
                    <div class="topRight" @click="checkScanLogin"></div>
                    <div class="tip">扫码登录更安全</div>
                </div>
            </div>
            <div class="scanLogin" v-if="status.isScanLogin">
                <div class="title">扫码登录</div>
                <div class="qrcodeImg" :style="{ backgroundImage: 'url(' + qrImg + ')' }" v-if="!status.isAuthing">
                    <div class="invilidate" v-if="status.overdue">
                        <div>二维码已失效</div>
                        <div class="refreshBtn" @click="getQrcodeImg">点击刷新</div>
                    </div>
                </div>
                <div class="authing" v-if="status.isAuthing">
                    <div>扫描成功</div>
                    <div>请在手机上确认登录</div>
                </div>
                <div class="des" v-if="!status.isAuthing">
                    <span>使用</span>
                    <span>网易云音乐app</span>
                    <span>扫码登录</span>
                </div>
                <div class="otherWay" @click="selectOtherLoginWay" v-if="!status.isAuthing">
                    选择其他登录模式 >
                </div>
            </div>
            <div class="accountLogin" v-if="status.isAccountLogin">
                <div class="logo">
                    <i class="iconfont icon-wangyiyunyinle1"></i>
                </div>
                <div class="iptBox">
                    <div class="account">
                        <div class="area">
                            <i class="iconfont icon-shouji"></i>
                            +86
                        </div>
                        <div class="content">
                            <input type="number" placeholder="请输入手机号" />
                        </div>
                    </div>
                    <div class="pwd">
                        <i class="iconfont icon-mima" style="font-size: 18px"></i>
                        <input type="password" placeholder="请输入密码" />
                        <!-- <div class="reset" style="color: #c4c4c4">重设密码</div> -->
                    </div>
                </div>
                <div class="loginBtn" @click="goLogin">登 录</div>
                <div class="registry" @click="goRegistry">注册</div>
                <!-- <div class="otherWay">
                    <div>
                        <i class="iconfont icon-weixinbg" style="color: #49de6c; font-size: 30px"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-QQ" style="color: #2291ff; font-size: 28px"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-weibo" style="color: #ed462f; font-size: 28px"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-wangyi" style="color: #ed462f; font-size: 28px"></i>
                    </div>
                </div> -->
                <div class="protocal">
                    <div class="checkbox" :class="status.isChecked ? 'checked' : ''"
                        @click="status.isChecked = !status.isChecked">
                        <i class="iconfont icon-gou-" style="color: white; font-size: 12px" v-if="status.isChecked"></i>
                    </div>
                    同意
                    <span>《服务条款》</span>
                    <span> 《隐私政策》 </span>
                    <!-- <span> 《儿童隐私政策》 </span> -->
                </div>
            </div>
            <registry v-if="status.isRegistry" @backToLogin='checkToAccountLogin'></registry>
            <div class="modal" v-if="status.isShowModal">
                请先勾选同意《服务条款》、《隐私政策》
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    getQrcodeKey,
    getQrImg,
    getQrcodeStatus,
    checkLoginStatus,
} from "@/service/api/login/login";
//   import useUsernfoStore from "@/store"

import Registry from './global/Registry.vue';
import { onUnmounted, reactive, ref, watch } from 'vue';
import useStore from "@/store"
const { globalState, userProfile } = useStore()
const time = ref<number>()
const status = reactive({
    overdue: true,
    isScanLogin: true,
    isAccountLogin: false,
    isRegistry: false,
    isChecked: false,
    isShowModal: false,
    isAuthing: false,
    showModalTimer: null,
})
watch(() => status.isShowModal, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            status.isShowModal = false
        }, 500)
    }
})
let qrImg = ref("");

const getQrcodeImg = async () => {
    status.overdue = false;
    status.isAuthing = false;
    try {
        const keyResult = await getQrcodeKey();
        const key = keyResult.data.unikey;
        // console.log("二维码key========", key);
        const img = await getQrImg(key);
        qrImg.value = img.data.qrimg;
        time.value = Number(setInterval(async () => {
            const result = await getQrcodeStatus(key);
            // console.log(result, "登录授权情况");
            switch (result.code) {
                case 800:
                    // 二维码不存在或已过期
                    status.isAuthing = false;
                    status.overdue = true;
                    break;
                case 802:
                    // 授权中
                    status.isAuthing = true;
                    status.overdue = false;
                    break;
                case 803:
                    //授权成功  查看登录状态
                    const statusResult = await checkLoginStatus();
                    userProfile.setUserProfile(statusResult.data.profile)
                    status.isAuthing = false;
                    // 窗口关闭
                    closeDialog()
                default:
                    break;
            }
        }, 4000));
    } catch (error) {
        console.log(error);
    }
};
const checkToAccountLogin = (): void => {
    status.isAccountLogin = true;
    status.isRegistry = false;
};
const checkScanLogin = (): void => {
    status.isScanLogin = true;
    status.isAccountLogin = !status.isScanLogin
    getQrcodeImg()
};
const selectOtherLoginWay = (): void => {
    status.isScanLogin = false;
    status.isAccountLogin = !status.isScanLogin;
};
const goLogin = () => {
    if (!status.isChecked) return status.isShowModal = true
}
const goRegistry = () => {
    // if(this.timer) return;
    // if(!status.isChecked) {
    //   status.isShowModal = true
    //   this.timer = setTimeout(() => {
    //     this.isShowModal = false
    //     clearTimeout(this.timer)
    //     this.timer = null
    //   }, 2000);
    //   return
    // }
    if (status.isShowModal) {
        status.isShowModal = false
    }
    status.isScanLogin = false
    status.isAccountLogin = false
    status.isRegistry = true
}
const closeDialog = () => {
    globalState.isShowLoginBox = false
    clearInterval(time.value)
    time.value = 0
}
getQrcodeImg();
onUnmounted(() => {
    closeDialog()
})
</script>

<style lang="scss" scoped>
.login-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.loginWrapper {
    padding: 10px;
    position: absolute;
    width: 350px;
    background-color: white;
    height: 530px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 4px #ccc;
    border-radius: 10px;

    .head {
        width: 100%;
        height: 40px;

        .closeWrapper {
            @include flex(row, flex-start, flex-start);
            width: 30px;
            height: 30px;

            &:hover {
                cursor: pointer;

                i {
                    color: #d33b31;
                }
            }
        }

        .acctountTipWrapper {
            position: relative;

            .topRight {
                position: absolute;
                top: -25px;
                right: 0px;
                // padding: 5px;
                // border: 1px solid red;
                width: 50px;
                height: 50px;
                background-image: url("../../assets/images/erweima.png");
                background-size: 100% 100%;

                &:hover {
                    cursor: pointer;
                }
            }

            .tip {
                position: absolute;
                width: 110px;
                background-color: #a3a3a3;
                // border-radius: 4px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                right: 45px;
                top: -12px;
                color: white;
                text-align: center;
                line-height: 28px;
                font-size: 14px;

                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    // width: 5px;
                    // height: 5px;
                    top: 0;
                    right: -6px;
                    // background-color: red;
                    width: 0;
                    height: 0;
                    border-top: 5px solid #a3a3a3;
                    border-right: 5px solid transparent;
                }
            }
        }
    }

    .scanLogin {
        margin-top: 28px;
        @include flex(column, center, center);

        .title {
            color: #333;
            font-size: 28px;
            margin-bottom: 35px;
        }

        .qrcodeImg {
            width: 180px;
            height: 180px;
            // border: 1px solid red;
            margin-bottom: 20px;
            background-size: 100% 100%;

            .invilidate {
                background-color: rgba($color: #000, $alpha: 0.7);
                width: 100%;
                height: 100%;
                @include flex(column, center, center);

                div:nth-child(1) {
                    color: white;
                    margin-bottom: 10px;
                    font-size: 14px;
                }

                .refreshBtn {
                    width: 80px;
                    height: 30px;
                    color: white;
                    font-size: 13px;
                    background-color: #d33b31;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 15px;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }

        .des {
            font-size: 14px;
            color: #555;

            span:nth-child(2) {
                color: #4892cf;
            }
        }

        .otherWay {
            margin-top: 90px;
            color: #858484;
            font-size: 13px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .accountLogin {
        @include flex(column, flex-start, center);

        .logo {
            margin-top: 30px;
            margin-bottom: 55px;

            i {
                color: #f63a3a;
                font-size: 60px;
            }
        }

        .iptBox {
            width: 260px;
            height: 80px;
            border: 1px solid #dfddde;
            border-radius: 8px;
            @include flex(column, flex-start, flex-start);

            .account {
                flex: 1;
                width: 100%;
                border-bottom: 1px solid #dfddde;
                @include flex(row, flex-start, center);

                .area {
                    width: 90px;
                    height: 100%;
                    border-right: 1px solid #dfddde;
                    padding: 0 5px;

                    @include flex(row, start, center);

                    i {
                        font-size: 20px;
                        color: #999;
                        margin-right: 10px;
                    }

                    .xiala {
                        color: #999;
                        font-size: 12px;
                        padding-top: 1px;
                    }
                }

                .content {
                    @include flex(row, flex-start, center);
                    padding: 0 5px;

                    input {
                        outline: none;
                        border: none;
                    }

                    input::placeholder {
                        color: #c4c4c4;
                        font-size: 12px;
                    }

                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                    }
                }
            }

            .pwd {
                padding: 0 8px;
                flex: 1;
                width: 100%;

                i {
                    color: #999;
                }

                @include flex(row, flex-start, center);

                input {
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: 5px;
                }

                input::placeholder {
                    color: #c4c4c4;
                    font-size: 12px;
                }
            }
        }

        .loginBtn {
            margin-top: 40px;
            width: 260px;
            height: 40px;
            color: white;
            background-color: #f63a3a;
            border-radius: 6px;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
        }

        .loginBtn:hover {
            background-color: rgba($color: #f63a3a, $alpha: 0.6);
        }

        .registry {
            margin-top: 14px;
            font-size: 14px;
            text-decoration: underline;

            &:hover {
                cursor: pointer;
            }
        }

        .otherWay {
            width: 260px;
            padding: 0 8px;
            margin-top: 20px;
            @include flex(row, space-between, center);

            div:hover {
                cursor: pointer;
            }
        }

        .protocal {
            margin-top: 45px;
            width: 260px;
            padding: 0 8px;
            color: #999;
            font-size: 13px;
            @include flex(row, flex-start, center);

            .checkbox {
                width: 10px;
                height: 10px;
                border-radius: 2px;
                border: 1px solid #999;
                @include flex(row, center, center);
                margin-right: 5px;
            }

            .checked {
                border: none;
                background-color: #d33b31;
            }

            span:first-of-type {
                // margin-left: 5px;
            }

            span {
                color: #7799c0;
                font-size: 10px;
                // margin-right: 1px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .modal {
        width: 270px;
        border-radius: 8px;
        height: 72px;
        background-color: rgba($color: #464646, $alpha: 0.7);
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        align-items: center;
        padding: 0 5px;
        display: flex;
        font-size: 13px;
        justify-content: center;
        transform: translate(-50%, -50%);
    }
}
</style>
