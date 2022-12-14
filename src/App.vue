<template>
  <router-view></router-view>
  <Login></Login>
</template>

<script lang="ts" setup>
import Login from '@/components/global/Login.vue';
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
