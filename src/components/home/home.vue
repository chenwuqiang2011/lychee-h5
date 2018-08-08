<template>
	<div class="home">
		<div class="header">
			<div class="header_l" @click = "$router.push('/city')">
				<span v-text = "city"></span>
				<i class = "triangle_down"></i>
			</div>
			<div class="header_r">
				<search :placeholder = "'搜索商品'"></search>
			</div>
		</div>
		<div class="content" ref = "wrapper">
			<div class="content_body">
				<!-- 轮播图 -->
				<div class="lamp">
					<swiper :options="swiperOption" ref="mySwiper" >
					    <!-- slides -->
					    <swiper-slide><img src="../../assets/imgs/iPhone-8.jpg" alt = ""></swiper-slide>
					    <swiper-slide><img src="../../assets/imgs/iPhone-x.jpg" alt = ""></swiper-slide>
					    <!-- Optional controls -->
					    <div class="swiper-pagination"  slot="pagination"></div>
					    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
					    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
					    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
					</swiper>
				</div>
				<!-- 分类图标 -->
				<div class="category" @click = "abc">
					<div class="xyzj" @click = "$router.push('/phoneList')">
						<i class = "icon icon_zj"></i>
						<p>信用租机</p>
					</div>
					<div class="xyzj">
						<i class = "icon icon_fare"></i>
						<p>电话费</p>
					</div>
					<div class="xyzj">
						<i class = "icon icon_tv"></i>
						<p>电视机</p>
					</div>
					<div class="xyzj">
						<i class = "icon icon_router"></i>
						<p>路由器</p>
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
	</div>
</template>
<script>
	import './home.scss';
	import tabbar from '../tabbar.vue';
	import search from '../search.vue';
	import goodslist from '../goodslist.vue';
	import packageHot from '../package_hot.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';

	export default {
		name: 'home',
		components: {
			tabbar,
			search,
			goodslist,
			packageHot
		},
		data () {
			return {
				id: 123,
				goodslist: [],
				city: '广州',
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

		},
		mounted () {
			var id = this.$route.query.id;
			this.id = id;
			// console.log(id);
			// console.log(this.$route, this.$router);
			// var a = api.abc(0);
			// a.then(function(res) {
			// 	console.log(res)
			// }).catch(res => {
			// 	console.log(res);
			// });
			// api.a();
			api.queryProducts({pageNo: 5, qty: 15}).then(res => {
				console.log(res);
				this.goodslist = res.data.data;
			});
			//better-scroll;
			// this.$nextTick(() => { this.scroll = new Bscroll(this.$refs.wrapper, { click : true}) })
			
		},
		methods: {
			abc () {
				console.log(123)
			}
		}
	}
	
</script>