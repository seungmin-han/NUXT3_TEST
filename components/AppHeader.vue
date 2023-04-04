<template>
	<header>
		<nav class="container">
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/color">Colors</NuxtLink></li>
				<li><NuxtLink to="/photo">Photos</NuxtLink></li>
				<li><NuxtLink to="/chart">Chart</NuxtLink></li>
				<li><NuxtLink to="/3DView">3DView</NuxtLink></li>
			</ul>
		</nav>
	</header>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	* {
		margin: 0 auto;
		padding: 0;
		box-sizing: border-box;
		list-style: none;
		text-decoration: none;
	}

	.container {
		max-width: 1200px;
	}
</style>

<style lang="scss" scoped>
	header {
		position: sticky;
		top: 0;
		z-index: 1000;
		padding: 20px;
		background-color: #333;
		nav {
			> ul {
				> li {
					display: inline-block;
					padding: 0 10px;
					a {
						color: #fff;
					}
				}
			}
		}
	}
</style>
