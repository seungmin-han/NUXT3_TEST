<template>
  	<nav>
    	<ul>
        	<li><NuxtLink to="/">Home</NuxtLink></li>
        	<li><NuxtLink to="/color">Colors</NuxtLink></li>
    	</ul>
  	</nav>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
    nav {
        > ul {
            > li {
                display: inline-block;
                padding: 0 10px;
            }
        }
    }
</style>