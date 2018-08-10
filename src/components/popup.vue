<template>
	<div class = "popup" v-text = "text"></div>
</template>
<script>
	export default {
		props: {
			text: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 2.67rem;
		height: 2.67rem;
		line-height: 2.67rem;
		text-align: center;
		background: #000;
		opacity: 0.5;
		color: #fff;
		font-size: 0.53rem;
		border-radius: 0.27rem;
	}
</style>