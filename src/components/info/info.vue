<template>
	<div class="info">
		<div class="info_head">
			<back :title = "'我的'"></back>
		</div>
		<div class="info_content">
			<div class="info_score" v-if = "isCredited">
				<score :score = "userScore" :time = "lastScoreTime"></score>
				<div class="showMyCredit">
					<p>晒晒我的信用分</p>
					<p>了解我的信用分</p>
				</div>
			</div>
			<div class="info_score_isShow" v-if = "!isCredited">
				<img src="../../assets/imgs/userIcon.png">
				<span class = "bindNow" @click = "bindNow">立即激活</span>
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
					<li @click = "toPersonalMsg">
						<i class = "icon_personal_msg"></i>
						<p>个人信息</p>
					</li>
					<li @click = "toRecord">
						<i class = "icon_personal_msg_record"></i>
						<p>负面记录</p>
						<span>(0)个</span>
					</li>
					<li @click = "toCredit">
						<i class = "icon_personal_credit"></i>
						<p>信用互查</p>
					</li>
					<li @click = "toOrder">
						<i class = "icon_personal_order"></i>
						<p>我的订单</p>
					</li>
				</ul>
			</div>
			<!-- 信用生活 -->
			<div class="info_life">
				<h2>信用生活</h2>
				<div class="info_life_msg">
					
				</div>
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
	import score from './score.vue';
	import api from '../../api/api.js';
	import $ from 'jquery';

	export default {
		name: 'info',
		components: {
			back,
			tabbar,
			score
		},
		data () {
			return {
				username: '',//用户名；
				phoneNo: '',//用户手机
				avatarUrl: '',//用户头像
	            isStaff: '',//是否为营业员
	            isBinding: '',//是否绑定 
	            isCredited: '',//是否授信
	            negativeCount: '',//负面记录
	            userScore: '',//信用分
	            lastScoreTime: '',//评估时间
	            creditLifeList: '',//信用生活列表
	            userId: ''//用户id
			}
		},
		created () {
			var params = {};
			params["openId"]= this.$store.state.currentCity.openId;
            params["provinceCode"]=this.$store.state.currentCity.city.provinceCode;
            params["cityCode"]=this.$store.state.currentCity.city.cityCode;
			api.getUserInfo(params).then( res => {
				
				console.log(res);
				if(res.data.errcode == 1) {
		            this.isStaff = res.data.userInfo.isStaff;//是否为营业员
		            this.isBinding = res.data.userInfo.isBinding;//是否绑定 
		            this.isCredited = res.data.userInfo.isCredited;//是否授信
		            this.negativeCount = res.data.userInfo.negativeCount;//负面记录
		            this.userScore = res.data.userInfo.userScore;//信用分
		            this.lastScoreTime = res.data.userInfo.lastScoreTime;//评估时间
		            this.creditLifeList = res.data.creditLifeList;//信用生活列表
		            this.userId = res.data.userInfo.userId;//用户id
		            this.username = res.data.userInfo.userName || res.data.userInfo.nickName;//用户名；
		            this.phoneNo = res.data.userInfo.phoneNo;//用户名；
		            this.avatarUrl = res.data.userInfo.avatarUrl;//用户头像；
				}
			})
		},
		mounted () {
	
		},
		methods: {
			bindNow () {
				if(this.isBinding == 0) {
					this.$router.push('/info/bindPhone');
				} else if(this.isCredited == 0) {
					this.$router.push('/info/application');
				}
			},
			toPersonalMsg () {
				this.check(() => {
					this.$router.push({name: 'personalMsg', query: {username: this.username, phoneNo: this.phoneNo, avatarUrl: this.avatarUrl}});
				})
				
			},
			toRecord () {
				this.check(() => {
					this.$message({
						message: '敬请期待！',
						type: 'info'
					})
				})

			},
			toCredit () {
				this.check(() => {
					this.$message({
						message: '敬请期待！',
						type: 'info'
					})
				})
			},
			toOrder () {
				this.check(() => {
					this.$message({
						message: '敬请期待！',
						type: 'info'
					})
				})
			},
			check (cb) {
				var isBinding = this.isBinding;
		        var isCredited = this.isCredited;
		        
		        if (isBinding == 0 && isCredited == 0) {
		        	this.$confirm('您还没激活，是否立即激活?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/info/bindPhone');
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
					return false;
		        } else if (isBinding == 1 && isCredited == 0) {
    	        	this.$confirm('您还没授信，是否立即授信?', '提示', {
    					confirmButtonText: '确定',
    					cancelButtonText: '取消',
    					type: 'warning'
    				}).then(() => {
    					this.$router.push({name: 'application', query: {phoneNo: this.phoneNo}});
    				}).catch(() => {
    					this.$message({
    						type: 'info',
    						message: '已取消'
    					});          
    				});
					return false;
		        } else if (isBinding == 0 && isCredited == 1) {
    	        	this.$confirm('您还没激活，是否立即激活?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/info/bindPhone');
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
					return false;
		        } else {
		        	typeof cb == "function" & cb();
		        }
			}
		}
	}
	
</script>