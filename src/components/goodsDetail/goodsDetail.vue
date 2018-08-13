<template>
	<div class="goodsDetail">
		<!-- 顶部固定条 -->
		<div class="fixed_top">
			<back :title = "title"></back>
		</div>
		<!-- 显示区域 -->
		<div class="goodsDetail_content">	
			<div class="content">
				<div class="goodsDetail_lamp" v-if = "photoList.length > 0">
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
					<p v-text = "capitalChoosed || '请选择分期' "></p>
					<i></i>	
				</div>
			
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
					<h3>选择套餐</h3>
					<div class = "packages_insert">
						<singlePackage @choose = "selectPackage" :telecomProdList = "telecomProdList"></singlePackage>
					</div>
				</div>

				<!-- 分期选择 -->
				<div class="packages" v-if = "!showList">
					<h3>分期金额：<span v-text = "total + packagePrice - realDownPayment"></span></h3>
					<div class = "packages_insert">
						<doublePackage @choose = "select" :capitalProdList = "sendCapitalProdList" :defaultIndex = "defaultIndex"></doublePackage>
					</div>
				</div>
				
				<p @click = "completed">完成</p>
			</div>
		</transition>

		<!-- 底部固定条 -->
		<div class="fixed_bottom">
			<div class="fixed_bottom_l">
				<p>首付：<span class = "total" v-text = "realDownPayment"></span></p>
				<div></div>
			</div>
			<div class="fixed_bottom_r" @click = "next">下一步</div>
		</div>
		<!-- 弹窗提示 -->
		<popup :text = "popupText"></popup>
		<loading v-if = "showLoading"></loading>
	</div>
</template>
<script>
	import back from '../back.vue';
	import popup from '../popup.vue';
	import packages from '../package_hot.vue';
	import singlePackage from '../singlePackage.vue';
	import doublePackage from '../doublePackage.vue';
	import loading from '../loading.vue';

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
			popup,
			loading
		},
		data () {
			return {
				showLoading: false,//加载动画显示;
				defaultIndex: 0,
				popupText: '',
				title: '商品详情',
				activeCode: '',
				total: 0, //商品显示价格
				maxAvailAmount: 0, //客户信用额度
				downPayment: 0, //商品首付款；
				initPayment: 0, //电信产品首付款
				realDownPayment: 0,//实际首付款；
				periodPrice: 0,//分期首付；
				changePrice: false, //商品单价显示切换；
				packagePrice: 0, //套餐价格；
				telecomProdList: [],//套餐选择列表
				qty: 1,
				showList: true, //显示套餐标识 ；
				sum: 0, //商品价格 + 利息 + 套餐，
				meal: 0, //商品套餐，
				sendCapitalProdList: [],//传到组件的分期列表--增加了每个月应还的金额 
				capitalProdList: [], //当前分期列表
				capitalSelected: {},//用户选择的分期；
				mealList: [], //套餐列表
				mealSelected: {}, //用户选择的套餐；
				goods: {}, //商品介绍
				photoList: [], //轮播图片
				collectStatus: '0', //收藏状态 1 为已收藏，0 为未收藏；
				capitalChoosed: '', //分期选择提示；
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
			this.showLoading = true;
			console.log(this.options)
			api.queryGoodsDetail(this.options).then(res => {
				console.log(res);
				if(res.data.errcode == 1) {
					this.showLoading = false;
					this.maxAvailAmount = res.data.maxAvailAmount;
					this.goods = res.data.goodsBaseInfo;//商品详细信息
					this.total = res.data.goodsBaseInfo.goodsPrice;//商品默认价格；
					this.photoList = res.data.photoList; //轮播图
					this.collectStatus = res.data.goodsBaseInfo.collectStatus;//收藏状态；
					this.capitalProdList = res.data.capitalProdList;//分期选择列表；
					this.mealList = res.data.mealList;//套餐选择列表；
					this.skuDetailList = res.data.skuDetailList;//商品规格i属性d拼接数组；
					this.skuGroupList = res.data.skuGroupList;//商品规格属性数组
					this.activeCode = res.data.goodsBaseInfo.activeCode;//租机类型；
					
					//是否配置电信产品，考虑电信产品产付款；默认为？？？
					if(res.data.isTelConf == 1){
						try{
							this.packagePrice =  res.data.telecomProdList[0].price;
							//政府租机特殊处理；
							if(res.data.goodsBaseInfo.activeCode != 'gz_rent_phone') {
								//个人租机首付；
								this.downPayment = res.data.goodsBaseInfo.downPayment;//商品首付；
								this.initPayment = res.data.telecomProdList[0].initPayment;
								
								// this.realDownPayment = this.realDownPayment + this.initPayment;
								//计算一番得出默认最小分期数的金额；
								this.capitalProdList.map((item, index) => {
									if(index == 0) {
										//商品+套餐的总价格；
										var sum = this.total * (1 + item.monthFee * item.periods) + this.packagePrice;
										//商品首付;
										sum = sum.toFixed(2);
										var downPayment = sum - this.downPayment - this.initPayment;
										//首付与额度比较 ，得出实际首付款；
										var realDownPayment;
										var gap = 0;
										if((downPayment-this.maxAvailAmount) > 0) {
											//额度为0时；
											if(this.maxAvailAmount == 0) {
												realDownPayment = this.total + this.packagePrice;
												console.log(realDownPayment)
											} else {

												//补差额；
												gap = downPayment - this.maxAvailAmount;
												//当客户额度 < 应付首付时，实际首付款 = 商品首付款 + 套餐首付款 - 差价；
												realDownPayment = this.downPayment + this.initPayment + gap;
											}
										} else {
											realDownPayment = this.downPayment + this.initPayment;
										};
										this.realDownPayment = realDownPayment;
									}
								});
							}
							this.mealSelected = res.data.telecomProdList[0];
						} catch(err){
							console.log('没有配置电信产品！', err)
						}
						
					};
			
					//默认套餐价格；
					this.telecomProdList = res.data.telecomProdList; 
					if(res.data.telecomProdList.length > 0) {
						this.mealChoosed = res.data.telecomProdList[0].prodName;
						this.packagePrice = res.data.telecomProdList[0].price;
					};

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
			//分期选择
			select (data) {
				console.log('调用成功了！', data);
				this.capitalSelected = JSON.parse(data);

			},
			// 选择套餐
			selectPackage (data) {
				console.log('显示套餐'+ data);
				this.mealSelected = JSON.parse(data);

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
			handleChange (val) {
				
			},
			next () {
				if(!this.capitalChoosed) {
					this.$message({
						message: '请选择套餐',
						type: 'warning'
					});
					return false;
				}
				this.$router.push({name: 'rentDetail', query: option});
			},
			//选择完成；
			completed () {
				if(this.showList) {
					console.log('套餐')
				} else {
					console.log('分期')
					if(!this.capitalSelected.prodName){
						this.$message({
							message: '请选择分期！',
							type: 'warning'
						})
						return false;
					}
					this.capitalChoosed = this.capitalSelected.prodName;
					this.capitalChoosed = `￥${this.capitalSelected.monthPay} x ${this.capitalSelected.periods} 期,${this.capitalSelected.prodDesc}`

					//插入在显示的值；
					var html = `<p>分期：￥<span>${this.capitalSelected.monthPay}</span> x <span>${this.capitalSelected.periods}</span> 期</p>`;
					$('.fixed_bottom_l').find('div').html(html);
				}
				this.show = false;
			},
			//显示套餐列表；
			showPackage () {
				this.show = true;
				this.showList = true;
				// if(this.showList) {
				// 	this.packagePrice = this.mealSelected.price;
				// 	//政府租机特殊处理；
				// 	if(this.activeCode != 'gz_rent_phone') {

				// 		this.initPayment = this.mealSelected.initPayment;
				// 	};
				// 	this.mealChoosed = this.mealSelected.prodName;
				// } else {
				// 	console.log(this.capitalSelected)
					// if(!this.capitalSelected.prodName){
					// 	this.$message({
					// 		message: '请选择分期！',
					// 		type: 'warning'
					// 	})
					// 	return false;
					// }
					// this.capitalChoosed = this.capitalSelected.prodName;

					/*this.capitalChoosed = `￥${this.capitalSelected.monthPay} x ${this.capitalSelected.periods} 期,${this.capitalSelected.prodDesc}`

					//插入在显示的值；
					var html = `<p>分期：￥<span>${this.capitalSelected.monthPay}</span> x <span>${this.capitalSelected.periods}</span> 期</p>`;
					$('.fixed_bottom_l').find('div').html(html);*/
				// }
				// this.show = !this.show;
				// this.showList = true;

			},
			//显示分期列表
			showCapitalProdList () {
				this.show = !this.show;
				this.showList = false;
				//计算分期价格；
				var arr = [];
				this.capitalProdList.map((item, index) => {
					//每个月需要支付的价格：[(商品总价 + 套餐价格 - 商品首付 - 电信产品首付）* （1 + 月利率 * 分期数)]/分期数；
					/*var monthPay = (this.total + this.packagePrice - this.downPayment - this.initPayment) * (1 + item.monthFee * item.periods) /  item.periods;
					var obj = Object.assign({}, item, {monthPay: monthPay.toFixed(2), downPayment: this.downPayment, defaultIndex: index });
					arr.push(obj);

					console.log(monthPay);*/

					//政府租机特殊处理；
					if(this.activeCode != 'gz_rent_phone') {
						//商品+套餐的总价格；
						var sum = this.total * (1 + item.monthFee * item.periods) + this.packagePrice;
						//商品首付;
						var downPayment = sum - this.downPayment - this.initPayment;
						//首付与额度比较 ，得出实际首付款；
						var realDownPayment;
						var gap;
						if((downPayment - this.maxAvailAmount) > 0) {
							//补差额；
							gap = downPayment - this.maxAvailAmount;
							//当客户额度 < 应付首付时，实际首付款 = 商品首付款 + 套餐首付款 - 差价；
							realDownPayment = this.downPayment + this.initPayment + gap;
						} else {
							realDownPayment = this.downPayment + this.initPayment;
						};
						// this.realDownPayment = realDownPayment;

						var monthPay = (sum - realDownPayment) / item.periods;

						var obj = Object.assign({}, item, {monthPay: monthPay.toFixed(2), realDownPayment: realDownPayment, defaultIndex: index });
						arr.push(obj);
					} else {
						//商品+套餐的总价格；
						var sum = this.total * (1 + item.monthFee * item.periods) + this.packagePrice;
						//分期金额；
						var monthPay = sum / item.periods;
						var obj = Object.assign({}, item, {monthPay: monthPay.toFixed(2), downPayment: 0, defaultIndex: index });
						arr.push(obj);
					}
					
				});
				this.sendCapitalProdList = arr;
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    }
		}
	}
</script>