<template>
	<div class="back">
		<i></i>
		<h5 v-text = "title"></h5>
	</div>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/base/base.scss';
	@import '../assets/style/color/color.scss';

	.back {
		height: 1.2rem;
		background: $headBgColor;
		padding: 0 0.27rem;
		@extend %flexRow;
		align-items: center;
		color: #fff;
		font-size: 0.45rem;
		& > i {
			display: block;
			width: 0.6rem;
			height: 0.6rem;
			background: url('../assets/imgs/back.png') no-repeat;
			background-size: cover;
		}
		& > h5 {
			flex: 1;
			text-align: center;
		}
	}
</style>