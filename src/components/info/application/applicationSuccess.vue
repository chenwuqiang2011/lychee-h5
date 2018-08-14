<template>
	<div class = "applicationSuccess">
		<div class="back" >
			<i @click = "$router.push('/info')"></i>
			<h5>授信成功</h5>
		</div>
		<div class="applicationSuccess_content">
			
			<div class="loading">
				<img src="../../../assets/imgs/succeed.png">
			</div>
			<p>恭喜您，申请成功！</p>
			<p>您的信用额度为<span v-text = "creditScore"></span>元</p>
		</div>
		<div class = "useNow" @click = "$router.push('/home')">立即使用</div>
	</div>
</template>
<script>
	import back from '../../back.vue';
	export default {
		data () {
			return {
				creditScore: 5000
			}
		},
		components: {
			back
		},
		created () {
			this.creditScore = this.$route.query.creditScore;
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/style/base/base.scss';
	@import '../../../assets/style/color/color.scss';
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
			background: url('../../../assets/imgs/back.png') no-repeat;
			background-size: cover;
		}
		& > h5 {
			flex: 1;
			text-align: center;
		}
	}
	.applicationSuccess_content {
		@extend %flexColumn;
		align-items: center;
		img {
			width: 3.33rem;
			margin: 1.33rem 0;
		}
		p {
			font-size: 0.51rem;
			line-height: 1.23rem;
			color: #f5475f;
			text-align: center;
			& > span {
				font-size: 0.63rem;
				font-weight: bolder;
				margin: 0 0.13rem;
			}
		}
	}
	.useNow {
		height: 1.2rem;
		line-height: 1.2rem;
		margin: 0.93rem 0.53rem;
		width: auto;
		background: #f5475f;
		color: #fff;
		text-align: center;
		font-size: 0.49rem;
		letter-space: 0.27rem;
		border-radius: 0.13rem;
	}
</style>