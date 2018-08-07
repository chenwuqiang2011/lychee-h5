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
					    <swiper-slide><img src="../../assets/imgs/s7.png" alt = ""></swiper-slide>
					    <div class="swiper-pagination"  slot="pagination"></div>
					</swiper>
				</div>
				<div class="goods_desc">
					<p v-text = "goods.name"></p>
					<div class="price_collect">
						<span class = "price" v-text = "goods.nowPrice"></span>
						<div class="collect" @click = "collected = !collected">
							<i :class = "collected? 'active' : '' "></i>
							<span>收藏</span>
						</div>
					</div>
				</div>
				<!-- 商品规格 -->
				<div class="goods_size">
					<div class="size_item">
						<p>容量{{qty}}</p>
						<ul>
							<li :class = "index == 1? 'active' : '' " @click = "getCapacity" data-index = '1'>32G</li>
							<li :class = "index == 2? 'active' : '' " @click = "getCapacity" data-index = '2'>64G</li>
						</ul>
					</div>
					<div class="size_item">
						<p>颜色</p>
						<ul>
							<li :class = "index2 == 1? 'active' : '' " @click = "getColor" data-index2 = '1'>玫瑰金</li>
							<li :class = "index2 == 2? 'active' : '' " @click = "getColor" data-index2 = '2'>白色</li>
							<li :class = "index2 == 3? 'active' : '' " @click = "getColor" data-index2 = '3'>黑色</li>
						</ul>
					</div>
					<div class="size_item">
						<p>数量</p>
						<el-input-number v-model="qty" @change="handleChange" :min="1" size="small"></el-input-number>
					<!-- 	<div>
							<span>-</span>
							<el-input v-model="qty" placeholder="请输入内容"></el-input>
							<input type="" name="">
							<span>+</span>
						</div> -->
						<p class = "stock">库存<span>256</span></p>
						
					</div>	
				</div>
				<!-- 商品套餐 -->
				<div class="goods_package" @click = "showPackage">
					<span>套餐</span>
					<p v-text = "userChoosed || '请选择套餐' "></p>
					<i></i>	
				</div>
			
				<!-- 商品参数 -->
				<div class="goods_package">
					<span>产品参数</span>
					<p></p>
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
				<div class="mask" @click = "showPackage"></div>
				<el-tabs v-model="activeName" @tab-click="handleClick" class = "packages">
					<el-tab-pane label="融合套餐" name="first"  >
						<doublePackage @choose = "select"></doublePackage>
					</el-tab-pane>
					<el-tab-pane label="单产品套餐" name="second" >
						<singlePackage :show = "false" @choose = "select"></singlePackage>
					</el-tab-pane>
				</el-tabs>
				
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
	</div>
</template>
<script>
	import back from '../back.vue';
	import packages from '../package_hot.vue';
	import singlePackage from '../singlePackage.vue';
	import doublePackage from '../doublePackage.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';
	import './goodsDetail.scss';

	export default {
		components: {
			back,
			packages,
			doublePackage,
			singlePackage
		},
		data () {
			return {
				id: null,
				capacity: null, //商品容量
				color: null, //商品颜色
				title: '商品详情',
				total: 0, //总价
				qty: 1,
				goods: {},
				collected: false, //收藏
				userChoosed: '',
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
					coverflow: {
					　　rotate: 30,
					　　stretch: 10,
					　　depth: 60,
					　　modifier: 2,
					　　slideShadows : true
					}
				},
				imgurl: url.global.imgurl
			}
		},
		created () {
			this.id = this.$route.query.id
			//标题；
			// if (to.meta.title) {
			//     document.title = to.meta.title;
			// }
			api.getProduct({id: this.id}).then(res => {
				console.log(res);
				this.goods = res.data.data[0];
				this.total = res.data.data[0].nowPrice;
				this.capacity = '32G';
				this.color = '白色';
			});
		},
		mounted () {
			
		},
		methods: {
			select (data) {
				console.log('调用成功了！', data);
				this.userChoosed = data;
			},
			getCapacity (e) {console.log(e, e.target.innerHTML)
				this.index = e.target.dataset.index;
				this.capacity = e.target.innerHTML;

			},
			getColor (e) {
				this.index2 = e.target.dataset.index2;
				this.color = e.target.innerHTML;

			},
			handleChange (val) {
				console.log(val, this.qty);
				this.total = (this.qty * this.goods.nowPrice).toFixed(2);

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
				console.log(this.index, this.index2, this.collected, typeof this.total, this.qty);
				if(!this.userChoosed) {
					this.$message({
						message: '请选择套餐',
						type: 'warning'
					});
					return false;
				}
				this.$router.push({name: 'rentDetail', query: option});
			},
			showPackage () {
				this.show = !this.show;
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    }
		}
	}
</script>