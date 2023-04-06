<template>
	<div class="container">
		<View3D
			src="assets/nakagin.glb"
			poster="assets/nakagin.jpg"
			@ready="onReady"
			:plugins="plugins"
		>
		</View3D>
	</div>
</template>

<script setup>
	import { View3D } from '@egjs/vue3-view3d';
	import { LoadingBar } from '@egjs/view3d';
	const onReady = e => {
		e.target.animator.play(1);
	};

	const plugins = [new LoadingBar({ type: 'top', loadingLabel: 'Loading. . .' })];
</script>

<style lang="scss" scoped>
	.view3d-wrapper {
		width: 100%;
		height: 850px;
	}
</style>
