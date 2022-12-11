<template>
    <div class="singer-header-wrapper d-flex">
        <div class="left mr-30">

        </div>
        <div class="right">
            <div class="singer-name mb-10 fs-9" style="font-weight: bold;">陈奕迅</div>
            <div class="alias mb-15 text-66 fs-2">别名</div>
            <div class="operate d-flex ai-center mb-20">
                <div class="collection d-flex ai-center jc-center mr-9">
                    <i class="iconfont icon-xinjianwenjianjia mr-3"></i>
                    <span class="fs-3 text-black_2">收藏</span>
                </div>
                <div class="homepage d-flex ai-center jc-center">
                    <i class="iconfont icon-iconfontyonghuming mr-3 fs-6"></i>
                    <span class="fs-3 text-black_2">个人主页</span>
                </div>
            </div>
            <div class="info d-flex ai-center">
                <div>
                    <span class="fs-3 text-black_2">单曲数：</span>
                    <span class="fs-2 text-66">1111</span>
                </div>
                <div>
                    <span class="fs-3 text-black_2">专辑数：</span>
                    <span class="fs-2 text-66">200</span>
                </div>
                <div>
                    <span class="fs-3 text-black_2">MV数：</span>
                    <span class="fs-2 text-66">111</span>
                </div>
                <div>
                    <span class="fs-3 text-black_2">演出数：</span>
                    <span class="fs-2 text-66">22</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.singer-header-wrapper {
    .left {
        width: 200px;
        height: 200px;
        background-color: aqua;
    }

    .right {
        .operate {

            .collection,
            .homepage {
                padding: 4px 12px;
                border-radius: 20px;
                border: 1px solid #ddd;

                &:hover {
                    background-color: rgba($color: #000000, $alpha: 0.1);
                    cursor: pointer;
                }
            }
        }

        .info {
            div {
                margin-right: 15px;

                span:nth-child(1) {
                    font-size: 14px;
                    color: #4e4e4e;
                }

                span:nth-child(2) {
                    font-size: 13px;
                    color: #666;
                }
            }
        }

    }
}
</style>
