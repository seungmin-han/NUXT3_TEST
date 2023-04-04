<template>
	<div>
		<MasonryInfiniteGrid :gap="1">
			<div
				class="item"
				v-for="(item, index) in items"
				:key="index"
				:data-grid-groupkey="index"
			>
				<img
					:src="item"
					alt=""
				/>
			</div>
		</MasonryInfiniteGrid>
	</div>
</template>

<script setup>
	import { MasonryInfiniteGrid } from '@egjs/vue3-infinitegrid';
	const items = reactive([]);
	const tmp = reactive([]);
	for (let i = 29; i >= 0; i--) {
		items.push(
			new URL(
				`../assets/chungjoo/KakaoTalk_20230404_102754981_${('' + i).length === 1 ? '0' + i : i}.jpg`,
				import.meta.url
			)
		);
	}
</script>

<style lang="scss" scoped></style>
