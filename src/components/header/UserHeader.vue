<template>
    <div class="personal-center-wrapper mb-30">
        <div class="head-info d-flex">
            <div class="info-left mr-30">
                <!-- <img src="" alt=""> -->
            </div>
            <div class="info-right">
                <div class="base-info mb-15 pb-9">
                    <div class="person-name fs-9 mb-5" style="font-weight: bold;">实名举报你可爱过度</div>
                    <div class="person-level d-flex jc-between ai-center">
                        <div class="left d-flex ai-center">
                            <div class="vip-level mr-6"></div>
                            <div class="account-level fs-1 mr-6">Lv10</div>
                            <div class="sex"></div>
                            <div class="sex"></div>
                        </div>
                        <div class="right d-flex">
                            <div class="edit-info d-flex ai-center fs-3">
                                <i class="iconfont icon-bianji fs-9"></i>
                                <span class="text-black_3">编辑个人信息</span>
                            </div>
                            <div class="focus d-flex ai-center pl-6 fs-3">
                                <i class="iconfont icon-jia text-primary_red_1 fs-9 mr-4"></i>
                                <span class="text-black_3">关注</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-about">
                    <div class="count d-flex mb-4">
                        <div class="dynamic d-flex flex-column ai-center mr-30" @click="goDynamic">
                            <div class="fs-9">26</div>
                            <div class="text-66 fs-2">动态</div>
                        </div>
                        <!-- <div>丨</div> -->
                        <div class="focus-count d-flex flex-column ai-center mr-30 ml-30" @click="goFocus">
                            <div class="fs-9">0</div>
                            <div class="text-66 fs-2">关注</div>
                        </div>
                        <!-- <div>丨</div> -->
                        <div class="fans-count d-flex flex-column ai-center ml-30" @click="goFans">
                            <div class="fs-9">66</div>
                            <div class="text-66 fs-2">粉丝</div>
                        </div>
                    </div>
                    <div class="address fs-2">
                        <div class="area d-flex ai-center mb-4">
                            <span>所在地区：</span>
                            <span class="text-66">四川省 成都市</span>
                        </div>
                        <div class="social d-flex ai-center mb-4">
                            <span>社交网络：</span>
                            <span>
                                <i class="iconfont icon-weibo"></i>
                                <i class="iconfont icon-QQ"></i>
                                <i class="iconfont icon-weixinbg"></i>
                            </span>
                        </div>
                        <div class="introduce d-flex ai-center">
                            <span>个人介绍：</span>
                            <span class="text-66">四川省 成都市</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const goFocus = () => {
    router.push("/focus?focusName=实名举报你可爱过度")
}
const goFans = () => {
    router.push("/fans?fansName=实名举报你可爱过度")
}
const goDynamic = () => {
    router.push("/dynamic?dynamicName=实名举报你可爱过度")
}
</script>
<style lang="scss" scoped>
.personal-center-wrapper {
    .head-info {
        .info-left {
            @include radius(200px);
            background-color: aqua;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info-right {
            flex: 1;

            .base-info {
                border-bottom: 1px solid #eee;

                .person-level {
                    .left {
                        .vip-level {
                            width: 40px;
                            // height: 16px;
                            height: 18px;
                            border-radius: 10px;
                            padding: 1px 6px;
                            background-color: aqua;
                        }

                        .account-level {
                            // height: 16px;
                            border-radius: 10px;
                            background-color: #f0f0f0;
                            padding: 1px 6px;
                        }

                        .sex {
                            @include radius(16px);
                            background-color: #f9d0e7;
                        }
                    }

                    .right {
                        .edit-info {
                            border: 1px solid #ccc;
                            border-radius: 15px;
                            padding: 0 10px;
                        }

                        .focus {
                            width: 75px;
                            height: 32px;
                            border-radius: 20px;
                            border: 1px solid #ccc;
                        }

                        .edit-info:hover,
                        .focus:hover {
                            background-color: rgba($color: #000000, $alpha: 0.1);
                            cursor: pointer;
                        }
                    }
                }
            }

            .account-about .count {

                .dynamic,
                .focus-count {
                    position: relative;

                    &::after {
                        content: "丨";
                        display: block;
                        position: absolute;
                        right: -52px;
                        font-size: 45px;
                        font-weight: 100;
                        color: #eee;
                        bottom: -10px;
                    }
                }
            }
        }
    }
}
</style>
