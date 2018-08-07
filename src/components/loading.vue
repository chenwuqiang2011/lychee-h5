<template>
	<div class = "loading">
		<img src="../assets/imgs/loading.gif">
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="scss" scoped>
	.loading {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		// background: #000;
		// opacity: 0.5;
		img {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 4.0rem;
			height: 4.0rem;
		}
	}
</style>