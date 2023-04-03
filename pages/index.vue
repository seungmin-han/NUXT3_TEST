<template>
    <div class="container">
        <MainBanner></MainBanner>
        <h1>Index</h1>
        <div id="content">
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
            ".main_banner",
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

        gsap.fromTo(
            ".box",
            {
                opacity: 0,
                // y: "-100%",
            },
            {
                duration: 1.5,
                opacity: 1,
            }
        ); 

        
    })
</script>

<style scoped lang="scss">

    #content {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-content: flex-start;
        flex-wrap: wrap;
    
    }
</style>