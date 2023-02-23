<template>
  	<nav>
    	<ul>
        	<li><NuxtLink to="/">home</NuxtLink></li>
        	<li><NuxtLink to="/post">post</NuxtLink></li>
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