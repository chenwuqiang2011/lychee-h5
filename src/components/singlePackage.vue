<!-- 套餐选择 -->
<template>
	<div class="package">
		<div class="package_99" 
			:class = "index == idx ? 'active' : ''" 
			@click = "choosed(idx)" 
			v-for = "(item, idx) in telecomProdList" 
			:data-prodId = "item.prodId"
			>
			<h2 v-text = "item.prodName"></h2>
			<p style="marginTop: 0.13rem;marginBottom: 0.13rem;">月费用：<span>{{item.monthFee}}</span></p>
			<p v-text = "item.prodDesc"></p>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			},
			telecomProdList: {
				type: Array,
				default: []
			}
		},
		data () {
			return {
				index: 0
			}
		},
		methods: {
			choosed (idx) {
				this.index = idx;
				this.telecomProdList.map((item, index) => {
					if(index == idx) {
						console.log(idx)
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
			height: 2.67rem;
			border: 1px solid #ccc;
			border-radius: 0.27rem;
			padding: 0.27rem;
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
			}
			& > p {
				line-height: 0.56rem;
				& > span {
					color: #f64d6c;
					&:after {
						content: '元';
					}
				}
			}
		}
	}
</style>