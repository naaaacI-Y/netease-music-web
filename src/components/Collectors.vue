<template>
    <div class="collectors-wrapper">
        <div class="collectors d-flex flex-wrap jc-between mt-20">
            <div class="collectorItem d-flex ai-center mb-20" v-for="item in 20">
                <div class="avatar mr-10"></div>
                <div class="info">
                    <div class="name mb-10">
                        <span class="fs-3 text-black_2">姓名</span>
                        <span></span>
                    </div>
                    <div class="intrucduce fs-2 text-black_13">介绍介绍介绍介绍介绍介绍</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.collectors {
    .collectorItem {
        width: 370px;

        .avatar {
            @include radius(50px);
            background-color: #d33b31;

        }
    }
}
</style>
