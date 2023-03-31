<template>
    <div class="toast_wrap">
        {{ props.text }} <span v-if="props.color" :style="`background-color:${props.color.backgroundColor}; color:${props.color.fontColor}`">{{ props.color.backgroundColor }}</span>
    </div>
</template>

<script setup>
    import gsap from 'gsap';
    const props = defineProps(['text', 'color']);
    const emit = defineEmits(['close']);
    onMounted(() => {
        gsap.fromTo(
            ".toast_wrap",
            {
                opacity: 0,
                y: "50%",
            },
            {
                duration: 0.5,
                opacity: 1,
                y: 0,
            }
        ); 
        setTimeout(() => {
            emit('close');
        }, 3000);    
    })
</script>

<style lang="scss" scoped>
    .toast_wrap {
        z-index: 300;
        background-color: rgba($color: #333, $alpha: 0.6);
        color: #fff;
        font-weight: bold;
        line-height: 30px;
        padding: 10px;
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);

        span {
            display: inline-block;
            padding: 5px;
        }
    }
</style>