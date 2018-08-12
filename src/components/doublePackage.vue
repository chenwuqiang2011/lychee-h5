<!-- 利率 -->
<template>
	<div class="package">
		<div class="package_item" 
			
			@click = "choosed(idx)" 
			v-for = "(item, idx) in capitalProdList" 
			:data-capitalType = "item.capitalType"
			:key = "idx"
			>
			<!-- <h2>分期金额：<span v-text = "item.downPayment"></span></h2> -->
			<div class="capitalDetail_l" :class = "index == idx ? 'active' : ''" ></div>
			<div class="capitalDetail_r">
				<p><span v-text = "item.monthPay + ' x ' + item.periods"></span> 期</p>
				<p v-text = "item.prodDesc"></p>
			</div>
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
		.package_item {
			border-bottom: 0.01rem solid #ccc;
			height: 1.07rem;
			padding: 0.27rem 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 0.36rem;
			.capitalDetail_l {
				width: 0.4rem;
				height: 0.4rem;
				margin-right: 0.4rem;
				border: 0.02rem solid #ccc;
				box-sizing: border-box;
				border-radius: 50%;
				&.active {
					background: url('../assets/imgs/select.png') no-repeat;
					background-size: cover;
					border: none;
				}
			}
			.capitalDetail_r {
				flex: 1;
			}
		}
	}
</style>