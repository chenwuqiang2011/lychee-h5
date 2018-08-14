<template>
	<div class="personalMsg">
		<div class = "personalMsg_back">
			<back :title = "'个人信息'"></back>
		</div>
		<div class="personalMsg_content">
			<div class="personalMsg_head">
				<div class="userImg">
					<img :src="avatarUrl" alt="头像">
				</div>
				<div class="userMsg">
					<p class = "username" v-text = "username"></p>
					<p clas = "phoneNo">{{phoneNo}}<span class = "unbindUser" @click= "unbindUser">[解除绑定]</span></p>
				</div>
			</div>
			<div class="personalMsg_base" v-for = "(item, index) in cateList" :key = "index" :data-id = "item.cateId">
				<h3 v-text = "item.cateName"></h3>
				<div class = "educational" v-for = "(item2, index2) in item.creditItemList" :key = "index2" :data-id = "item2.itemId">
					<p v-text = "item2.itemName"></p>
					<i></i>
				</div>
			</div>
			<div class="personalMsg_tips">
				补充完整以上信息，可以更全面的评估你的信用状况。您的个人信息以严格的认证标准进行保护，未经你的授权不会对任何第三方提供。
			</div>
		</div>
	</div>
</template>
<script>
	import back from '../../back.vue';
	import api from '../../../api/api.js';
	export default {
		data () {
			return {
				cateList: '',
				userItemList: '',
				username: '',//用户名；
				phoneNo: '',//用户手机
				avatarUrl: '',//用户头像
			}
		},
		components: {
			back	
		},
		created () {
			this.username = this.$route.query.username;
			this.phoneNo = this.$route.query.phoneNo;
			this.avatarUrl = this.$route.query.avatarUrl;
        	var params = {};
            params["userId"] = this.$store.state.currentCity.userId;
        	params["openId"] = this.$store.state.currentCity.openId;
            params["provinceCode"] = this.$store.state.currentCity.city.provinceCode;
            params["cityCode"] = this.$store.state.currentCity.city.cityCode;
            api.userInfo(params).then( res => {
            	console.log(res);
            	if(res.data.errcode == 1) {
            		this.cateList = res.data.cateList;
            		this.userItemList = res.data.userItemList;
            	}
            })
		},
		methods: {
			unbindUser () {
				var params = {};
			    params["phoneNo"] = this.phoneNo;
				params["openId"] = this.$store.state.currentCity.openId;
	        	this.$confirm('确定解除绑定吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.unbindUser(params).then( res => {
						console.log(res);
						if(res.data.errcode == 1) {
							this.$router.push('/info');
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/style/base/base.scss';
	@import '../../../assets/style/color/color.scss';
	.personalMsg {
		width: 100%;
		height: 100%;
		@extend %flexColumn;
		.personalMsg_content {
			padding-top: 0.2rem;
			flex: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			.personalMsg_head {
				padding: 0.4rem 0.27rem;
				@extend %flexRow;
				align-items: center;
				.userImg {
					width: 1.33rem;
					height: 1.33rem;
					img {
						width: 100%;
						display: block;
					}
				}
				.userMsg {
					margin-left: 0.27rem;
					flex: 1;
					@extend %flexColumn;
					justify-content: space-around;
					font-size: 0.35rem;
					line-height: 0.67rem;
					&:last-child {
						color: #ccc;
						span {
							color: #994ae9;
							margin-left: 0.27rem;
						}
					}

				}
			}
			.personalMsg_base {
				h3 {
					background: #f5f5f9;
					font-size: 0.27rem;
					height: 0.8rem;
					line-height: 0.8rem;
					padding: 0 0.53rem;
				}
				.educational {
					margin: 0 0.27rem;
					font-size: 0.4rem;
					height: 1.33rem;
					@extend %flexRow;
					align-items: center;
					border-bottom: 0.01rem solid #ccc;
					p {
						flex: 1;
						padding: 0 0.27rem;
					}
					i {
						display: block;
						width: 0.6rem;
						height: 0.6rem;
						background: url('../../../assets/imgs/right.png') no-repeat;
						background-size: cover;
					}
				}
			}
			.personalMsg_tips {
				flex: 1;
				padding: 0.27rem;
				font-size: 0.24rem;
				line-height: 0.4rem;
				color: #989898;
			}
		}
	}
</style>