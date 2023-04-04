<template>
	<masonry-infinite-grid
		class="container"
		:gap="5"
		:column="3"
		@request-append="onRequestAppend"
	>
		<div
			class="item"
			v-for="item in items"
			:key="item.key"
			:data-grid-groupkey="item.groupKey"
		>
			<div class="thumnail">
				<img
					:src="item.url"
					alt=""
				/>
			</div>
		</div>
	</masonry-infinite-grid>
</template>

<script setup>
	import { MasonryInfiniteGrid } from '@egjs/vue3-infinitegrid';
	const imageGroupName = [
		'KakaoTalk_20230404_102754981',
		'KakaoTalk_20230404_102818730',
		'KakaoTalk_20230404_102837460',
		'KakaoTalk_20230404_102858782',
		'KakaoTalk_20230404_102925099',
	];
	const getItems = (nextGroupKey, count) => {
		const nextItems = [];
		for (let i = 0; i < count; ++i) {
			const nextKey = nextGroupKey * count + i;
			const url = new URL(
				`../assets/chungjoo/${imageGroupName[nextGroupKey % 6]}_${
					('' + nextKey).length === 1 ? '0' + (nextKey % 29) : nextKey % 29
				}.jpg`,
				import.meta.url
			);
			nextItems.push({ url, groupKey: nextGroupKey, key: nextKey });
		}
		return nextItems;
	};
	let items = ref([...getItems(0, 10)]);

	const onRequestAppend = e => {
		const nextGroupKey = (+e.groupKey || 0) + 1;

		items.value = [...items.value, ...getItems(nextGroupKey, 10)];
	};
</script>

<style lang="scss" scoped>
	img {
		width: 400px;
	}
</style>
