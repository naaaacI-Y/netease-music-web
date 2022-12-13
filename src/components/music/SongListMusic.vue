<template>
    <div class="song-list-music-wrapper d-flex">
        <div class="music-left d-flex flex-column jc-end ai-center">
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
                    <i class="iconfont icon-xinjianwenjianjia fs-9"></i>
                </div>
                <div class="other">
                    <i class="iconfont icon-fenxiang fs-9"></i>
                </div>
            </div>
        </div>
        <div class="music-right">
            <div class="music-name d-flex mb-10 ai-center">
                <div class="fs-9 mr-10">歌曲名称</div>
                <div class="mv fs-2">MV</div>
            </div>
            <div class="other-info d-flex fs-2 text-66 ai-center mb-20">
                <div class="album  flex-1">
                    <span>专辑：</span>
                    <span class="text-shadow_blue">专辑专辑专辑专辑专辑专辑专辑专辑专辑专辑</span>
                </div>
                <div class="singer flex-1">
                    <span>歌手：</span>
                    <span class="text-shadow_blue">专辑专辑专辑专辑专辑专辑专辑专辑专辑专辑</span>
                </div>
                <div class="from flex-1">
                    <span>来源：</span>
                    <span class="text-shadow_blue">来源来源来源来源来源来源来源来源</span>
                </div>
            </div>
            <div class="lyric">222</div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.song-list-music-wrapper {
    height: 450px;

    .music-left {
        width: 335px;
        margin-right: 75px;
        // border: 1px solid black;

        .img-wrap {
            height: 335px;
            width: 100%;
            border: 1px solid red;
            margin-bottom: 20px;
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
        width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;

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
            width: 378px;
            flex: 1;
            // height: 355px;
            border-right: 1px solid #f2f2f2;
        }

        .other-info {
            div {
                width: 33.33333%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
