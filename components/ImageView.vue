<template>
	<div
		class="image-viewer"
		@mousemove="mouseMove"
		@mousedown.capture="lock"
		@mouseup="unlock"
		@wheel="zoom"
		ref="imageViewer"
	>
		<div
			class="content"
			ref="container"
		>
			<slot></slot>
		</div>
		<Toast
			v-if="scale > 100"
			:text="toastText"
		></Toast>
	</div>
</template>

<script setup>
	import { usePointerLock, useMouseInElement, useMouse } from '@vueuse/core';
	const props = defineProps({
		maxScale: {
			type: Number,
			default: 5,
		},
		toastText: {
			type: String,
			default: '화면을 누른 채로 움직일 수 있습니다.',
		},
	});

	const imageViewer = ref(null);
	const container = ref(null);
	let scale = ref(100);
	const scaleLevel = 10;
	let origin = reactive({ x: 0, y: 0 });
	const { lock, unlock, element } = usePointerLock();
	const { elementX, elementY } = useMouseInElement(imageViewer);
	const { x, y } = useMouse({ type: 'movement' });

	const mouseMove = () => {
		if (container.value.style.transform.includes('scale(1)')) return;
		if (element.value) {
			if (0 <= origin.x - x.value && origin.x - x.value <= element.value.clientWidth) {
				origin.x -= x.value;
			}
			if (0 <= origin.y - y.value && origin.y - y.value <= element.value.clientHeight) {
				origin.y -= y.value;
			}
			container.value.style.transformOrigin = `${origin.x}px ${origin.y}px`;
		}
	};

	const zoom = evt => {
		evt.preventDefault();
		if (evt.deltaY === -100 && props.maxScale * 100 >= scale.value + scaleLevel) {
			if (100 + scaleLevel > scale.value) {
				origin.x = elementX.value;
				origin.y = elementY.value;
			}
			scale.value += scaleLevel;
		} else if (evt.deltaY === 100 && scale.value - scaleLevel >= 100) {
			scale.value -= scaleLevel;
		}

		container.value.style.transform = `scale(${(scale.value / 100).toFixed(2)})`;
		container.value.style.transformOrigin = `${origin.x}px ${origin.y}px`;
	};
</script>

<style lang="scss" scoped>
	.image-viewer {
		overflow: hidden;
	}
</style>
