<template>
    <div class="personal-fm-music-wrapper d-flex">
        <div class="music-left d-flex flex-column jc-center ai-center">
            <div class="img-wrap">

            </div>
            <div class="operate-wrap d-flex ai-center">
                <div class="collect">
                    <i class="iconfont icon-aixin fs-9"></i>
                </div>
                <div class="delete">
                    <i class="iconfont icon-delete fs-9"></i>
                </div>
                <div class="next">
                    <i class="iconfont icon-zuihouyiyemoyexiayishou1 fs-10"></i>
                </div>
                <div class="other">
                    <i class="iconfont icon-qita fs-9"></i>
                </div>
            </div>
        </div>
        <div class="music-right">
            <div class="music-name d-flex mb-15 ai-center">
                <div class="fs-7 mr-10">歌曲名称</div>
                <div class="mv fs-2">MV</div>
            </div>
            <div class="other-info d-flex fs-2 text-66 ai-center mb-30">
                <div class="album mr-30">
                    <span>专辑：</span>
                    <span class="text-shadow_blue">专辑专辑</span>
                </div>
                <div class="singer">
                    <span>歌手：</span>
                    <span class="text-shadow_blue">歌手名</span>
                </div>
            </div>
            <div class="lyric">222</div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.personal-fm-music-wrapper {
    height: 450px;

    .music-left {
        width: 310px;
        margin-right: 50px;
        // border: 1px solid black;

        .img-wrap {
            height: 272px;
            width: 310px;
            border: 1px solid red;
            margin-bottom: 50px;
        }

        .operate-wrap {
            div {
                @include radius(40px);
                margin-right: 40px;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    color: #313131;
                }

                &:hover {
                    background-color: #ebebeb;
                    cursor: pointer;
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }

    }

    .music-right {
        width: calc(100% - 360px);
        height: 100%;

        // border: 1px solid black;
        .mv {
            width: 30px;
            height: 20px;
            border: 1px solid #c44c3f;
            border-radius: 3px;
            text-align: center;
            line-height: 20px;
            color: #c44c3f;
        }

        .lyric {
            width: 320px;
            height: 355px;
            border-right: 1px solid #f2f2f2;
        }
    }
}
</style>
