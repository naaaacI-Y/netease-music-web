<template>
    <div class="registryWrapper">

        <div class="accountRegistry">
            <div class="logo">
                <i class="iconfont icon-wangyiyunyinle1"></i>
            </div>
            <div class="iptBox">
                <div class="account">
                    <div class="area">
                        <i class="iconfont icon-shouji"></i>
                        +86
                        <!-- <i class="iconfont icon-xiangxia xiala"></i> -->
                    </div>
                    <div class="content">
                        <input type="number" placeholder="请输入手机号" v-model="phone">
                    </div>
                </div>
                <div class="pwd">
                    <i class="iconfont icon-mima" style="font-size:18px"></i>
                    <input type="password" placeholder="设置登录密码" v-model="password">
                </div>
            </div>
            <div class="tip">
                密码8-20位，至少包含字母/数字/字符2种组合
            </div>
            <div class="registryBtn">注 册</div>
            <!-- <div class="divide">其他注册方式</div>
            <div class="otherWay">
                <div>
                    <i class="iconfont icon-weixinbg" style="color:#49de6c;font-size:30px"></i>
                    微信
                </div>
                <div>
                    <i class="iconfont icon-QQ" style="color:#2291ff;font-size:28px"></i>
                    QQ
                </div>
                <div>
                    <i class="iconfont icon-weibo" style="color:#ed462f;font-size:28px"></i>
                    新浪微博
                </div>
                <div>
                    <i class="iconfont icon-wangyi" style="color:#ed462f;font-size:28px"></i>
                    网易邮箱
                </div>
            </div> -->
            <div class="backLogin" @click="goBack">
                &lt; 返回登录 </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phone = ref("")
const password = ref("")
const emits = defineEmits<{
    (e: "backToLogin"): void
}>()
const goBack = () => {
    emits("backToLogin")
}
</script>

<style lang="scss" scoped>
.registryWrapper {
    .accountRegistry {
        @include flex(column, flex-start, center);

        .logo {
            margin-top: 30px;
            margin-bottom: 50px;

            // text-align: center;
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

                    @include flex(row, flex-start, center);

                    i {
                        font-size: 20px;
                        color: #999;
                        margin-right: 10px;
                    }

                    .xiala {
                        color: #999;
                        font-size: 12px;
                        padding-top: 1px
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

        .registryBtn {
            width: 260px;
            height: 40px;
            color: white;
            background-color: #f63a3a;
            border-radius: 6px;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            margin-bottom: 40px;
        }

        .tip {
            margin-top: 10px;
            margin-bottom: 13px;
            color: #c4c4c4;
            font-size: 12px;
        }

        .registryBtn:hover {
            background-color: rgba($color: #f63a3a, $alpha: .6);
        }


        .divide {
            display: flex;
            align-items: center;
            font-size: 12px;
            width: 260px;
            padding: 0 2px;
            margin-bottom: 16px;
            color: #808080;
        }

        .divide::before,
        .divide::after {
            content: '';
            display: block;
            flex: 1;
            height: 1px;
            background: #dedfdf;
        }

        .divide::before {
            margin-right: 10px;
        }

        .divide::after {
            margin-left: 10px;
        }

        .otherWay {
            width: 260px;
            padding: 0 8px;
            color: #808080;
            @include flex(row, space-between, center);

            div {
                @include flex(column, center, center);
            }

            div:hover {
                cursor: pointer;
            }
        }

        .backLogin {
            color: #686868;
            margin-top: 25px;

            &:hover {
                cursor: pointer;
            }
        }
    }

}
</style>
