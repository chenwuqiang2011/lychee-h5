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
				<div class="phone_sort_item" @click = "filter">
					<span>搜索</span>
					<i class = "search"></i>
				</div>
			</div>
		</div>
		<div class="phone_body" ref = "wrapper">
			<div class="phone_goods">
				
				<goodslist :goodslist = "goods" :show = "false"></goodslist>
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
				pageNum: 1,
				pageSize: 10,
				goods: [],
				loading: 50,
				show: false,
				sortType: ''
			}
		},
		components: {
			back,
			search,
			goodslist,
			loading,
			slideBar
		},
		methods: {
			//推荐
			commend (e) {
				$(this.$refs.upAndDown).find('i').removeClass('up down');
				this.sortType = '';
				this.getProducts();
			},
			// 价格排序
			upAndDown (e) {
				console.log(this.$refs.upAndDown)
				$(this.$refs.upAndDown).find('i').toggleClass('down');
				if($(this.$refs.upAndDown).find('i').hasClass('down')){
					this.sortType = 'desc';
					$(this.$refs.upAndDown).find('i').removeClass('up');
				} else {
					this.sortType = 'asc';
					$(this.$refs.upAndDown).find('i').addClass('up');
				}
				console.log(this.sortType);
				this.getProducts();
			},
			getProducts () {
				this.show = true;
				var options = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					category: this.category,
					sortType: this.sortType, 
					openId: this.$store.state.currentCity.openId,
					provinceCode: this.$store.state.currentCity.city.provinceCode,
					cityCode: this.$store.state.currentCity.city.cityCode,

				};
				console.log(options)
				api.queryGoodsList(options).then(res => {
					console.log(res);
					if(res.data.errcode == 1) {
						this.goodslist = res.data.goodsList;
					}
					//没有更多数据时，提示
					// this.goods = this.goods.concat(res.data.data);
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
								console.log('加载更多！')
								this.pageNum++;
								this.getProducts();
								//当你加载数据完成后还要调用finishPullUp告诉 better-scroll 数据已加载。
								//this.scroll.finishPullUp();                                    
		        				//this.scroll.refresh();  
								// if(this.scroll.y <= (this.scroll.maxScrollY + 50) && this.loading) {
								// 	console.log('加载')
								// }
							})
						})
					} else {
						this.scroll.finishPullUp();
						this.scroll.refresh();
					}
				});
			},
			filter () {
				this.$store.dispatch('showSideBar');
			},
			getFilter (option) {
				console.log(option)
			}
		},
		created(){
			console.log(this.$route.query.category);
			this.category = this.$route.query.category;
			this.getProducts();
			/*
				searchLetterList: searchLetterList,
				cityList: cityList,
				cityObjs: cityObjs,
				localCodeInfo: localCodeInfo
			*/
		}
	}
</script>

