<template>
	<div class="container">
		<MainBanner></MainBanner>
		<h1>Index</h1>
		<ImageView>
			<img
				src="~/assets/sky.jpg"
				alt=""
				width="1200"
			/>
		</ImageView>
		<ImageZoom
			class="zoom"
			:width="1200"
			:height="600"
			:origin-x="0"
			:origin-y="0"
			:minScale="0.9"
			:contentWidth="1200"
			:contentHeight="600"
		>
			<img
				src="~/assets/sky.jpg"
				alt=""
				width="1200"
			/>
		</ImageZoom>
	</div>
</template>

<script setup>
	import gsap from 'gsap';
	import ImageZoom from '@coddicat/vue3-pinch-scroll-zoom';

	const zoom = event => {
		if (isOver) {
			return;
		}
		console.log(isOver, event);
	};

	onMounted(() => {
		gsap.fromTo(
			'.main_banner',
			{
				opacity: 0,
				y: '50%',
			},
			{
				duration: 1,
				opacity: 1,
				y: 0,
			}
		);
	});
</script>

<style scoped lang="scss">
	#content {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-content: flex-start;
		flex-wrap: wrap;
	}

	.zoom {
		overflow: hidden;
	}
</style>
