<template>
  	<h1>Post</h1>
  	<div class="wrapper">
		<template v-if="!isLoaded">
			<div v-for="i in 30" :key="i" class="skeleton">
				<span>{{ i }}</span>
			</div>
		</template>
		
		<div 
			v-for="(color, index) in colorList" 
			:key="color+index" 
			:style="`background-color: ${color.backgroundColor};`">
			<span :style="`color: ${color.fontColor};`">{{color.backgroundColor}}</span>
		</div>
  	</div>
</template>

<script setup>
	const colorList = reactive([]);
	const isLoaded = computed(() => {
		return colorList.length;
	});
	onMounted(() => {
		getColors(2000).then(value => colorList.push(...value));	
	})

	const colorGenerator = ()=>{
		const ARR = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		let hexCode = '#';
		for(let i = 0; i < 6; i++) {
			let rand = Math.round(Math.random() * 15);
			hexCode += ARR[rand];
		}
		return hexCode;
	};

	const setFontColor = (backgroundColor) => {
		backgroundColor = backgroundColor.slice(1,);
		let r = parseInt(backgroundColor.slice(0, 2), 16);
		let g = parseInt(backgroundColor.slice(2, 4), 16);
		let b = parseInt(backgroundColor.slice(4, 6), 16);
		return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? 'black' : 'white';
	};

	

	const getColors = ms=>{
		return new Promise(resolve=>{
			setTimeout(()=>{
					let colorObj = [];
					for (let i = 0; i < 50; i++) {
						let backgroundColor = colorGenerator();
						colorObj.push({
							backgroundColor,
							fontColor: setFontColor(backgroundColor)
						});
				}
					resolve(colorObj);
				}, 
			ms);
		});
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		margin: 0 auto;
		width: 1750px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		> div {
			margin: 0 auto;
			width: 300px;
			height: 100px;
			padding: 10px 20px;
			margin: 5px;
			text-align: center;
			line-height: 100px;
			font-weight: bold;
			&.skeleton {
				position: relative;
				background-color: #eee;
				color: #eee;
				overflow: hidden;
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