<template>
	<ImageModal
		v-for="image in store.modals"
		:key="image.fileName"
		:image="image"
	>
	</ImageModal>
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
			<div
				class="thumnail"
				@click="openModal(item)"
			>
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
	import { useModalStore } from '@/stores/modal';

	const store = useModalStore();

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

			const fileName = `${imageGroupName[nextGroupKey % 6]}_${
				('' + nextKey).length === 1 ? ('' + (nextKey % 29)).padStart(2, '0') : nextKey % 29
			}`;

			const url = new URL(`../assets/chungjoo/${fileName}.jpg`, import.meta.url);

			nextItems.push({ url, groupKey: nextGroupKey, key: nextKey, fileName: fileName });
		}

		return nextItems;
	};

	let items = ref([...getItems(0, 10)]);

	const onRequestAppend = e => {
		const nextGroupKey = (+e.groupKey || 0) + 1;

		items.value = [...items.value, ...getItems(nextGroupKey, 10)];
	};

	const openModal = item => {
		store.openModal(item);
	};
</script>

<style lang="scss" scoped>
	img {
		width: 400px;
	}

	.item {
		border-radius: 10px;
		overflow: hidden;
	}
</style>
