<template>
	<div
		class="modal-container"
		ref="el"
		:style="style"
	>
		<div class="modal-header">
			<button @click="closeModal">x</button>
		</div>
		<div class="modal-body">
			<ImageView>
				<img
					:src="image.url"
					alt=""
				/>
			</ImageView>
		</div>
	</div>
</template>

<script setup>
	import { useDraggable } from '@vueuse/core';
	import { useModalStore } from '@/stores/modal';

	const { image } = defineProps(['image']);
	const store = useModalStore();
	const el = ref(null);
	const { x, y, style } = useDraggable(el, { initialValue: { x: image.x, y: image.y } });
	const idx = store.modals.findIndex(v => v.fileName == image.fileName);

	watch([x, y], ([x, y]) => {
		store.modals[idx] = { ...store.modals[idx], x, y };
	});

	onMounted(() => {
		el.value.style.transform = `translate(-${el.value.clientWidth / 2}px, -${el.value.clientHeight / 2}px)`;
	});

	const closeModal = () => {
		store.modals.splice(idx, 1);
	};
</script>

<style lang="scss" scoped>
	.modal-container {
		z-index: 300;
		position: fixed;
		min-width: 300px;
		min-height: 500px;
		background-color: #fff;
		box-shadow: 0 0 15px 0;

		.modal-header {
			display: flex;
			button {
				padding: 5px 10px;
				margin-left: auto;
				margin-right: 0;
				background: none;
				background-color: crimson;
				color: #fff;
				border: none;
			}
		}

		img {
			max-height: 80vh;
		}
	}
</style>
