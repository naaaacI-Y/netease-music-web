<template>
    <div class="wrapper d-flex">
        <div class="left mr-30">
            <!-- <img src="" alt=""> -->
        </div>
        <div class="right">
            <div class="info d-flex ai-center mb-20">
                <div class="song-list-type mr-10 fs-1 text-primary_red_4">歌单</div>
                <div class="name fs-9 text-00" style="font-weight:bold">熬夜和想你，我都该戒掉了</div>
            </div>
            <div class="creator-info d-flex ai-center mb-20">
                <div class="creator-avatar mr-7">
                    <!-- <img src="" alt=""> -->
                </div>
                <div class="creator-name fs-2 text-shadow_blue mr-6">
                    创作者名称
                </div>
                <div class="creator-time fs-2 text-99">
                    2018-03-30创建
                </div>
            </div>
            <div class="operate d-flex text-33 mb-8">
                <div class="play-all fs-3 d-flex ai-center text-white mr-10">
                    <i class="iconfont icon-bofang_o  fs-9"></i>
                    播放全部
                </div>
                <div class="collect-count mr-15 fs-3 d-flex ai-center">
                    <i class="iconfont icon-xinjianwenjianjia fs-7 mr-3"></i>
                    <span>收藏</span>
                    <span>(1111)</span>
                </div>
                <div class="share mr-15 fs-3 d-flex ai-center">
                    <i class="iconfont icon-fenxiang2 mr-3"></i>
                    <span>分享</span>
                    <span>(1111)</span>
                </div>
                <div class="download-all fs-3 d-flex ai-center">
                    <i class="iconfont icon-xiazai mr-3 fs-6"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="other-info">
                <div class="other-info-label mb-3">
                    <span class="fs-2 text-33">标&emsp;签：</span>
                    <span class="label-name fs-2 text-shadow_blue mr-3">华语</span>
                    <span class="fs-2 mr-3">/</span>
                    <span class="label-name fs-2 text-shadow_blue">流行</span>
                </div>
                <div class="song-about d-flex fs-2 mb-3">
                    <div class="song-count mr-11">
                        <span class="text-33">歌曲数：</span>
                        <span class="text-99">123</span>
                    </div>
                    <div class="play-count fs-2">
                        <span class="text-33">播放数：</span>
                        <span class="text-99">4000万</span>
                    </div>
                </div>
                <div class="summary fs-2">
                    <span class="text-33">简&emsp;介：</span>
                    <span
                        class="text-99">命运似乎是一个轮回，在一次次的偶然下，平行线交叉，再平行，故事始终有"然后"，可后来的我们，都学会如何去爱了吗？如果当时你没走，后来的我们会不会不一样。或许，我们每个人都想回到故事最开始的地方。封面：周冬雨By：朩朩青尘</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 歌单
// 歌手
</script>
<style lang="scss" scoped>
.wrapper {
    .left {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        background-color: aqua;
        overflow: hidden;
    }

    .right {
        .info {
            .song-list-type {
                padding: 2px 6px;
                border: 1px solid #d33b31;
                border-radius: 4px;
            }
        }

        .creator-info {
            .creator-avatar {
                @include radius(50px);
                background-color: #d33b31;
            }
        }

        .operate {

            .share,
            .download-all,
            .collect-count {
                padding: 4px 12px;
                border: 1px solid #e5e5e5;
                border-radius: 18px;

                &:hover {
                    background-color: #f2f2f2;
                    cursor: pointer;
                }
            }

            .play-all {
                background-color: rgba($color: #d33b31, $alpha: 0.9);
                padding: 4px 12px;
                border-radius: 18px;
            }
        }
    }
}
</style>
