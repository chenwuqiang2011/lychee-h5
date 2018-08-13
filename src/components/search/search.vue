<template>
	<div class="cwq_search">
		<div class="cwq_topFixed">
			<back :title = "'搜索'"></back>
			<div class="cwq_search_bar">
				<div class = "cwq_input">
					<i></i>
					<input type="text" name="" placeholder="请输入要查询的商品" v-model = "keyWord" @focus="inputOnblur">
					<i class = "showDelete" v-if = "showDelete" @click = "deleteKeyWord"></i>
				</div>
				<div class = "cwq_search_btn" @click = "searching">搜索</div>
			</div>
		</div>
		<div class="cwq_search_hot" v-if = "show">
			<div>
				<div class="cwq_history">
					<p>历史搜索</p>
					<span v-for = "(item, index) in historyList" :key = "index" v-text = "item" @click = "getKeyWord"></span>
				</div>
				<p class = "clearHistory" @click = "clearHistory">清空搜索历史</p>
				<div class="cwq_hotList">
					<p>热门搜索</p>
					<span v-for = "(item, index) in hotWordList" :key = "index" v-text = "item.key_name" @click = "getKeyWord"></span>
				</div>
			</div>
		</div>
		<div class="cwq_search_goodslist" v-if = "!show" ref = "wrapper">
			<div class = "appendTip">
				<goodslist :goodslist = "goods" :show = "false" :hot = "false"></goodslist>
			</div>
		</div>
		<loading v-if = "isShow"></loading>
	</div>
</template>
<script>
	import back from '../back.vue';
	import goodslist from '../goodslist.vue';
	import loading from '../loading.vue';
	import './search.scss';
	import api from '../../api/api.js';
	import $ from 'jquery';
	import Bscroll from 'better-scroll';

	export default {
		data () {
			return {
				keyWord: '',
				options: {},
				historyList:[],
				hotWordList: [],
				goods: [],
				concatGoods: [], //多页商品列表商品数组；
				show: true, //搜索热门词与商品列表标识 
				isShow: false,//加载动画
				pageNum: 1,
				pageSize: 10
			}
		},
		components: {
			back,
			goodslist,
			loading
		},
		computed: {
			showDelete: {
				get () {
					return this.keyWord.length > 0;
				},
				set (val) {

				}
			}
		},
		created () {

			var options = {
				openId: this.$store.state.currentCity.openId,
				provinceCode: this.$store.state.currentCity.city.provinceCode,
				cityCode: this.$store.state.currentCity.city.cityCode,
			};
			this.options = options;
			//获取热门词
			api.getHotWord(options).then(res => {
				console.log(res);
				if(res.data.errcode == 1) {
					this.hotWordList = res.data.hotWordList;
				}
			});
			//获取历史搜索，写入当地缓存；
			var history = localStorage.getItem('searchHistory');

			if(history) {
				history = JSON.parse(history);
				console.log(history)
				this.historyList = history.historyList;
			};
		},
		mounted () {

		},
		methods: {
			//关键词搜索商品；
			getProducts () {
				var params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					keyWord: this.keyWord,
					openId: this.$store.state.currentCity.openId,
					provinceCode: this.$store.state.currentCity.city.provinceCode,
					cityCode: this.$store.state.currentCity.city.cityCode,
				};
				api.queryGoodsByKeyWord(params).then(res => {
					console.log(res);
					if(res.data.errcode == 1){
						//商品列表；
						this.goods = this.goods.concat(res.data.goodsList);
						this.isShow = false;

						if(this.pageNum == res.data.totalPage) {
							//没有更多商品时，在列表最后追加动态元素;
							if($('.cwq_search_goodslist').find('.no_more').length != 0) {
								$('.no_more').remove();
							};
							$('.appendTip').append(`<p class = "no_more">暂无更多商品</p>`);
							console.log(2222)
						} else {
							
							$('.no_more').remove();
						};

						//better-scroll滑动
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
									if(this.pageNum < res.data.totalPage){
										console.log('加载更多！');
										this.pageNum++;
										this.getProducts();
									} else {
										console.log('没有更多数据时，提示');

										//没有更多商品时，在列表最后追加动态元素;
										// if($('.cwq_search_goodslist').find('.no_more').length != 0) {
										// 	$('.no_more').remove();
										// 	console.log('add')
										// };
										// $('.cwq_search_goodslist').append(`<p class = "no_more">暂无更多商品</p>`);
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
					}
				})
			},
			inputOnblur () {
				this.show = true;
			},
			//删除输入框关键词；
			deleteKeyWord () {
				this.keyWord = '';
			},
			//点击热门或者历史切换关键词；
			getKeyWord (e) {
				this.keyWord = e.target.innerHTML;
			},
			//搜索商品按钮事件；
			searching () {
				if(this.keyWord.trim().length == 0) {

					this.$message({
						message: '搜索关键词不能为空哦！',
						type: 'warning'
					});
					return false;
				}
				this.show = false;

				//把搜索记录写入缓存；
				var history = localStorage.getItem('searchHistory');

				if(!history){
					var arr = [this.keyWord];
					var options = {
						historyList: arr
					};
					localStorage.setItem('searchHistory', JSON.stringify(options));
					this.historyList = arr;
				} else {
					console.log(history, typeof history);
					history = JSON.parse(history);
					var arr = history.historyList;
					arr.unshift(this.keyWord);
					//去重；
					arr = arr.filter((item, index ,self) => {
						return self.indexOf(item) == index;
					})
					//历史保留个数；
					var num = 6;

					if(arr.length > num) {
						arr.splice(num, arr.length);
					}
					var options = {
						historyList: arr
					};
					localStorage.setItem('searchHistory', JSON.stringify(options));
					
					console.log(history, arr);
					this.historyList = arr;
				};
				this.isShow = true;
				this.goods = [];
				//搜索商品；
				this.getProducts();
			},
			//清空搜索历史；
			clearHistory () {
				localStorage.removeItem('searchHistory');
				this.historyList = [];
			}
		}
	}
</script>