<template>
	<div class="container">
		<h1>Colors</h1>
		<div class="wrapper">
			<div
				@mouseover="setScale($event, true)"
				@mouseleave="setScale($event, false)"
				@click="copyColor(color)"
				v-for="(color, index) in colorList"
				:key="color + index"
				:style="`background-color: ${color.backgroundColor};`"
			>
				<span :style="`color: ${color.fontColor};`">{{ color.backgroundColor }}</span>
			</div>
			<template v-if="!isLoaded">
				<div
					v-for="i in skeletonCnt"
					:key="i"
					class="skeleton"
				>
					<span>{{ i }}</span>
				</div>
			</template>
		</div>
	</div>
	<Toast
		v-if="showToast"
		:text="toastText"
		:color="copiedColor"
		@close="showToast = false"
	></Toast>
</template>

<script setup>
	import { useInfiniteScroll } from '@vueuse/core';
	import axios from 'axios';
	const showToast = ref(false);
	const toastText = ref('');
	const copiedColor = ref({});
	const el = ref(document);

	const colorList = reactive([]);
	const isLoaded = ref(false);
	const callCnt = ref(0);
	const skeletonCnt = computed(() => callCnt.value * 40);

	useInfiniteScroll(el, () => {
		isLoaded.value = false;
		getColors();
	});
	onMounted(() => {
		getColors();
	});

	const getColors = () => {
		callCnt.value += 1;
		axios.get('/color').then(res => {
			colorList.push(...res.data);
			isLoaded.value = true;
			callCnt.value -= 1;
		});
	};

	const setScale = (event, isIn) => {
		if (isIn) {
			event.target.classList.add('active');
		} else {
			event.target.classList.remove('active');
		}
	};

	const copyColor = color => {
		if (showToast.value) {
			showToast.value = false;
		}
		setTimeout(() => {
			showToast.value = true;
		});

		toastText.value = 'Copy it!';
		copiedColor.value = color;
		window.navigator.clipboard.writeText(color.backgroundColor);
	};
</script>
<style lang="scss" scoped>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		position: relative;
		// height: 500px;
		// overflow-y: scroll;
		> div {
			cursor: pointer;
			margin: 0 auto;
			width: 24.5%;
			height: 100px;
			margin-top: 5px;
			text-align: center;
			line-height: 100px;
			font-weight: bold;
			&.skeleton {
				position: relative;
				background-color: #eee;
				color: #eee;
				overflow: hidden;
			}
			&.active {
				z-index: 100;
				transform: scale(1.1);
				box-shadow: 0px 0px 5px #000;
			}
		}
	}

	@keyframes loading {
		0% {
			transform: translateX(0);
		}
		50%,
		100% {
			transform: translateX(350px);
		}
	}

	.skeleton::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 60px;
		background: linear-gradient(to right, #f2f2f2, #dfdfdf, #f2f2f2);
		animation: loading 0.9s infinite linear;
	}
</style>
