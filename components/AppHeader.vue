<template>
    <header>
        <nav class="container">
        	<ul>
            	<li><NuxtLink to="/">Home</NuxtLink></li>
            	<li><NuxtLink to="/color">Colors</NuxtLink></li>
        	</ul>
  	    </nav>
    </header>
</template>

<script>
export default {
	
}
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
        width: 1200px;
    }
</style>

<style lang="scss" scoped>
    header {
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