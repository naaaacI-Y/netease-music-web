<template>
    <div class="comment-item-wrapper d-flex mb-20">
        <div class="commoent-left mr-15">
            <div class="comment-avatar">
                <!-- <img src="" alt=""> -->
                <div class="flag">
                    <!-- <img src="" alt=""> -->
                </div>
            </div>
        </div>
        <div class="commoent-right">
            <div class="right-top fs-3 mb-10">
                <span class="comment-name text-shadow_blue ">评论人：</span>
                <span
                    class="text-black_1">出狱2年，至今避免不了到处的歧视，两年圈子大变，他们不曾记得我过去的帮助或是大方，他们只会仰仗着他们眼前的成功摆出一副不可一世的样子嘲笑他人。从零开始真的非常煎熬，但是四季会交替，昼夜会更替，这是自然万物的法则，我相信每个人都会迎来自己的春天。</span>
            </div>
            <div class="right-middle fs-2 bg-black_11  mb-10" style="padding: 9px;">
                <span class="origin-reply text-shadow_blue">@原始评论人：</span>
                <span class="text-black_6">现在是2022年3月30日，我在去考研自习室的路上。未来的我一定可以顺利上岸！</span>
            </div>
            <div class="right-bottom text-black_13 fs-2 d-flex ai-center mb-20">
                <div class="comment-time flex-1">2020年5月12日 17:21</div>
                <div class="comment-reactive d-flex ai-center">
                    <div class="vote d-flex ai-center mr-6">
                        <i class="iconfont icon-dianzan1 mr-4"></i>
                        <span class="vote-count">3099</span>
                    </div>
                    <span class="text-black_7">丨</span>
                    <div class="share mr-6 ml-6">
                        <i class="iconfont icon-fenxiang2 fs-3"></i>
                    </div>
                    <span class="text-black_7">丨</span>
                    <div class="comment ml-6 mr-4">
                        <i class="iconfont icon-liuyan-duandian"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.comment-item-wrapper {
    width: 100%;

    .commoent-left {
        .comment-avatar {
            @include radius(35px);
            position: relative;
            background-color: aqua;

            img {
                width: 100%;
                height: 100%;
            }

            .flag {
                position: absolute;
                background-color: red;
                bottom: 0;
                right: -2px;
                @include radius(15px);
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .commoent-right {
        flex: 1;
        border-bottom: 1px solid #eee;
    }
}
</style>
