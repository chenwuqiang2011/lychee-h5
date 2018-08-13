<template>
	<div class="home">
		<div class="header">
			<div class="header_l" @click = "$router.push('/city')">
				<span v-text = "city.city" class = "selectedCity"></span>
				<i class = "triangle_down"></i>
			</div>
			<div class="header_r">
				<search :placeholder = "'搜索商品'"></search>
			</div>
		</div>
		<div class="content" ref = "wrapper">
			<div class="content_body">
				<!-- 轮播图 -->
				<div class="lamp" v-if = "bannerList.length > 0">
					<swiper :options="swiperOption">
					    <swiper-slide 
					    	v-for = "(item, index) in bannerList"
					    	:key = "index"
					    	>
					    	<img :src="imgurl + item.imgPath " alt = "">
					    </swiper-slide>
					    <div class="swiper-pagination"  slot="pagination"></div>
					</swiper>
				</div>
				<!-- 分类图标 -->
				<div class="category" @click = "abc">
					<div class="xyzj" 
						@click = "$router.push({name: 'phoneList', query: {category: index + 1}})"
						v-for = "(item, index) in navList"
						:key = "index"
						:data-id = "item.id"
						>
						<img class = "icon icon_zj" v-lazy = "imgurl + item.imgPath">
						<p>{{item.navTitle}}</p>
					</div>
					
				</div>
				<!-- 商品列表 -->
				<div class="goods">
					<h1>推荐机型</h1>
					<goodslist :goodslist = "goodslist"></goodslist>
					<h1>热销套餐</h1>
					<packageHot></packageHot>
				</div>
			</div>
		</div>
		<!-- <div class="footer">底部</div> -->
		<tabbar :name = '"home"'></tabbar>
		<loading v-if = "show"></loading>
	</div>
</template>
<script>
	import './home.scss';
	import tabbar from '../tabbar.vue';
	import loading from '../loading.vue';
	import search from '../search.vue';
	import goodslist from '../goodslist.vue';
	import packageHot from '../package_hot.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';

	export default {
		name: 'home',
		components: {
			tabbar,
			loading,
			search,
			goodslist,
			packageHot
		},
		data () {
			return {
				show: false,
				bannerList: [], //轮播图列表
				navList: [], //导航列表
				goodslist: [],
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
					// loop
					loop: true,
					// loopAdditionalSlides: 2,
					// loopedSlides: null,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true//修改swiper的父元素时，自动初始化swiper				
				},
				imgurl: url.global.imgurl
			}
		},
		computed: {
			city: {
				get () {
					return this.$store.state.currentCity.city;
				},
				set (val) {

				}
			}
		},

		created () {
			var options = {
				openId: this.$store.state.currentCity.openId,
				provinceCode: this.$store.state.currentCity.city.provinceCode,
				cityCode: this.$store.state.currentCity.city.cityCode
			}
			console.log(options);
			//获取推荐商品列表 
			// this.show = true;
			api.hotProducts(options).then(res => {

				console.log(res);
				if(res.data.errcode == 1) {
					this.goodslist = res.data.hotPhoneList;
					this.show = false;
				}
			});

			//获取轮播图及导航图；
			api.getBannerAndNav(options).then(res => {
				console.log(res);
				if(res.data.errcode == 1) {
					this.bannerList = res.data.bannerList;
					this.navList = res.data.navList;
				}
			})			
		},
		methods: {
			abc () {
				console.log(123)
			}
		}
	}
	
</script>