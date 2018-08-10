<!-- 利率 -->
<template>
	<div class="package">
		<div class="package_99" 
			:class = "index == idx ? 'active' : ''" 
			@click = "choosed(idx)" 
			v-for = "(item, idx) in capitalProdList" 
			:data-capitalType = "item.capitalType"
			>
			<h2>分期金额：<span></span></h2>
			<p v-text = "item.prodDesc"></p>
			<p v-text = "item.prodTerms"></p>
			
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				index: null
			}
		},
		props: {
			capitalProdList: {
				type: Array,
				default: []
			},
			total: {
				default: ''
			}
		},
		methods: {
			choosed (idx) {
				this.index = idx;
				this.capitalProdList.map((item, index) => {
					if(index == idx) {
						this.$emit('choose', JSON.stringify(item)); 
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped="">
	.package {
		// margin-top: 0.53rem;
		padding-bottom: 0.27rem;
		& > div {
			min-height: 2.67rem;
			border: 1px solid #ccc;
			border-radius: 0.27rem;
			padding: 0.08rem 0.27rem 0 0.27rem;
			font-size: 0.37rem;
			margin-bottom: 0.37rem;
			position: relative;
			overflow: hidden;
			&.active {
				border: 1px solid #f64d6c;
			}
			&:last-child {
				margin-bottom: 0;
			}
			& > h2 {
				line-height: 0.75rem;
				font-size: 0.37rem;
				& > span {
					color: #fe4460;
					margin: 0 0.13rem;
					font-weight: bolder;
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