<template>
	<div class="city">
		<div class="city_head">
			<back :title = "'选择城市'"></back>
			<div class="city_search">
				<input v-model="input" placeholder="城市名或者拼音查询" @input = "auto"></input>
			</div>
		</div>
		<!-- 城市列表 -->
		<div class="city_content" ref = "cityWrapper" v-show = "!isShow">
			<div>
				<div class="city_selected">
					<h5 class = "currentCity">当前选择城市</h5>
					<span @click = "setCity" :data-provincecode = "currentCity.provinceCode" :data-citycode = "currentCity.cityCode" v-text = "currentCity.city"></span>
				</div>
				<div class="city_hot">
					<h5 class = "hotCity">热门城市</h5>
					<div class="city_hot_item">
						<span 
							@click = "setCity" 
							v-for = "(item, index) in hotCity " 
							:key = "index" 
							:data-index = "index"
							:data-provincecode = "item.provinceCode" 
							:data-citycode = "item.cityCode"
							v-text = "item.city">
						</span>
						
					</div>
				</div>
				<div class="cityList" v-for = "(item, index) in cityList" :key = "index" data-index = "index" ref = "cityList">
					<h5 v-text = "item.initial"></h5>
					<p 
						v-for = "(items, idx) in item.cityInfo " 
						:key = "idx" 
						:data-idx = "idx"
						:data-provincecode = "items.provinceCode" 
						:data-citycode = "items.cityCode"
						@click = "setCity" 
						v-text = "items.city">
					</p>
				</div>
				
			</div>
		</div>
		<!-- 字母排序 -->
		<div class="cityLetterList" v-show = "!isShow">
			<p data-index = '00' @click = "toElement">当前</p>
			<p data-index = '01' @click = "toElement">热门</p>
			<p 
				v-for = "(item, index) in cityLetterList " 
				:key = "index" 
				:data-index = "index"
				v-text = "item"
				@click = "toElement">
			</p>
		</div>
		<!-- 搜索结果显示 -->
		<div class="showResult" v-show = "isShow">
			<ul class="resultList">
				<li 
					v-for = "(item, index) in completeList" 
					:key = "index"
					:data-index = "index"
					:data-provincecode = "item.provinceCode" 
					:data-citycode = "item.cityCode" 
					@click = "setCity"
					v-text = "item.city">
				</li>
			</ul>
		</div>
		<!-- 点击字母提示 -->
		<popup :text = "letter" v-show = "show" ref = "popup"></popup>
	</div>
</template>
<script>
	import back from './back.vue';
	import popup from './popup.vue';
	import Bscroll from 'better-scroll';
	import cityObj from '../assets/common/city.js';
	import $ from 'jquery';
	/*
		city.searchLetterList(),city.cityList(), city.localCodeInfo('广州')
	*/
	export default {
		data () {
			return {
				/*currentCity : {
					"cityCode": "440100", "city": "广州", "provinceCode": "440000" 
				},*/
				hotCity: [{ "cityCode": "110000", "city": "北京", "provinceCode": "110000" }, { "cityCode": "310000", "city": "上海", "provinceCode": "310000" }, { "cityCode": "440100", "city": "广州", "provinceCode": "440000" }, { "cityCode": "440300", "city": "深圳", "provinceCode": "440000" }, { "cityCode": "330100", "city": "杭州", "provinceCode": "330000" }, { "cityCode": "320100", "city": "南京", "provinceCode": "320000" }, { "cityCode": "420100", "city": "武汉", "provinceCode": "420000" }, { "cityCode": "120000", "city": "天津", "provinceCode": "120000" }, { "cityCode": "610100", "city": "西安", "provinceCode": "610000" }],
				cityCode: '',
				input: '',
				letter: '',
				show: false,
				isShow: false, //是否显示搜索结果；
				completeList: []
			}
		},
		components: {
			back,
			popup
		},
		computed: {
			cityList: {
				get () {
					return cityObj.cityList();
				},
				set (val) {

				}
			},
			cityLetterList: {
				get () {
					return cityObj.searchLetterList();
				},
				set (val) {

				}
			},
			currentCity: {
				get () {
					return this.$store.state.currentCity.city;
				},
				set (val) {

				}
			}
		},
		methods: {
			setCity (e) {
				console.log(this.currentCity)
				var e = event  || window.event;
				var provinceCode = e.target.getAttribute('data-provinceCode');
				var cityCode = e.target.getAttribute('data-cityCode');
				var city = e.target.innerHTML;
				this.currentCity.provinceCode = provinceCode;
				this.currentCity.cityCode = cityCode;
				this.currentCity.city = city;

				var option = {
					provinceCode,
					cityCode,
					city
				};
				this.$store.state.currentCity.city = option;
				this.$router.go(-1);
			},
			toElement (event) {
				var e = event  || window.event;
				if(e.target.getAttribute('data-index') == '00'){
					this.scroll.scrollToElement('.currentCity');
				} else if(e.target.getAttribute('data-index') == '01') {
					this.scroll.scrollToElement('.hotCity');
				} else {
					var index = e.target.getAttribute('data-index');
					this.scroll.scrollToElement(this.$refs.cityList[index]);
				};
				this.letter = e.target.innerHTML;

				$ ('.popup').show ().delay (500).fadeOut ().text('');
			},
			auto () {
				this.isShow = true;
			    let inputSd = this.input;
			    let sd = inputSd.toLowerCase();
			    let num = sd.length;
			    if (num == 0) {
			    	//重置列表数据；
			    	this.isShow = false;
			    	this.completeList = [];
			    	return false;
			    }
			    const cityList = cityObj.cityObjs;
			    let finalCityList = []

			    let temp = cityList.filter(
			        item => {
			            let text = item.short.slice(0, num)
			            return (text && text == sd)
			        }
			    );

			    let tempShorter = cityList.filter(
			        itemShorter => {
			            let textShorter = itemShorter.shorter.slice(0, num)
			            return (textShorter && textShorter == sd)
			        }
			    )

			    let tempChinese = cityList.filter(
			        itemShorter => {
			            let textShorter = itemShorter.city.slice(0, num)
			            return (textShorter && textShorter == sd)
			        }
			    )


			    if (temp[0]) {
			        temp.map(
			            item => {
			                let testObj = {};
			                testObj.city = item.city
			                testObj.cityCode = item.code
			                testObj.provinceCode = item.provincecode
			                finalCityList.push(testObj)
			            }
			        )
			        this.completeList = finalCityList;

			    } else if (tempShorter[0]) {
			        tempShorter.map(
			            item => {
			                let testObj = {};
			                testObj.city = item.city
			                testObj.cityCode = item.code
			                testObj.provinceCode = item.provincecode
			                finalCityList.push(testObj)
			            }
			        );
			        this.completeList = finalCityList;
			      

			    } else if (tempChinese[0]) {

			        tempChinese.map(
			            item => {
			                let testObj = {};
			                testObj.city = item.city
			                testObj.cityCode = item.code
			                testObj.provinceCode = item.provincecode
			                finalCityList.push(testObj)
			            })
			        this.completeList = finalCityList;
			    } else {
			    	this.$message({
						message: '没有找到您要找的城市哦！',
						center: true
					});
			        return
			    }
			    console.log(this.completeList)
			}
		},
		created () {
			console.log(localStorage.getItem("lycheeMsg"));
		},
		mounted () {
			if(!this.scroll) {
				this.$nextTick(()=>{this.scroll = new Bscroll(this.$refs.cityWrapper, {click: true, probeType: 3})});
			} else {
				this.scroll.refresh();
			}
			console.log(this.cityList)
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/base/base.scss';
	@import '../assets/style/color/color.scss';
	.city {
		width: 100%;
		height: 100%;
		@extend %flexColumn;
		.city_head {
			.city_search {
				height: 0.8rem;
				padding: 0.27rem 0;
				border-bottom: 0.01rem solid #ececec;
				input {
					width: 80%;
					height: 0.8rem;
					display: block;
					margin: 0 auto;	
					border: none;
					font-size: 0.29rem;
					background: #f5f5f9;
					border-radius: 0.53rem;
					padding-left: 0.53rem;
				}
			}
		}
		.city_content {
			flex: 1;
			overflow-y: auto;
			padding: 0.13rem;
			// position: relative;
			h5 {
				font-size: 0.35rem;
				line-height: 1.15rem;
				background: #f5f5f9;
			}
			.city_selected {
				background: #f5f5f9;
				padding: 0 0.27rem;
				font-size: 0.35rem;
				color: #666;
				span {
					display: inline-block;
					min-width: 2.2rem;
					height: 0.87rem;
					line-height: 0.87rem;
					padding: 0 0.13rem;
					text-align: center;
					color: #00c8b4;
					border-radius: 0.13rem;
					border: 0.01rem solid #00c8b4;
				}
			}
			.city_hot {
				background: #f5f5f9;
				padding: 0 0.27rem;
				font-size: 0.35rem;
				color: #666;
				.city_hot_item {
					@extend %flexRow;
					flex-wrap: wrap;
					justify-content: space-around;
					span {
						display: block;
						width: 2.4rem;
						height: 0.87rem;
						line-height: 0.87rem;
						margin-bottom: 0.27rem;
						text-align: center;
						color: #00c8b4;
						background: #fff;
						border-radius: 0.13rem;
						border: 0.01rem solid #ececec;
					}
				}		
			}
			.cityList {
				h5 {
					padding-left: 0.27rem;
				}
				p {
					padding-left: 0.27rem;
					font-size: 0.35rem;
					height: 1.33rem;
					line-height: 1.33rem;
					border-bottom: 0.01rem solid #ededed;
					&:last-child {
						border-bottom: none;
					}

				}
			}
		}
		// 字母排序
		.cityLetterList {
			position: fixed;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			height: 100%;
			width: 0.8rem;
			@extend %flexColumn;
			justify-content: center;
			align-items: center;
			p {
				color: #00c8b4;
				line-height: 0.53rem;
				width: 100%;
				text-align: center;
			}
		}
		// 搜索结果显示
		.showResult {
			flex: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			li {
				padding: 0 0.27rem;
				height: 1.07rem;
				line-height: 1.07rem;
				font-size: 0.37rem;
				border-bottom: 0.01rem solid #ededed;
			}
		}
	}
</style>