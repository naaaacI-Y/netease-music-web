<template>
    <DefaultLayout>
        <div class="personal d-flex ai-center">
            <MusicPlay play-type="personal"></MusicPlay>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import MusicPlay from '@/components/music/MusicPlay.vue';
</script>
<style lang="scss" scoped>
.personal {
    padding-top: 35px;
}
</style>
