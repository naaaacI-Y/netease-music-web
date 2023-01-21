<template>
    <div class="slider-container" ref="slider" :style="sliderStyle" @mouseover="pause()" @mouseout="play()"
        v-if="bannerList.data.length">
        <div class="slider-content mask">
            <div class="slider" v-for="(item, index) in bannerList.data" :key="index" :class="setClass(index)"
                @click="onClick(index)" style="border-radius:10px;overflow:hidden">
                <img :src="item.imageUrl" alt="" style="width: 100%; height: 100%;" />
                <div class="icon" :class="item.typeTitle == '活动' ? 'objClass' : ''">{{ item.typeTitle }}</div>
            </div>
            <i class="iconfont icon-jiantou_liebiaoxiangzuo_o prev-icon" @click="prev()"></i>
            <i class="iconfont icon-jiantou_liebiaoxiangyou_o next-icon" @click="next()"></i>
        </div>
        <div class="dots">
            <span v-for="(item) in bannerList.data.length" :key="item" :style="setActiveDot(item - 1)"
                @mouseover="currentIndex = item - 1">
            </span>
        </div>
    </div>
</template>

<script  lang="ts" setup>
import { getHeadBanner } from '@/service/api/recommend';
import { Banner } from '@/service/api/recommend/types';
const props = withDefaults(defineProps<{
    color?: string,
    interval?: number,
    width?: number
    height?: number
    imgType?: string
}>(), {
    color: 'rgb(248, 85, 85)',
    interval: 4000,
    imgType: "percentage",
})
const emits = defineEmits<{
    (e: "sliderClick", index: number): void
}>()
const sliderStyle = computed(() => {
    return {
        width: props.width ? props.width : '100%',
        height: props.height ? (props.height + 20) + 'px' : '100%',
        perspective: 100 + 'px',
        backgroundSize:
            props.imgType == 'percentage' ? '100% 100%' : props.imgType,
    }
})
const sliderDomList = reactive({ data: [] as unknown as HTMLCollectionOf<Element> })
const currentIndex = ref(0)
const bannerList = reactive({ data: [] as Banner[] })
const timer = ref()
const getBanner = async () => {
    const r = await getHeadBanner()
    bannerList.data = r.banners
}
const setClass = (i: number) => {
    let next =
        currentIndex.value === bannerList.data.length - 1 ? 0 : currentIndex.value + 1
    let prev =
        currentIndex.value === 0 ? bannerList.data.length - 1 : currentIndex.value - 1
    switch (i) {
        case currentIndex.value:
            return 'active'
        case next:
            return 'next'
        case prev:
            return 'prev'
        default:
            return ''
    }
}
const setBGImg = (src: string) => {
    console.log(src, 'src====')
    return {
        backgroundImage: `require(${src})`,
    }
}
const setActiveDot = (index: number) => {
    return index === currentIndex.value
        ? {
            backgroundColor: props.color,
        }
        : {
            backgroundColor: '#ccc',
        }
}
const play = () => {
    pause()
    timer.value = setInterval(() => {
        next()
    }, props.interval)
}
const pause = () => {
    clearInterval(timer.value)
}
const next = () => {
    currentIndex.value = ++currentIndex.value % bannerList.data.length
}
const prev = () => {
    currentIndex.value =
        currentIndex.value === 0 ? bannerList.data.length - 1 : currentIndex.value - 1
}
const onClick = (i: number) => {
    if (i === currentIndex.value) {
        emits("sliderClick", i)
    } else {
        let currentClickClassName = sliderDomList.data[i].className.split(' ')[1]
        if (currentClickClassName === 'next') {
            next()
        } else {
            prev()
        }
    }
}
onMounted(() => {
    sliderDomList.data = document.getElementsByClassName("slider")
})

getBanner()
</script>

<style scoped lang="scss">
.slider-container {
    width: 100%;
    height: 100%;
    text-align: center;
    margin: auto;
    max-width: 1040px;
    position: relative;
    margin: 20px 0 30px;

    .slider-content {
        position: relative;
        width: 100%;
        height: calc(100% - 20px);
        left: 0%;
        top: 0%;
        margin: 0px;
        padding: 0px;
        background-size: inherit;

        .slider {
            position: absolute;
            margin: 0;
            padding: 0;
            top: 0;
            left: 50%;
            width: 540px;
            height: 100%;
            transition: 500ms all ease-in-out;
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center;
            background-size: inherit;
            transform: translate3d(-50%, 0, -80px);
            z-index: 1;

            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0);
                transition-delay: 100ms !important;
                transition: all 500ms;
                cursor: pointer;
            }

            .icon {
                padding: 4px 8px;
                background-color: #d33b31;
                border-top-left-radius: 8px;
                position: absolute;
                bottom: 0;
                right: 0;
                color: white;
                font-size: 12px;
            }

            .objClass {
                background-color: #4a79cc;
            }
        }

        .active {
            transform: translate3d(-50%, 0, 0);
            z-index: 20;
        }

        .prev {
            transform: translate3d(-96%, 13%, -100px);
            height: 80%;
            z-index: 19;

            &::before {
                background-color: rgba(0, 0, 0, 0.5);
            }
        }

        .next {
            transform: translate3d(-4%, 13%, -100px);
            z-index: 18;
            height: 80%;

            &::after {
                background-color: rgba(0, 0, 0, 0.5);
            }

            .icon {
                background-color: rgba($color: #d33b31, $alpha: 0.8);
                padding: 2px 6px;
            }
        }

        i {
            display: none;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 50px;
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            z-index: 21;
        }

        .prev-icon {
            left: -10px;
        }

        .next-icon {
            right: -10px;
        }

        &:hover i {
            color: rgba(255, 255, 255, 0.8);
            display: block;
        }


    }

    .dots {
        width: 100%;
        height: 20px;

        span {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin: 15px 5px;
            cursor: pointer;
            border-radius: 50%;
        }
    }
}
</style>
