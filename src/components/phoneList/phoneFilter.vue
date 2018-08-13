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
							<input v-model="minPrice" type = "number" pattern="[0-9]*" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" placeholder="最低价格" class = "minPrice" />
							<span>—</span>
							<input v-model="maxPrice" type = "number" pattern="[0-9]*" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" placeholder="最高价格"class = "maxPrice" />
						</div>
					</div>
					<!-- 品牌 -->
				<!-- 	<div class="phone_brand">
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
					</div> -->
					<!-- 机身内存 -->
					<div class="phone_capacity" v-for = "(item, index) in cateList" :key = "index" :data-id = "item.cateId">
						<h3 v-text = "item.cateName"></h3>
						<div class="phone_capacity_list">
							<span v-for = "(item2, index2) in item.subCateList" :key = "index2" v-text = "item2.subCateName" :data-id = "item2.subCateId" @click = "getCondition"></span>
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
				minPrice: null,
				maxPrice: null,
				category: '', //分类标识;
				cateList: [],  //条件列表；
				queryCateList: []
			}
		},
		created () {
			this.category = this.$route.query.category;
			var options = {
				openId: this.$store.state.currentCity.openId,
				provinceCode: this.$store.state.currentCity.city.provinceCode,
				cityCode: this.$store.state.currentCity.city.cityCode,
				category: this.$route.query.category
			};
			api.queryConditionList(options).then(res => {
				console.log(res)
				if(res.data.errcode == 1){
					this.cateList = res.data.cateList;
				}
			})
		},
		mounted () {

		},
		computed:{
			isRellyShow(){
				return this.$store.getters.isShowMethod;
			}
		},
		methods: {
			getCondition (e) {
				$(e.target).toggleClass('active');
				console.log($(e.target).data('id'));
				var subCateId = $(e.target).data('id');

				//选中显示高亮，同时添加到选择条件数组里面，否则删除该选项；
				if($(e.target).hasClass('active')){
					this.queryCateList.push(subCateId);
				} else {
					var index = this.queryCateList.indexOf(subCateId);
					this.queryCateList.splice(index, 1);
				}
				//去重；
				this.queryCateList = this.queryCateList.filter((item, index ,self) => {
					return self.indexOf(item) == index;
				});
				console.log(this.queryCateList);
			},
			hideSide:function(){
			  	this.$store.dispatch('hideSideBar');
			},
			handleChange (val) {
				console.log(123)
			},
			reset () {
				$('.phone_capacity').find('span').removeClass('active');
				this.queryCateList = [];
				
			},
			submit () {
				var options = {
					minPrice: this.minPrice,
					maxPrice: this.maxPrice,
					queryCateList: JSON.stringify(this.queryCateList)
				}
			  	this.$store.dispatch('hideSideBar');
			  	this.$emit('getFilter', options);
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
		width: 9rem;
		height: 100%;
		z-index: 11;
		position:fixed;
		// width: 90%;
		top: 0;
		right: 0;
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
					border-bottom: 1px solid #e5e5e5;
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
			.phone_capacity {
				border-bottom: 0.01rem solid #e5e5e5;	
				h3 {
					@extend h3 ;
				}
				.phone_capacity_list {
					padding: 0.27rem;
					padding-left: 0.53rem;
					@extend %flexRow;
					flex-wrap: wrap;

					span {
						display: block;
						background: #eaeeef;
						width: 30%;
						height: 0.8rem;
						line-height: 0.8rem;
						margin-right: 0.27rem;
						margin-bottom: 0.27rem;
						border-radius: 0.13rem;
						text-align: center;
						font-size: 0.29rem;
						box-sizing: border-box;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&.active {
							border: 0.01rem solid #dd2727;
							color: #dd2727;
						}
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