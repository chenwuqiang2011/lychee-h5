<template>
	<div class="goodsDetail">
		<!-- 顶部固定条 -->
		<div class="fixed_top">
			<back :title = "title"></back>
		</div>
		<!-- 显示区域 -->
		<div class="goodsDetail_content">	
			<div class="content">
				<div class="goodsDetail_lamp">
					<swiper :options="swiperOption" ref="mySwiper" >
					    <swiper-slide v-for = "(item, index) in photoList" :key = "index" :data-id = "item.photoId">
					    	<img :src="imgurl + item.photoPath" alt = "">
					    </swiper-slide>
					    <div class="swiper-pagination"  slot="pagination"></div>
					</swiper>
				</div>
				<div class="goods_desc">
					<p v-text = "goods.goodsName"></p>
					<div class="price_collect">
						<span class = "price" v-text = "goods.goodsPrice" v-if = "!changePrice"></span>
						<span class = "price" v-text = "total" v-if = "changePrice"></span>
						<div class="collect" @click = "collect">
							<i :class = "collectStatus == 1 ? 'active' : '' "></i>
							<span>{{collectStatus == 1 ?'已收藏':'收藏'}}</span>
						</div>
					</div>
				</div>
				<!-- 商品规格 -->
				<div class="goods_size">
					<div class="size_item"
						v-for = "(item, index) in skuGroupList" 
						:key = "index"
						:data-parentSkuId = "item.parentSkuId"

						>
						<p v-text = "item.parentSkuName"></p>
						<ul @click = "getSuk">
							<li :class = "idx == 0 ? 'active' : '' " 
								v-for = "(items, idx) in item.subSkuList"
								:key = "idx"
								:data-id = "items.subSkuId"
								:data-index = "index"
								v-text = "items.subSkuName"
							></li>
						</ul>
					</div>
<!-- 					<div class="size_item">
						<p>颜色</p>
						<ul>
							<li :class = "index2 == 1? 'active' : '' " @click = "getColor" data-index2 = '1'>玫瑰金</li>
							<li :class = "index2 == 2? 'active' : '' " @click = "getColor" data-index2 = '2'>白色</li>
							<li :class = "index2 == 3? 'active' : '' " @click = "getColor" data-index2 = '3'>黑色</li>
						</ul>
					</div> -->
					<!-- <div class="size_item">
						<p>数量</p>
						<el-input-number v-model="qty" @change="handleChange" :min="1" size="small"></el-input-number>
						<div>
							<span>-</span>
							<el-input v-model="qty" placeholder="请输入内容"></el-input>
							<input type="" name="">
							<span>+</span>
						</div>
						<p class = "stock">库存<span>256</span></p>
						
					</div>	 -->
				</div>
				<!-- 商品套餐 -->
				<div class="goods_package" @click = "showPackage">
					<span>套餐</span>
					<p v-text = "mealChoosed"></p>
					<i></i>	
				</div>

				<!-- 商品分期 -->
				<div class="goods_package" @click = "showCapitalProdList">
					<span>分期</span>
					<p v-text = "userChoosed || '请选择分期' "></p>
					<i></i>	
				</div>
			
				<!-- 商品参数 -->
				<!-- <div class="goods_package">
					<span>产品参数</span>
					<p></p>
					<i></i>
				</div> -->
				<!-- 商品详情 -->
				<div class="goods_package">
					<span>图文详情</span>
				</div>
				<div class="img_text">
					<img src="../../assets/imgs/s7.png" alt = "">
				</div>
			</div>
		</div>
		<transition name="fade">
		
			<div class="show_package" v-show = "show">
				<div class="mask" @click = "show = !show"></div>
				<!-- 套餐选择 -->
				<div class="packages" v-if = "showList">
					<h3>选择套餐<span></span></h3>
					<div class = "packages_insert">
						<singlePackage @choose = "selectPackage" :telecomProdList = "telecomProdList"></singlePackage>
					</div>
				</div>

				<!-- 分期选择 -->
				<div class="packages" v-if = "!showList">
					<h3>分期金额：<span></span></h3>
					<div class = "packages_insert">
						<doublePackage @choose = "select" :capitalProdList = "capitalProdList"></doublePackage>
					</div>
				</div>
				
				<p @click = "showPackage">完成</p>
			</div>
		</transition>

		<!-- 底部固定条 -->
		<div class="fixed_bottom">
			<div class="fixed_bottom_l">
				<p>您仅需支付：</p>
				<p class = "total" v-text = "total"></p>
			</div>
			<div class="fixed_bottom_r" @click = "next">下一步</div>
		</div>
		<!-- 弹窗提示 -->
		<popup :text = "popupText"></popup>
	</div>
</template>
<script>
	import back from '../back.vue';
	import popup from '../popup.vue';
	import packages from '../package_hot.vue';
	import singlePackage from '../singlePackage.vue';
	import doublePackage from '../doublePackage.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';
	import './goodsDetail.scss';
	import $ from "jquery";

	export default {
		components: {
			back,
			packages,
			doublePackage,
			singlePackage,
			popup
		},
		data () {
			return {
				popupText: '',
				title: '商品详情',
				total: 0, //商品显示价格
				downPayment: 0, //商品首付；
				changePrice: false, //商品单价显示切换；
				packagePrice: 0, //套餐价格；
				telecomProdList: [],//套餐选择列表
				qty: 1,
				showList: true, //显示套餐标识 ；
				sum: 0, //商品价格 + 利息 + 套餐，
				meal: 0, //商品套餐，
				capitalProdList: [], //分期列表
				capitalSelected: {},//用户选择的分期；
				mealList: [], //套餐列表
				mealListSelected: {}, //用户选择的套餐；
				goods: {}, //商品介绍
				photoList: [], //轮播图片
				collectStatus: '0', //收藏状态 1 为已收藏，0 为未收藏；
				userChoosed: '', //分期选择提示；
				mealChoosed: '', //套餐选择显示；
				skuGroupList: [],//商品属性列表；
				skuDetailList: [], //商品的所有分类的价格列表；
				currentSkuJsonId: [],//当前商品的所有选择属性
				index: 1,
				index2: 1,
				activeName: 'first',
				show: false,
				swiperOption: {
					pagination: {
					    el: '.swiper-pagination',
					    bulletElement : 'li',
					},
					autoplay: {
					   delay: 3000,
					   stopOnLastSlide: false,
					   disableOnInteraction: false,
					},
					loop: true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper
				},
				imgurl: url.global.imgurl,
				options: {}
			}
		},
		created () {
			this.goodsId = this.$route.query.id;
			//标题；
			// if (to.meta.title) {
			//     document.title = to.meta.title;
			// }
			this.options = {
				goodsId: this.goodsId,
				openId: this.$store.state.currentCity.openId,
				userId: this.$store.state.currentCity.userId,
				provinceCode: this.$store.state.currentCity.city.provinceCode,
				cityCode: this.$store.state.currentCity.city.cityCode
			}
			api.queryGoodsDetail(this.options).then(res => {
				console.log(res);
				if(res.data.errcode == 1) {
					this.goods = res.data.goodsBaseInfo;//商品详细信息
					this.total = res.data.goodsBaseInfo.goodsPrice;//商品默认价格；
					this.photoList = res.data.photoList; //轮播图
					this.collectStatus = res.data.goodsBaseInfo.collectStatus;//收藏状态；
					this.capitalProdList = res.data.capitalProdList;//分期选择列表；
					this.mealList = res.data.mealList;//套餐选择列表；
					this.skuDetailList = res.data.skuDetailList;//商品规格i属性d拼接数组；
					this.skuGroupList = res.data.skuGroupList;//商品规格属性数组
					this.downPayment = res.data.goodsBaseInfo.downPayment;//商品首付；
					this.telecomProdList = res.data.telecomProdList; 
					if(res.data.telecomProdList.length > 0) {
						this.mealChoosed = res.data.telecomProdList[0].prodName;
						this.packagePrice = res.data.telecomProdList[0].price;
					};

					//套餐价格；


					//将默认显示的商品属性id数组；
					var arr = [];
					this.skuGroupList.map((item, index) => {
						arr.push(item.subSkuList[0].subSkuId);
					});
					this.currentSkuJsonId = arr;
					this.match();
				}
			});
		},
		mounted () {
			// this.getBaseInfo();
			$ ('.popup').hide();
		},
		methods: {
			//获取用户是否激活；
			getBaseInfo () {
				var options = {
					openId: this.$store.state.currentCity.openId,
					provinceCode: this.$store.state.currentCity.city.provinceCode,
					cityCode: this.$store.state.currentCity.city.cityCode,
				}
				api.getBaseInfo (this.options).then(res => {
					console.log(res)
				})
			},
			select (data) {
				console.log('调用成功了！', data);
				this.capitalSelected = JSON.parse(data);
			},
			// 选择套餐
			selectPackage (data) {
				console.log('显示套餐'+ data);
				data = JSON.parse(data);
				this.packagePrice = data.price;
			},
			//收藏状态；
			collect () {
				console.log(this.total, this.packagePrice)
				api.collectGoods(this.options).then(res => {
					console.log(res);
					if(res.data.errcode == 1) {
						this.collectStatus = res.data.status;
						if(this.collectStatus == 1) {
							//收藏成功；
							this.$message({
								message: '收藏成功！',
								type: 'success'
							});
							this.popupText = '成功';
							$ ('.popup').show ().delay (500).fadeOut ().text('');
						} else {
							//取消收藏；
							this.$message({
								message: '收藏已取消！'
							});
							this.popupText = '取消';
							$ ('.popup').show ().delay (500).fadeOut ().text('');
						}
					}
				})
			},
			//匹配属性价格数组；
			match () {
				var str = this.currentSkuJsonId;
				var matchStr = '';
				if(str.length <= 1) {
					matchStr = str[0] || '';
				} else {
					str.map((item, index) => {
						matchStr += item + '_';
					});
					matchStr = matchStr.substring(0, matchStr.length - 1);
				}
				this.skuDetailList.map((item, index) => {
					var skuJsonStr = JSON.parse(item.skuJsonStr);
					if(skuJsonStr.unionId == matchStr) {
						this.changePrice = true;
						this.total = skuJsonStr.shopPrice;
					}
				})
			},
			//选择属性并更新原数组状态；
			getSuk (e) {

				if(e.target && e.target.nodeName.toLowerCase() == "li") {
					$(e.target).addClass('active').siblings().removeClass('active');
					//把当前值替换原数组的值；
					var index = $(e.target).data('index');
					var subSkuId = $(e.target).data('id');
					this.currentSkuJsonId.splice(index, 1, subSkuId);
				}
				// 匹配商品价格；
				this.match()

			},
			getColor (e) {
				this.index2 = e.target.dataset.index2;
				this.color = e.target.innerHTML;

			},
			handleChange (val) {
				
				this.total = (this.qty * this.goods.goodsPrice);

			},
			next () {
				/*
					1、商品图片、商品ID、商品名称、总价;
					2、选择的商品规格（容量、颜色、套餐）；
				*/
				var option = {
					ID: this.id,
					capacity: this.capacity,
					color: this.color,
					total: this.total,
					package: this.userChoosed
				};
				console.log(option)
				console.log(this.index, this.index2, typeof this.total, this.qty);
				if(!this.userChoosed) {
					this.$message({
						message: '请选择套餐',
						type: 'warning'
					});
					return false;
				}
				this.$router.push({name: 'rentDetail', query: option});
			},
			//显示套餐列表；
			showPackage () {
				this.userChoosed = this.capitalSelected.prodName;
				this.show = !this.show;
				this.showList = true;	
			},
			//显示分期列表
			showCapitalProdList () {
				this.show = !this.show;
				this.showList = false;	
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    }
		}
	}
</script>