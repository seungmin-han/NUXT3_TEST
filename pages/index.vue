<template>
	<div class="container">
		<MainBanner></MainBanner>
		<h1 @click="tmp">Index</h1>
		<ImageView>
			<img
				src="~/assets/sky.jpg"
				alt=""
				width="1200"
			/>
		</ImageView>
	</div>
</template>

<script setup>
	import gsap from 'gsap';
	const tmp = async () => {
		console.log(useFetch('/test'));
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
</style>
