<template>
    用户
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// const props = defineProps({
// })
// const emit = defineEmits(['change', 'delete'])
const count = ref(0)
const increment = () => {
    count.value++
}
</script>
<style lang="scss" scoped>

</style>
