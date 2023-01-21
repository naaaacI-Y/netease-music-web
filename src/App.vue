<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>

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

*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

*::-webkit-scrollbar-thumb {
  /*滚动条里面深色条*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px var(--theme-scrollbar);
  background: var(--theme-scrollbar);
}

*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px var(--theme-white);
  border-radius: 10px;
  background: var(--theme-white);
}
</style>
