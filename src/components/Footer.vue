<template>
    <div class="footer-wrapper">
        <div class="progressBar">
            <vue-slider v-model="progress" :min="0" :max="100" :interval="1" :drag-on-click="true" :duration="0"
                :dot-size="12" :height="2" tooltip='none' :lazy="true" :silent="true"></vue-slider>
        </div>
        <div class="footer-content d-flex ai-center">
            <div class="left d-flex">
                <div class="img mr-10"></div>
                <div class="song-info d-flex flex-column jc-center">
                    <div class="name">
                        <span class="fs-3">歌曲名称</span>
                        <span class="fs-1 text-black_6"> - 作者</span>
                    </div>
                    <div class="time d-flex ai-center fs-1 text-black_6">
                        <div class="start mr-4">01:05</div>
                        <div class="mr-4">/</div>
                        <div class="total">04:55</div>
                    </div>
                </div>
            </div>
            <div class="middle d-flex ai-center">
                <i class="iconfont icon-24gl-heart fs-9 text-4b mr-30"></i>
                <i class="iconfont icon-diyiyeshouyeshangyishou text-primary_red_1 fs-10 mr-25"></i>
                <i class="iconfont icon-zanting2x text-primary_red_1  mr-25" style="font-size: 40px;"></i>
                <i class="iconfont icon-zuihouyiyemoyexiayishou text-primary_red_1 fs-10 mr-30"></i>
                <i class="iconfont icon-24gl-trash2 text-4b fs-6"></i>
                <!-- <i class="iconfont icon-fenxiang1 text-black_1"></i> -->
            </div>
            <div class="right text-4b d-flex ai-center mr-15">
                <i class="iconfont icon-24gl-repeatOnce2 text-4b mr-15 fs-7"></i>
                <i class="iconfont icon-24gl-indent text-4b mr-15 fs-5"></i>
                <i class="iconfont icon-24gl-repeat2 text-4b mr-15 fs-7"></i>
                <i class="iconfont icon-24gl-playlist text-4b mr-15 fs-5"></i>
                <i class="iconfont icon-24gl-volumeZero text-4b mr-10 fs-7"></i>
                <i class="iconfont icon-24gl-volumeDisable fs-7"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueSlider from 'vue-slider-component'
import "@/assets/slider.css";
const progress = ref(20)
</script>
<style lang="scss" scoped>
.footer-wrapper {
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;

    .progressBar {
        height: 2px;
        // background-color: #d33b31;
    }

    .footer-content {
        height: 100%;
        padding: 0 10px;

        .left {
            .img {
                width: 40px;
                height: 40px;
                border-radius: 5px;
                background-color: #d33b31;
            }
        }

        .middle {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .right {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
