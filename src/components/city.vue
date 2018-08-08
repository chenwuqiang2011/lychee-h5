<template>
	<div class="city">
		<div class="city_head">
			<back :title = "'选择城市'"></back>
			<div class="city_search">
				<input v-model="input" placeholder="城市名或者拼音查询"></input>
			</div>
		</div>
		<div class="city_content" ref = "cityWrapper">
			<div>
				<div class="city_selected">
					<h5 class = "currentCity">当前选择城市</h5>
					<span>广州</span>
				</div>
				<div class="city_hot">
					<h5 class = "hotCity">热门城市</h5>
					<div class="city_hot_item">
						<span>北京</span>
						<span>上海</span>
						<span>广州</span>
						<span>深圳</span>
						<span>杭州</span>
						<span>南京</span>
						<span>武汉</span>
						<span>天津</span>
						<span>西安</span>
					</div>
				</div>
				<div class="cityList" v-for = "(item, index) in cityList" :key = "index" data-index = "index" ref = "cityList">
					<h5 v-text = "item.initial"></h5>
					<p 
						v-for = "(items, idx) in item.cityInfo " 
						:key = "idx" 
						:data-idx = "idx"
						:data-provincecode = "items.provincecode" 
						:data-citycode = "items.citycode" 
						v-text = "items.city">
					</p>
				</div>
				
			</div>
		</div>
		<div class="cityLetterList">
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
				// cityList: [],
				// cityLetterList: [],
				cityCode: '',
				input: '',
				letter: '',
				show: false
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
			}
		},
		methods: {
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
			}
		},
		created () {
			
		},
		mounted () {
			if(!this.scroll) {
				this.$nextTick(()=>{this.scroll = new Bscroll(this.$refs.cityWrapper, {click: true, probeType: 3})});
			} else {
				this.scroll.refresh();
			}

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
					display: block;
					width: 2.4rem;
					height: 0.87rem;
					line-height: 0.87rem;
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

	}
</style>