<template>
    <Album v-if="idx === 1"></Album>
    <Singer v-if="idx === 2"></Singer>
    <Video v-if="idx === 3"></Video>
</template>

<script lang="ts" setup>
import Album from "./Album.vue"
import Singer from "./Singer.vue"
import Video from "./Video.vue"
import { useRoute } from "vue-router"
const idx = computed(() => {
    return Number(useRoute().params.index)
})
</script>
<style lang="scss" scoped>
.title {
    padding: 25px 30px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;

    }
}
</style>
