<template>
  <router-view></router-view>
  <Login v-if="isShowLoginBox"></Login>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import useGlobalState from "@/store/globalState"
import Login from '@/components/Login.vue';
const { isShowLoginBox } = storeToRefs(useGlobalState())
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
