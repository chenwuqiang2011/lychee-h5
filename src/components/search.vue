<template>
	<div class="search">
		<i class = "search_icon"></i>
		<span v-text = "placeholder"></span>
	</div>
</template>
<script>
	export default {
		data () {
			return {
			}
		},
		props: {
			placeholder: {
				type: String,
				default: '搜索商品'
			}
		}
	}
</script>
<style lang="scss" scoped="">
	.search {
		background: #fff;
		border-radius: 0.36rem;
		height: 0.72rem;
		line-height: 0.72rem;
		padding: 0 0.36rem;
		color: #989898;
		& > i {
			float: left;
			display: inline-block;
			width: 0.37rem;
			height: 0.37rem;
			margin-top: 0.17rem;
			background: url('../assets/imgs/search.png') no-repeat;
			background-size: cover;
		}
		& > span {
			float: left;
			margin-left: 0.16rem;
		}
	}
</style>