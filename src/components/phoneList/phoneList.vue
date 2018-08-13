<template>
	<div class="phoneList">
		<div class="phone_head">
			<div class="phone_search">
				<!-- <i class = "back_icon" @click = "$router.go(-1)"></i>
				<div class = "phone_search_r">
					<search :placeholder = "'搜索商品'"></search>
				</div> -->
				<back :title = "'信用租机'"></back>
			</div>
			<div class="phone_sort">
				<div class="phone_sort_item" @click = "commend">
					<span>推荐</span>
				</div>
				<div class="phone_sort_item" @click = "upAndDown" ref = "upAndDown">
					<span>价格</span>
					<i class = "up_and_down"></i>
				</div>
				<div class="phone_sort_item" @click = "filter">
					<span>筛选</span>
					<i class = "filter"></i>
				</div>
				<div class="phone_sort_item" @click = "$router.push('/search')">
					<span>搜索</span>
					<i class = "search"></i>
				</div>
			</div>
		</div>
		<div class="phone_body" ref = "wrapper">
			<div class="phone_goods">
				
				<goodslist :goodslist = "goods" :show = "false" :hot = "false"></goodslist>
			</div>
		</div>
		<loading v-if = "show"></loading>
		<slideBar @getFilter = "getFilter"></slideBar>
	</div>
</template>
<script>
	import back from '../back.vue';
	import search from '../search.vue';
	import goodslist from '../goodslist.vue';
	import loading from '../loading.vue';
	import url from '../../assets/common/common.js';
	import city from '../../assets/common/city.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';
	import $ from 'jquery';

	//侧栏显示；
	import slideBar from './phoneFilter.vue';

	import './phoneList.scss';
	export default {
		data(){
			return {
				category: '',
				totalPage: 0,
				pageNum: 1, 
				pageSize: 10,
				goods: [], 
				show: false,
				minPrice: '',
				maxPrice: '',
				sortList: [],
				queryCateList: []
			}
		},
		components: {
			back,
			search,
			goodslist,
			loading,
			slideBar
		},
		created(){
			this.$store.dispatch('hideSideBar');
			this.category = this.$route.query.category;
			this.getProducts();
			/*
				searchLetterList: searchLetterList,
				cityList: cityList,
				cityObjs: cityObjs,
				localCodeInfo: localCodeInfo
			*/
		},
		methods: {
			//推荐
			commend (e) {
				this.goods = [];
				this.pageNum = 1;
				this.sortList = [];
				this.queryCateList = [];
				this.minPrice = '';
				this.maxPrice = '';
				$(this.$refs.upAndDown).find('i').removeClass('up down');
				// this.sortList.push();
				this.getProducts();
			},
			// 价格排序
			upAndDown (e) {
				this.goods = [];
				this.pageNum = 1;
				console.log(this.$refs.upAndDown)
				$(this.$refs.upAndDown).find('i').toggleClass('down');
				if($(this.$refs.upAndDown).find('i').hasClass('down')){
					$(this.$refs.upAndDown).find('i').removeClass('up');
					this.sortType = 'desc';
					var options = {
						paramName: 'price',
						sortType: 'desc'
					};
					if(this.isJson(this.sortList)) {
						this.sortList = JSON.parse(this.sortList);
					};
					this.sortList.splice(0, this.sortList.length, options);
				} else {

					console.log('升')
					this.sortType = 'asc';
					var options = {
						paramName: 'price',
						sortType: 'asc'
					};
					if(this.isJson(this.sortList)) {
						this.sortList = JSON.parse(this.sortList);
					};
					this.sortList.splice(0, this.sortList.length, options);
					console.log(this.sortList)
					$(this.$refs.upAndDown).find('i').addClass('up');
				}
				this.sortList = JSON.stringify(this.sortList);

				this.getProducts();
			},
			isJson (str) {
				if (typeof str == 'string') {
			        try {
			            var obj=JSON.parse(str);
			            if(typeof obj == 'object' && obj ){
			                return true;
			            }else{
			                return false;
			            }

			        } catch(e) {
			            console.log('error：'+str+'!!!'+e);
			            return false;
			        }
			    }
			    console.log('It is not a string!');
			},
			getProducts () {
				this.show = true;
				var options = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					category: this.category,
					sortList: this.sortList,
					queryCateList: this.queryCateList,
					minPrice: this.minPrice,
					maxPrice: this.maxPrice,
					openId: this.$store.state.currentCity.openId,
					provinceCode: this.$store.state.currentCity.city.provinceCode,
					cityCode: this.$store.state.currentCity.city.cityCode,

				};
				console.log(options)
				api.queryGoodsList(options).then(res => {
					
					if(res.data.errcode == 1) {
						this.goods = this.goods.concat(res.data.goodsList);
						
						this.totalPage = res.data.totalPage;
						//没有更多商品时，在列表最后追加动态元素
						if(this.pageNum == res.data.totalPage) {
							//没有更多商品时，在列表最后追加动态元素;
							if($('.phone_goods').find('.no_more').length != 0) {
								$('.no_more').remove();
							};
							$('.phone_goods').append(`<p class = "no_more">暂无更多商品</p>`);
						} else {
							
							$('.no_more').remove();
						};

						
						console.log(res);
					}
					//没有更多数据时，提示
					// this.goods = this.goods.concat(res.data.goodsList);
					this.show = false;
					if(!this.scroll){
						this.$nextTick(()=>{
							this.scroll = new Bscroll(this.$refs.wrapper, {
								click: true, 
								probeType: 2,
								pullUpLoad:{
		                            threshold: -50, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，                    
		                        }
							});
						/*	this.scroll.on('touchEnd', (posy) =>{
								// console.log(123,posy)
							});*/
							this.scroll.on('pullingUp', (posy) => {
								if(this.pageNum < this.totalPage){
									console.log('加载更多！');
									this.pageNum++;
									this.getProducts();
								} else {
									console.log('没有更多数据时，提示');

								}
								//当你加载数据完成后还要调用finishPullUp告诉 better-scroll 数据已加载。
								this.scroll.finishPullUp();                                    
		        				this.scroll.refresh();  
								
							})
						})
					} else {
						this.scroll.finishPullUp();
						this.scroll.refresh();
					}
				});
			},
			filter () {
				this.$store.dispatch('showSideBar', this.category);
			},
			getFilter (options) {
				this.goods = [];
				console.log(options)
				this.minPrice = options.minPrice;
				this.maxPrice = options.maxPrice;
				this.queryCateList = options.queryCateList;
				this.getProducts();
			}
		}
	}
</script>

