<template>
    <DefaultLayout>
        <div class="personal d-flex ai-center">
            <MusicCommon play-type="personal"></MusicCommon>
        </div>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import MusicCommon from '@/components/music/MusicCommon.vue';
</script>
<style lang="scss" scoped>
.personal {
    padding-top: 35px;
}
</style>
