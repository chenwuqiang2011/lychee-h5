<template>
	<div class="rentDetail">
		<!-- 顶部固定条 -->
		<div class="fixed_top">
			<back :title = "title"></back>
		</div>
		<div class="rentMsg">
			<div class="userMsg">
				<h3>用户信息</h3>
				<div class="userMsgDetail">
					<p>姓名：<span>张三</span></p>
					<p>电话：<span>13800138000</span></p>
					<p>身份证号码：<span>138001380001380013</span></p>
				</div>
			</div>
			<div class="phoneMsg">
				<h3>租机信息</h3>
				<div class="phoneMsgDetail">
					<div class="phoneMsgDetail_l">
						<img src="../../assets/imgs/s7.png">
					</div>
					<div class="phoneMsgDetail_r">
						<h2>全网通4G手机全网通4G手机全网通4G手机全网通4G手机全网通4G手机全网通4G手机</h2>
						<p>颜色：<span v-text = "option.color"></span></p>
						<p>容量：<span v-text = "option.capacity"></span></p>
						<p>套餐：<span v-text = "option.package">融合套餐299元</span></p>
					</div>
				</div>
				<div class="congratulate">
					<p>恭喜您获得购买资格</p>
					<p>您仅需支付:<span v-text = "option.total"></span></p>
					<button @click = "submit">提交</button>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import back from '../back.vue';
	import url from '../../assets/common/common.js';
	import api from '../../api/api.js';
	import Bscroll from 'better-scroll';
	import './rentDetail.scss';

	export default {
		components: {
			back

		},
		data () {
			return {
				title: '',
				option: {
					total: 0,
					color: null,
					capacity: null,
					package: null
				},
				imgurl: url.global.imgurl
			}
		},
		created () {
			var option = this.$route.query;
			console.log(option);
			this.option = option;
			// this.total = option.total;
			// this.color = option.color;
			// this.capacity = option.capacity;
			// this.package = option.package;
			//标题；
			if (this.$route.meta.title) {
				this.title = this.$route.meta.title;

			    // document.title = to.meta.titl; //浏览器标题；
			}
			
		},
		mounted () {
			
		},
		methods: {
			submit () {
				this.$router.push({name: 'rentDetailEwm', query: this.option});
			}
		}
	}
</script>