<template>
	<ul class="goodslist">
		<li v-for = "(item, idx) in goodslist" :key = "idx" @click = "$router.push({ name: 'goodsDetail', query: { id: item.ID}})">
			<div class="goods_img">
				<img :src="imgurl + item.imgurl">
			</div>
			<div class="goods_desc">
				<p class="goods_name" v-text = "item.description"></p>
				<p class = "goods_price" v-text = "item.nowPrice"></p>
				<div class="goods_btn" v-if = "show" >去租机</div>
			</div>
		</li>
	</ul>
</template>
<script>
	import url from '../assets/common/common.js';
	
	export default {
		name: 'goodslist',
		props: {
			goodslist: {
				default: []
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				imgurl: url.global.imgurl
			}
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/base/base.scss';
	@import '../assets/style/color/color.scss';
	.goodslist {
		position: relative;
		// padding: 0 0.27rem;
		& > li {
			height: 2.93rem;
			@extend %flexRow;
			align-items: center;
			border-bottom: 0.01rem solid #e8e8ed;
			padding-right: 0.27rem;
			& > .goods_img {
				height: 1.87rem;
				width: 1.87rem;
				& > img {
					max-width: 100%;
				}
			}
			& > .goods_desc {
				flex: 1;
				padding-left: 0.27rem;
				position: relative;
				& > .goods_name {
					font-size: 0.39rem;
					line-height: 0.6rem;
					height: 1.2rem;
					// 超出隐藏
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				& > .goods_price {
					font-size: 0.36rem;
					line-height: 0.67rem;
					color: #f5475f;
					&:before {
						content: '￥'
					}
				}
				& > .goods_btn {
					position: absolute;
					right: 0.27rem;
					bottom: 0;
					width: 1.73rem;
					height: 0.67rem;
					line-height: 0.67rem;
					font-size: 0.36rem;
					border-radius: 0.07rem;
					background: #f75277;
					color: #fff;
					text-align: center;
				}
			}
		}
	}
</style>