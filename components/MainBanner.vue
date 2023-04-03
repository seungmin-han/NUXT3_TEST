<template>
    <Flicking 
        class="main_banner"
        :plugins="plugins"
        :options="{
            defaultIndex: 0,
            circular: true, 
            align:'center', 
            pagePerView: 3,
        }" 
        :hide-before-init="true"
        >
        <div class="pannel pannel1">1</div>
        <div class="pannel pannel2">2</div>
        <div class="pannel pannel3">3</div>
        <div class="pannel pannel4">4</div>
        <div class="pannel pannel5">5</div>
        <template #viewport>
            <div class="flicking-pagination"></div>
        </template>
    </Flicking>
</template>

<script setup>
    import { Perspective, Pagination } from "@egjs/flicking-plugins";
    import Flicking from '@egjs/vue3-flicking';
    const plugins= [new Perspective({ rotate: 0.4 }), new Pagination({ type: 'bullet' })]
</script>

<style lang="scss" scoped>
    .main_banner {
        margin-top: 50px;
        .pannel {
            width: 33%;
            height: 700px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            &1{
                background-color: #666;
            }
            &2{
                background-color: #555;
            }
            &3{
                background-color: #444;
            }
            &4{
                background-color: #333;
            }
            &5{
                background-color: #222;
            }
        }
    }
</style>