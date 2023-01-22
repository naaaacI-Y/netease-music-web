import { debounce, throttle } from "@/utils"

export const useScroll = () => {
    // 监听列表滚动
    const handleListener = (el: HTMLElement, callback: Function, loaded: boolean, loading: boolean) => {
        const scrollTop = el.scrollTop
        const clientHeight = el.clientHeight
        const scrollHeight = el.scrollHeight
        if (scrollTop + clientHeight >= scrollHeight) {
            // 加载更多
            console.log("加载更多");
            console.log(loaded, loading);

            if (!loaded && !loading) {
                callback()
            }
        }
    }
    const handleFn = throttle(handleListener, 100)
    const listenListScroll = (scroller: HTMLElement, args: any[]) => {
        scroller?.addEventListener("scroll", handleFn.bind(null, ...[scroller, ...args]))
    }
    const removeListener = (scroller: HTMLElement, args: any[]) => {
        scroller?.removeEventListener("scroll", handleFn.bind(null, ...[scroller, ...args]))
    }
    return {
        listenListScroll,
        removeListener
    }
}