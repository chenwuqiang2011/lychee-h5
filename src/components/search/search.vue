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
		<div class="cwq_search_goodslist" v-if = "!show">
			<goodslist :goodslist = "goods" :show = "false" :hot = "false"></goodslist>
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
	export default {
		data () {
			return {
				keyWord: '',
				options: {},
				historyList:[],
				hotWordList: [],
				goods: [],
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
				//搜索商品；
				var params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					keyWord: this.keyWord,
					openId: this.$store.state.currentCity.openId,
					provinceCode: this.$store.state.currentCity.city.provinceCode,
					cityCode: this.$store.state.currentCity.city.cityCode,
				}
				this.isShow = true;
				api.queryGoodsByKeyWord(params).then(res => {
					console.log(res);
					if(res.data.errcode == 1){
						this.isShow = false;
						this.goods = res.data.goodsList;
					}
				})
			},
			//清空搜索历史；
			clearHistory () {
				localStorage.removeItem('searchHistory');
				this.historyList = [];
			}
		}
	}
</script>