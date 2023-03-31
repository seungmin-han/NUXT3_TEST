<template>
    <div class="container">
        <h1>Index</h1>
        <div id="heading">
            hi
        </div>
        <div id="content">
            <div id="box">content</div>
        </div>
    </div>
</template>

<script setup>
    import gsap from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    gsap.registerPlugin(ScrollTrigger);
    onMounted(() => {
        // gsap.to('#box', {
        //     scrollTrigger: {
        //         trigger: '#box',
        //         markers: true,
        //         toggleActions: 'restart reverse',
        //         start: 'top center',
        //         end: '+100',
        //         scrub: true,
        //     },
        //     x: 400,
        // })    
		gsap.fromTo(
            "#heading",
            {
                opacity: 0,
                // y: "-100%",
            },
            {
                duration: 1.5,
                opacity: 1,
                y: 0,
            }
        ); 
    })
</script>

<style scoped lang="scss">
    #heading {
        background-color: #000;
        color: #fff;
        padding: 30px;
    }

    #content {
        height: 2000px;
        position: relative;

        #box {
            position: absolute;
            top: 1000px;
            width: 100px;
            height: 100px;
            background-color: red;
        }
    }
</style>