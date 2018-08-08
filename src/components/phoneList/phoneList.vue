<template>
	<div class="phoneList">
		<div class="phone_head">
			<div class="phone_search">
				<i class = "back_icon"></i>
				<div class = "phone_search_r">
					<search :placeholder = "'搜索商品'"></search>
				</div>
			</div>
			<div class="phone_sort">
				<div class="phone_sort_item">
					<span>推荐</span>
				</div>
				<div class="phone_sort_item">
					<span>价格</span>
					<i class = "up_and_down"></i>
				</div>
				<div class="phone_sort_item" @click = "filter">
					<span>筛选</span>
					<i class = "filter"></i>
				</div>
			</div>
		</div>
		<div class="phone_body" ref = "wrapper">
			<div class="phone_goods">
				
				<goodslist :goodslist = "goods" :show = "false"></goodslist>
			</div>
		</div>
		<loading v-if = "show"></loading>
		<slideBar></slideBar>
	</div>
</template>
<script>
	import search from '../search.vue';
	import goodslist from '../goodslist.vue';
	import loading from '../loading.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';

	//侧栏显示；
	import slideBar from '../test.vue';

	import './phoneList.scss';
	export default {
		data(){
			return {
				pageNo: 1,
				qty: 10,
				goods: [],
				loading: 50,
				show: false
			}
		},
		components: {
			search,
			goodslist,
			loading,
			slideBar
		},
		methods: {
			getProducts () {
				this.show = true;
				api.queryProducts({pageNo: this.pageNo, qty: this.qty}).then(res => {
					console.log(res);
					//没有更多数据时，提示
					this.goods = this.goods.concat(res.data.data);
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
								this.pageNo++;
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
			}
		},
		created(){
			this.getProducts();
		}
	}
</script>

