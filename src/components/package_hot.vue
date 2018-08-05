<template>
	<div class="package">
		<div class="package_99">
			<h2>天翼单产品套餐<span>99元</span></h2>
			<p>1.5G国内流量，可转换为语音和短信使用，1MB流量等于1分钟语音等于1条短信，转换语音封顶1000分钟，转换短信封顶500条</p>
			<span><i>HOT</i></span>
		</div>
		<div class="package_199">
			<h2>天翼单产品套餐<span>199元</span></h2>
			<p>100M光纤宽带，4G国内流量，可转换为语音和短信使用，1MB流量等于1分钟语音等于1条短信，转换语音封顶2000分钟，转换短信封顶500条</p>
			<span><i>HOT</i></span>
		</div>
		<div class="package_169">
			<h2>天翼单产品套餐<span>169元</span></h2>
			<p>50M光纤宽带，3G国内流量，可转换为语音和短信使用，1MB流量等于1分钟语音等于1条短信，转换语音封顶1000分钟，转换短信封顶500条</p>
			<span><i>HOT</i></span>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			abc () {
				console.log(123)
			}
		}
	}
</script>
<style lang="scss" scoped="">
	.package {
		margin-top: 0.53rem;
		padding-bottom: 0.27rem;
		& > div {
			height: 2.67rem;
			border: 2px solid #f64d6c;
			border-radius: 0.27rem;
			padding: 0.08rem 0.27rem 0 0.27rem;
			font-size: 0.37rem;
			margin-bottom: 0.37rem;
			position: relative;
			overflow: hidden;
			&:nth-of-type(3){
				margin-bottom: 0;
			}
			& > h2 {
				line-height: 0.75rem;
				font-size: 0.37rem;
				& > span {
					color: #fe4460;
					margin-left: 0.13rem;
				}
			}
			& > p {
				line-height: 0.56rem;
			}
			& > span {
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				width: 2.0rem;
				height: 1.33rem;
				text-align: center;
				color: #fff;
				background: #fe4460;
				transform: rotate(45deg);
				transform-origin: right bottom;
				& > i {
					position: absolute;
					left: 0;
					bottom: 0.13rem;
					display: block;
					width: 100%;
					font-size: 0.37rem;
					text-align: center;
				}
			}
		}
	}
</style>