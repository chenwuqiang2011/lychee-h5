<template>
	<div class="info">
		<div class="info_head">
			<back :title = "'我的'"></back>
		</div>
		<div class="info_content">
			<div class="info_score">
				
			</div>
			<!-- 我的收藏 -->
			<div class="info_collected">
				<div class="info_collected_item myCollected">
					<i class = "icon_collected"></i>
					<div>
						<h3>我的收藏</h3>
						<p>点击查看您收藏的宝贝</p>
					</div>
				</div>
				<div class="info_collected_item myHistory">
					<i class = "icon_history"></i>
					<div>
						<h3>信用历史</h3>
						<p>信用足迹从这里开始</p>
					</div>
				</div>
			</div>
			<!-- 信用管理 -->
			<div class="info_credit">
				<h2>信用管理</h2>
				<ul class = "info_credit_item">
					<li>
						<i class = "icon_personal_msg"></i>
						<p>个人信息</p>
					</li>
					<li>
						<i class = "icon_personal_msg_record"></i>
						<p>负面记录</p>
						<span>(0)个</span>
					</li>
					<li>
						<i class = "icon_personal_credit"></i>
						<p>信用互查</p>
					</li>
					<li>
						<i class = "icon_personal_order"></i>
						<p>我的订单</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="footer">底部</div> -->
		<tabbar :name = '"info"'></tabbar>
	</div>
</template>
<script>
	import './info.scss';
	import back from '../back.vue';
	import tabbar from '../tabbar.vue';

	export default {
		name: 'info',
		components: {
			back,
			tabbar
		},
		data () {
			return {

			}
		},
		created () {

		},
		mounted () {

		},
		method: {

		}
	}
	
</script>