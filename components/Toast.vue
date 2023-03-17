<template>
    <div class="toast_wrap">
        {{ props.text }} <span v-if="props.color" :style="`background-color:${props.color.backgroundColor}; color:${props.color.fontColor}`">{{ props.color.backgroundColor }}</span>
    </div>
</template>

<script setup>
const props = defineProps(['text', 'color']);
const emit = defineEmits(['close']);
    onMounted(() => {
        setTimeout(() => {
            emit('close');
        }, 3000);    
    })
</script>

<style lang="scss" scoped>
    .toast_wrap {
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