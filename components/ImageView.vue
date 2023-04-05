<template>
	<div
		class="image-viewer"
		@mouseover="isOver = true"
		@mouseout="isOver = false"
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
	</div>
</template>

<script setup>
	import { usePointerLock, useMouseInElement, useMouse } from '@vueuse/core';
	const props = defineProps({
		maxScale: {
			type: Number,
			default: 5,
		},
	});

	const imageViewer = ref(null);
	const container = ref(null);
	let isOver = ref(false);
	let scale = ref(100);
	const scaleLevel = 10;
	let position = reactive({ x: 0, y: 0 });
	const { lock, unlock, element } = usePointerLock();
	const { elementX, elementY } = useMouseInElement(imageViewer);
	const { x, y } = useMouse({ type: 'movement' });

	const mouseMove = () => {
		if (element.value) {
			if (0 <= position.x - x.value && position.x - x.value <= element.value.clientWidth) {
				position.x -= x.value;
			}
			if (0 <= position.y - y.value && position.y - y.value <= element.value.clientHeight) {
				position.y -= y.value;
			}
			container.value.style.transformOrigin = `${position.x}px ${position.y}px`;
		}
	};

	const zoom = evt => {
		evt.preventDefault();
		if (isOver.value) {
			position.x = elementX.value;
			position.y = elementY.value;
			// position.x = evt.pageX - imageViewer.value.offsetLeft;
			// position.y = evt.pageY - imageViewer.value.offsetTop;
			if (evt.deltaY === -100) {
				if (props.maxScale * 100 >= scale.value + scaleLevel) {
					scale.value += scaleLevel;
				}
			} else {
				if (scale.value - scaleLevel >= 100) {
					scale.value -= scaleLevel;
				}
			}
			container.value.style.transform = `scale(${(scale.value / 100).toFixed(2)})`;
			container.value.style.transformOrigin = `${position.x}px ${position.y}px`;
		}
	};
</script>

<style lang="scss" scoped>
	.image-viewer {
		overflow: hidden;
	}
</style>
