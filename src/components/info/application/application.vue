<template>
	<div class = "application">
		<div class="application_back">
			<back :title = "'信用租机'"></back>
		</div>
		<div class="application_content">
			<div class = "application_title">请您填写个人真实信息，本资料仅作授权查询办理资格使用，绝不泄露！</div>
			<div class="application_base">
				<h3>基本信息</h3>
				<div class="baseForm">
					<div class = "baseForm_item">
						<label for = "username">姓名</label>
						<input v-model = "username" type="text" name="" id = "username" placeholder="本人真实姓名">
					</div>
					<div class = "baseForm_item">
						<label for = "idCard">身份证</label>
						<input v-model = "idCard" type="idcard" name="" id = "idCard" placeholder="仅支持中国大陆身份证号">
					</div>
					<div class = "baseForm_item">
						<label for = "phoneNo">手机号</label>
						<input v-model = "phoneNo" type="tel" name="" id = "phoneNo" disabled placeholder="手机号码" pattern="[0-9]*"  maxlength="11" class = "inputDisabled">
					</div>
				</div>
			</div>
			<div class="application_base">
				<h3>家族信息</h3>
				<div class="baseForm">
					<div class = "baseForm_item">
						<label for = "relationship">亲属关系</label>
						<!-- <el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select> -->
						<input v-model = "relationship" @focus = "showPicks" type="text" readonly="readonly" name="" placeholder="请选择与真系亲属关系">
						<vue-pickers
							:show="show"
							:columns="columns"
							:defaultData="defaultData"
							:selectData="pickData"
							@cancel="close"
							@confirm="confirm">

						</vue-pickers>
					</div>
					<div class = "baseForm_item">
						<label for = "relationshipName">亲属姓名</label>
						<input v-model = "relationshipName" type="text" name="" id = "relationshipName" placeholder="直系亲属姓名">
					</div>
					<div class = "baseForm_item">
						<label for = "relationshipPhoneNo">亲属电话</label>
						<input v-model = "relationshipPhoneNo" type="tel" name="" id = "relationshipPhoneNo" placeholder="直系亲属电话" pattern="[0-9]*"  maxlength="11">
					</div>
					<div class = "baseForm_item">
						<label for = "homeAddress">家庭地址</label>
						<input v-model = "homeAddress" type="text" name="" id = "homeAddress" placeholder="家庭地址">
					</div>
				</div>
				<div class="agreement" >
					<el-checkbox v-model="checked"></el-checkbox>
					<p>请阅读并勾选<span @click = "test">《隐私条款和数据授权协议》</span>协议</p>
				</div>
				<h3 class = "errmsg" v-text = "errmsg"></h3>
				<div class = "application_submit" v-if = "!showSubmit">提交</div>
				<div class = "application_submit active" v-if = "showSubmit" @click = "submit">提交</div>
			</div>
		</div>
		<keep-alive>
		    <router-view>
		        <!--这里是会被缓存的视图组件 -->
		    </router-view>
		</keep-alive>
	</div>

</template>
<script>
	import back from '../../back.vue';
	import api from '../../../api/api.js';
	import vuePickers from 'vue-pickers';
	import AwesomePicker from 'vue-awesome-picker';
	export default {
		data () {
			return {
				username: '',
				idCard: '',
				relationship: '',
				relationshipName: '',
				relationshipPhoneNo: '',
				homeAddress: '',
				show: false,
				columns: 1,
				defaultData: [
					{
						text: '父子',
						value: '父子'
					}
				],
				pickData: {
					// 第一列的数据结构'父子', '父女', '母子', '母女', '兄弟', '兄妹', '姐妹', '姐弟', '夫妻','其他'
					data1: [
						
						{
							text: '父女',
							value: '父女'
						},
						{
							text: '母子',
							value: '母子'
						},
						{
							text: '父子',
							value: '父子'
						},
						{
							text: '母女',
							value: '母女'
						},
						{
							text: '兄弟',
							value: '兄弟'
						},
						{
							text: '兄妹',
							value: '兄妹'
						},
						{
							text: '姐弟',
							value: '姐弟'
						},
						{
							text: '夫妻',
							value: '夫妻'
						},
						{
							text: '其他',
							value: '其他'
						}
					]
				},
				checked: false,
				errmsg: '',
				showErrmsg: false
			}
		},
		computed: {
			showSubmit: {
				get () {
					if (this.username != '' && this.phoneNo !='' && this.idCard != '' && this.relationship != '' && this.relationshipName != '' && this.relationshipPhoneNo != '' && this.homeAddress != '' && this.checked != '' && !this.showErrmsg){
						return true;
					} else {
						return false;
					}
				},
				set (val) {}
			},
			phoneNo : {
				get () {
					return this.$route.query.phoneNo;
				},
				set (val) {

				}
			}
		},
		components: {
			back,
			vuePickers,
			AwesomePicker
		},
		created () {
			console.log(this.$route.query.phoneNo)
			this.phoneNo = this.$route.query.phoneNo;
		},
		mounted () {

		},

		methods: {
			test () {
				this.$router.push('/info/application/agreement');
			},
			showPicks () {
				this.show = true;
			},
			close () {
				this.show = false;
			},
			confirm (e) {
				console.log(e)
				this.relationship = e.select1.value
				this.show = false;
			},
			submit () {
				/*
					username: '',
					phoneNo: '',
					idCard: '',
					relationship: '',
					relationshipName: '',
					relationshipPhoneNo: '',
					homeAddress: '',
				*/
				if (this.username != '' && this.phoneNo !='' && this.idCard != '' && this.relationship != '' && this.relationshipName != '' && this.relationshipPhoneNo != '' && this.homeAddress != '' && this.checked != ''){
					var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		            // var regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
		            var regPhone = /^1(3|4|5|7|8)\d{9}$/
		            
		            var regPhone2 = /(^1(33 | 53 | 73 | 77 | 8[019]) \\d{8}$)|(^1700\\d{7 }$)|(^1701\\d{7 } $)|(^1702\\d{7 } $)/ ////中国电信号码格式验证 手机段： 133,153,173,180,181,189,177,1700,1701,1702
		            //身份证校验
		            if (regIdCard.test(this.idCard) === false) {
		            	this.$message({
		            		message: '请输入有效的身份证号码',
		            		type: 'warning'
		            	});
		            	return false;
		                
		            } else if (!regPhone.test(this.relationshipPhoneNo)) {   //亲属电话校验
		                if (!regPhone2.test(this.relationshipPhoneNo)){
		                	this.$message({
		                		message: '请输入有效的亲属电话号码',
		                		type: 'warning'
		                	});
		                	return false;
		                }
		                
		            } else if (!regPhone.test(this.phoneNo)){
		                if (!regPhone2.test(this.phoneNo)){
		                	this.$message({
		                		message: '请输入有效的手机号码',
		                		type: 'warning'
		                	});
		                	return false;
		                }
		            } else if (this.relationshipPhoneNo == this.phoneNo){
		            	this.$message({
	                		message: '亲属电话号码与手机号码不能相同',
	                		type: 'warning'
	                	});
		                return false;
		            } else {
		            	//提交；
		            	var params = {};
                        params["userId"]=this.$store.state.currentCity.userId;
		            	params["openId"]= this.$store.state.currentCity.openId;
                        params["provinceCode"]=this.$store.state.currentCity.city.provinceCode;
                        params["cityCode"]=this.$store.state.currentCity.city.cityCode;
                        params["userName"] = this.username;
                        params["idCardNo"] = this.idCard;
                        params["phoneNo"] = this.phoneNo;
                        params["familyRelation"] = this.relationship;
                        params["familyName"] = this.relationshipName;
                        params["familyPhone"] = this.relationshipPhoneNo;
                        params["familyAddress"] = this.homeAddress;
                        console.log(params)
                        api.applyCredit(params).then( res => {
                        	console.log(res);
                        	if(res.data.errcode == 1) {
                        		this.$router.push({name: 'applicationSuccess', query: {creditScore: res.data.creditScore}});
                        		this.$destroy();
                        	} else {
                        		this.errmsg = res.data.errmsg;
                        		this.showErrmsg = true;
                        		this.$message({
                        			message: res.data.errmsg,
                        			type: 'warning'
                        		});
                        		this.$router.push('/info');
                        	}
                        })
		            }
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/style/base/base.scss';
	@import '../../../assets/style/color/color.scss';
	.application {
		background: #f5f5f9;
		height: 100%;
		@extend %flexColumn;
		.application_back {
			height: 1.2rem;
		}
		.application_content {
			flex: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			.application_title {
				background: #fff;
				text-align: center;
				font-size: 0.35rem;
				line-height: 0.45rem;
				color: #565656;
				padding: 0.48rem 1.28rem;
			}
			.application_base {
				&:last-child {
					padding-bottom: 0.67rem;
				}
				h3 {
					text-indent: 0.27rem;
					font-size: 0.25rem;
					line-height: 0.8rem;
				}
				.baseForm_item {
					padding: 0 0.27rem;
					background: #fff;
					height: 1.47rem;
					@extend %flexRow;
					border-bottom: 0.01rem solid #e8e8ed;
					align-items: center;
						font-size: 0.37rem;

					label {
						height: 0.67rem;
						line-height: 0.67rem;
						width: 2.0rem;
						text-indent: 0.27rem;
					}
					input {
						height: 0.67rem;
						line-height: 0.67rem;
						flex: 1;
						border: none;
						outline: none;
						
					}
					input[disabled]{  
					    background-color: #fff;  
					} 
					.area_roll_mask {
						background: #fff;
					}
				}
				.agreement {
					background: #fff;
					padding: 0.27rem 0.53rem; 
					@extend %flexRow;
					align-items: center;
					.el-checkbox {
						margin-right: 0.27rem;
					}
					span {
						color: #f5475f;
					}
				}
				.errmsg {
					text-align: center;
					color: #f5475f;
					font-size: 0.37rem;
					margin: 0.27rem;
				}
				.application_submit {
					height: 1.2rem;
					line-height: 1.2rem;
					margin: 0.67rem 0.27rem 0;
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
	}

</style>
