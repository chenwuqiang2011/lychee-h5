<template>
	<div class="phoneFilter_bg">
		<!-- 对transition不了接的可以查看vue2.0官方文档的“过渡 & 动画” 链接：https://cn.vuejs.org/v2/guide/transitions.html-->
		<transition name="fade" @touchmove.stop.prevent>
			<!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
			<div class="menu-mask" v-show="isRellyShow" @click="hideSide"></div>
		</transition>

		<transition name="slide-fade">
			<!-- 这里才是侧栏代码部分 -->
		   
			<div class="phoneFilter" v-show="isRellyShow">
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
					<div class="phone_reset" @click = "reset">重置</div>
					<div class="phone_submit" @click = "submit">完成</div>
				</div>
			</div>
		</transition>
	</div>
	
</template>
<script>
	import $ from 'jquery';
	import api from '../../api/api.js';

	export default {
		data () {
			return {
				min: null,
				max: null,
				brand: '',
				ROM: '',
				RAM: '',
				type: '',

				category: ''
			}
		},
		created () {
			console.log(this.$route.query.category);
			this.category = this.$route.query.category;
			var options = {
				openId: this.$store.state.currentCity.openId,
				provinceCode: this.$store.state.currentCity.city.provinceCode,
				cityCode: this.$store.state.currentCity.city.cityCode,
				category: this.$route.query.category
			};
			api.queryConditionList(options).then(res => {
				console.log(res)
			})
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
		computed:{
			isRellyShow(){
				return this.$store.getters.isShowMethod;
			}
		},
		methods: {
			hideSide:function(){
			  	this.$store.dispatch('hideSideBar');
			},
			handleChange (val) {
				console.log(123)
			},
			reset () {
				this.min = null;
				this.max = null;
				this.brand = null;
				this.ROM = null;
				this.RAM = null;
				this.type = null;
				var that = this;
				$('.phone_brandList').find('img').removeClass('active');
				$('.grid-content').removeClass('active');
				
			},
			submit () {
				var option = {
					brand: this.brand,
					ROM: this.ROM,
					RAM: this.RAM,
					type: this.type,
					min: this.min,
					max: this.max
				}
				console.log(this.brand, this.ROM, this.RAM, this.type, this.min, this.max);
			  	this.$store.dispatch('hideSideBar');
			  	this.$emit('getFilter', option);
			}
		}
	}
</script>
<style lang="scss" scoped="">
	@import '../../assets/style/base/base.scss';
	@import '../../assets/style/color/color.scss';
	.menu-mask{
		position:fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		opacity: 1;
		z-index:10;
		background:rgba(0,0,0,0.5);
	}
	.fade-enter-to, .fade-leave-to{
		transition: opacity 0.3s
	}
	.fade-enter, .fade-leave-to{
		opacity: 0
	}
	.slide-fade-enter-to, .slide-fade-leave-to{
		transition: transform 0.3s;
		transform:translate(0px,0px);
	}
	.slide-fade-enter, .slide-fade-leave-to{
		opacity: 0;
		-webkit-transform:translate(10.0rem, 0);
		transform:translate(10.0rem, 0);
		-webkit-transition:opacity 0.3s ease-in-out 0.3s,-webkit-transform 0.3s ease-in-out;
		transition: opacity 0.3s ease-in-out 0.3s,transform 0.3s ease-in-out;
	}
	.phoneFilter {
		@extend %flexColumn;
		width: 9.0rem;
		height: 100%;
		z-index: 11;
		position:fixed;
		// width: 90%;
		top: 0;
		left: 0;
		bottom: 0;
		-webkit-overflow-scrolling:touch;
		background: #fff;
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