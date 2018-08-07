<template>
	<div class="phoneFilter">
		<div class="phone_head">
			<div class="phone_price">
				<h3>价格</h3>
				<div class="phone_price_range">
					<span>价格区间(元)</span>
					<input v-model="min" type = "number" pattern="[0-9]*" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" placeholder="最低价格" class = "minPrice" />
					<span>—</span>
					<input v-model="max" type = "number" pattern="[0-9]*" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" placeholder="最高价格"class = "maxPrice" />
				</div>
			</div>
			<!-- 品牌 -->
			<div class="phone_brand">
				<el-collapse  @change="handleChange">
					<el-collapse-item title="品牌" name="1" style = "color: #888; fontSize: 0.37rem">
						<div class = "phone_brandList">
							<img src="../../assets/imgs/phone_huawei.png" alt = "华为">
							<img src="../../assets/imgs/phone_iphone.png" alt = "苹果">
							<img src="../../assets/imgs/phone_samsung.png" alt = "三星">
							<img src="../../assets/imgs/phone_meizu.png" alt = "魅族">
							<img src="../../assets/imgs/phone_xiaomi.png" alt = "小米">
							<img src="../../assets/imgs/phone_nokia.png" alt = "诺基亚">
							<img src="../../assets/imgs/phone_nubia.png" alt = "努比亚">
							<img src="../../assets/imgs/phone_chuizi.png" alt = "锤子">
							<img src="../../assets/imgs/phone_coolpad.png" alt = "酷派">
							<img src="../../assets/imgs/phone_gionee.png" alt = "金立">
							<img src="../../assets/imgs/phone_ktouch.png" alt = "天语">
							<img src="../../assets/imgs/phone_lenovo.png" alt = "联想">
							<img src="../../assets/imgs/phone_sony.png" alt = "索尼">
							<img src="../../assets/imgs/phone_philips.png" alt = "飞利浦">
							<img src="../../assets/imgs/phone_motorola.png" alt = "摩托罗拉">
							<img src="../../assets/imgs/phone_vivo.png" alt = "vivo">
							<img src="../../assets/imgs/phone_zte.png" alt = "中兴">
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
			<!-- 机身内存 -->
			<div class="phone_capacity">
				<h3>机身内存ROM</h3>
				<div class="phone_capacity_list rom_list">
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">512M</div></el-col>
						<el-col :span="8"><div class="grid-content">16G</div></el-col>
						<el-col :span="8"><div class="grid-content">32G</div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">64G</div></el-col>
						<el-col :span="8"><div class="grid-content">128G</div></el-col>
						<el-col :span="8"><div class="grid-content">256G</div></el-col>
					</el-row>
				</div>
			</div>
			<!-- 运行内存 -->
			<div class="phone_capacity">
				<h3>运行内存RAM</h3>
				<div class="phone_capacity_list ram_list">
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">1G</div></el-col>
						<el-col :span="8"><div class="grid-content">2G</div></el-col>
						<el-col :span="8"><div class="grid-content">3G</div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">4G</div></el-col>
						<el-col :span="8"><div class="grid-content">6G</div></el-col>
						<el-col :span="8"><div class="grid-content">8G</div></el-col>
					</el-row>
				</div>
			</div>
			<!-- 手机类型 -->
			<div class="phone_capacity">
				<h3>手机类型</h3>
				<div class="phone_capacity_list type_list">
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">儿童手机</div></el-col>
						<el-col :span="8"><div class="grid-content">三防手机</div></el-col>
						<el-col :span="8"><div class="grid-content">电视手机</div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content">3G手机</div></el-col>
						<el-col :span="8"><div class="grid-content">老人手机</div></el-col>
						<el-col :span="8"><div class="grid-content">女性手机</div></el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="phone_foot">
			<div class="phone_reset">重置</div>
			<div class="phone_submit" @click = "submit">完成</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	export default {
		data () {
			return {
				min: null,
				max: null,
				brand: '',
				ROM: '',
				RAM: '',
				type: ''
			}
		},
		mounted () {
			var that = this;
			$('.phone_brandList').on('click', function(e){
				//获取品牌
				if(e.target.nodeName.toLowerCase() == 'img') {
					// console.log($(e.target).attr('alt'));
					$(e.target).addClass('active').siblings().removeClass('active');
					that.brand = $(e.target).attr('alt');
				};
			});
			//获取机身内存;
			$('.rom_list').on('click', function(e){
				//获取品牌
				if(e.target.className == 'grid-content') {
					$(e.target).addClass('active').parent().siblings().children().removeClass('active');
					$(e.target).addClass('active').parents('.el-row').siblings().find('.grid-content').removeClass('active');
					that.ROM = $(e.target).text();
				};
			});
			//获取运行内存;
			$('.ram_list').on('click', function(e){
				//获取品牌
				if(e.target.className == 'grid-content') {
					// console.log(1,$(e.target).text());
					$(e.target).addClass('active').parent().siblings().children().removeClass('active');
					$(e.target).addClass('active').parents('.el-row').siblings().find('.grid-content').removeClass('active');
					that.RAM = $(e.target).text();
				};
			});
			//获取手机类型;
			$('.type_list').on('click', function(e){
				//获取品牌
				if(e.target.className == 'grid-content') {
					// console.log(1,$(e.target).text());
					$(e.target).addClass('active').parent().siblings().children().removeClass('active');
					$(e.target).addClass('active').parents('.el-row').siblings().find('.grid-content').removeClass('active');
					that.type = $(e.target).text();
				};
			});
		},
		methods: {
			handleChange (val) {
				console.log(123)
			},
			submit () {
				console.log(this.brand, this.ROM, this.RAM, this.type, this.min, this.max)
			}
		}
	}
</script>
<style lang="scss" scoped="">
	@import '../../assets/style/base/base.scss';
	@import '../../assets/style/color/color.scss';
	.phoneFilter {
		@extend %flexColumn;
		width: 90%;
		height: 100%;
		.phone_head {
			flex: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			h3 {
				padding: 0 0.27rem;	
				height: 1.2rem;
				line-height: 1.2rem;
				font-size: 0.37rem;
				color: #888;
				border-bottom: 0.01rem solid #e5e5e5;
			}
			.active {
				border: 0.01rem solid #dd2727;
				color: #dd2727;
			} 
			.phone_price {
				h3 {
					@extend h3;
				}
				.phone_price_range {
					@extend h3;
					border-bottom: none;
					@extend %flexRow;
					align-items: center;
					padding-left: 0.53rem;
					& > input {
						width: 2.2rem;
						height: 0.67rem;
						font-size: 0.36rem;
						color: #888;
						border: none;
						border-radius: 0.13rem;
						background: #eaeeef;
						margin: 0 0.27rem;
						text-align: center;
					}
				}
			}
			.phone_brand {
				// padding: 0 0.27rem;
				.el-collapse-item {
					padding: 0 0.27rem;
					.el-collapse-item__header {
						color: #888!important;
					}
					.phone_brandList {
						overflow: hidden;
						img {
							display: block;
							float: left;
							width: 2.0rem;
							height: 0.85rem;
							margin: 0.25rem;
							padding: 0.13rem;
							border: 0.01rem solid #e5e5e5;
							&.active {
								@extend .active;
							} 
						}
					}
				}
			}
			.phone_capacity {
				border-bottom: 0.01rem solid #e5e5e5;	
				h3 {
					@extend h3 ;
				}
				.phone_capacity_list {
					// overflow: hidden;
					padding: 0.27rem 0.67rem;
					.grid-content  {
						height: 0.8rem;
						background: #eaeeef;
						height: 0.8rem;
						line-height: 0.8rem;
						text-align: center;
						margin-bottom: 0.27rem;
						border-radius: 0.13rem;
						font-size: 0.29rem;
						box-sizing: border-box;
					}
				}
			}
		}
		.phone_foot {
			height: 1.33rem;
			@extend %flexRow;
			& > div {
				flex: 1;
				background: #ffe4e4;
				color: #f5475f;
				text-align: center;
				font-size: 0.37rem;
				line-height: 1.33rem;
				&:last-child {
					background: #f5475f;
					color: #fff;
				}
			}

		}
	}
</style>