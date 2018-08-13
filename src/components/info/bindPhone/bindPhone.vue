<template>
	<div class = "bindPhone">
		<back :title = "'绑定手机号码'"></back>
		<div class="bindPhone_content">
			<h1>请先绑定您的手机号码</h1>
			<div class="bindPhone_form">
				<div class = "bindPhone_no">
					<label for = "phoneNo">+86 <i></i></label>
					<input v-model = "phoneNo" type="tel" name="" id = "phoneNo" placeholder="请填写手机号" pattern="[0-9]*"  maxlength="11">
				</div>
				<div class = "bindPhone_code">
					<label for = "phoneCode">验证码</label>
					<input v-model = "validCode" type="number" name="" id = "phoneCode" placeholder="点击输入" pattern="[0-9]*">
					<div class = "sendCode">
						<span class="getCode" @click = "getCode" v-if = "show">获取验证码</span>
						<span class = "countDown" v-if = "!show">重新发送({{count}}s)</span>
					</div>
				</div>
			</div>
			<div class = "bindPhone_submit" v-if = "validCode.length == 0">提交</div>
			<div class = "bindPhone_submit active" v-if = "validCode.length > 0" @click = "submit">提交</div>
		</div>
	</div>	
</template>
<script>
	import back from '../../back.vue';
	import api from '../../../api/api.js';
	export default {
		data () {
			return {
				phoneNo: '',
				validCode: '',
				count: 60,
				show: true
			}
		},
		computed: {

		},
		components: {
			back
		},
		created () {

		},
		mounted () {

		},
		methods: {
			getCode () {
				if(this.phoneNo && this.count == 60) {
					var phone = this.phoneNo;
					var reg = /^1(3|4|5|7|8)\d{9}$/;
		           	var reg2 = /(^1(33 | 53 | 73 | 77 | 8[019]) \\d{8}$)|(^1700\\d{7 }$)|(^1701\\d{7 } $)|(^1702\\d{7 } $)/ ////中国电信号码格式验证 手机段： 133,153,173,180,181,189,177,1700,1701,1702
		          	if (!reg.test(phone)) {
		                if (!reg2.test(phone)){
		                    this.$message({
		                    	message: '请输入正确的电话号码！',
		                    	type: 'warning'
		                    })
		                    return false;
		                }
		            } else {
		            	this.tick(); 
		            	var options = {
		            		openId: this.$store.state.currentCity.openId,
							provinceCode: this.$store.state.currentCity.city.provinceCode,
							cityCode: this.$store.state.currentCity.city.cityCode,
		            		phoneNo: this.phoneNo
		            	}
		            	api.sendMsg(options).then( res => {
		            		console.log(res)
		            	})   	
		            }
				} else {
					this.$message({
						message: '请先输入电话号码！',
						type: 'warning'
					})
					return false;
				}
			},
			tick () {
				
		        if (this.count > 0) {
		        	this.show = false;
		            this.count = this.count - 1;
		            var that = this;
		            setTimeout(function () {
		                return that.tick();
		            }, 1000)
		        } else {
		        	this.show = true;
		            this.count = 60;
		        }
			},
			submit () {
				if(this.phoneNo == ''){
					this.$message({
						message: '请先输入电话号码！',
						type: 'warning'
					});
					return false;
				};
				if(this.validCode == '') {
					this.$message({
						message: '请先输入验证码！',
						type: 'warning'
					});
					return false;
				}
				var phone = this.phoneNo;
				var reg = /^1(3|4|5|7|8)\d{9}$/;
	           	var reg2 = /(^1(33 | 53 | 73 | 77 | 8[019]) \\d{8}$)|(^1700\\d{7 }$)|(^1701\\d{7 } $)|(^1702\\d{7 } $)/ ////中国电信号码格式验证 手机段： 133,153,173,180,181,189,177,1700,1701,1702
	          	if (!reg.test(phone)) {
	                if (!reg2.test(phone)){
	                    this.$message({
	                    	message: '请输入正确的电话号码！',
	                    	type: 'warning'
	                    })
	                    return false;
	                }
	            } else {
	            	var options = {
	            		openId: this.$store.state.currentCity.openId,
						provinceCode: this.$store.state.currentCity.city.provinceCode,
						cityCode: this.$store.state.currentCity.city.cityCode,
	            		phoneNo: this.phoneNo,
	            		verifyCode: this.validCode
	            	}
	            	api.bindUser(options).then( res => {
	            		console.log(res);
	            		if(res.data.errcode == 1){
	            			this.$message({
	            				message: '恭喜您！绑定成功！',
	            				type: 'success'
	            			})
	            		} else {
	            			this.$message({
	            				message: res.data.errmsg,
	            				type: 'warning'
	            			})
	            		}
	            	})   	
	            }

				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/style/base/base.scss';
	@import '../../../assets/style/color/color.scss';
	.bindPhone {
		width: 100%;
		height: 100%;
		background: #f4f3f4;
		.bindPhone_content {
			margin: 0 0.27rem;
			width: auto;
			h1 {
				font-size: 0.37rem;
				line-height: 1.97rem;
				text-align: center;	
			}
			.bindPhone_form {
				background: #fff;
				border: 0.01rem solid #d2d2d2;
				border-radius: 0.13rem;
				& > div {
					padding: 0 0.27rem;
					height: 1.33rem;
					border-bottom: 0.01rem solid #d2d2d2;
					&:last-child {
						border-bottom: none;
					}
				}
				.bindPhone_no {
					font-size: 0.37rem;
					line-height: 1.6rem;
					@extend %flexRow;
					align-items: center;
					label {
						// font-weight: bolder;
						@extend %flexRow;
						width: 2.0rem;
						height: 100%;
						align-items: center;
						i {
							display: inline-block;
							width: 0.37rem;
							height: 0.37rem;
							margin: 0 0.4rem;
							background: url('../../../assets/imgs/right.png') no-repeat;
							background-size: cover
						}
					}
					input {
						flex: 1;
						border: none;
						outline: none;
					}
				}
				.bindPhone_code {
					@extend .bindPhone_no;
					.sendCode {
						height: 100%;
						width: 4.0rem;
					}
					.getCode {
						display: inline-block;
						line-height: 0.67rem;
						border-left: 0.01rem solid #d2d2d2;
						padding-left: 0.27rem;
					}
					.countDown {
						border-left: 0.01rem solid #d2d2d2;
						padding-left: 0.27rem;
						color: #989898;
					}
				}
			}
			.bindPhone_submit {
				height: 1.2rem;
				line-height: 1.2rem;
				margin: 0.93rem 0.27rem;
				width: auto;
				background: #cbcbcb;
				color: #989898;
				text-align: center;
				font-size: 0.49rem;
				letter-space: 0.27rem;
				border-radius: 0.13rem;
				&.active {
					color: #fff;
					background: #f5475f;
				}
			}
		}
	}
</style>
