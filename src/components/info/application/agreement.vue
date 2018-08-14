<template>
	<div class="agreement">
		<back :title = "'授权协议'"></back>
		<div class="main">
		    <div class="title">隐私条款和数据授权协议</div>
		    <p class='tZ'>以下是中国电信信用租机业务、业务平台及业务相关的企业（以下合称“本业务”）约定的隐私条款和数据授权协议（以下统称“该协议”）：</p>
		    <p>1.该协议的同意及履约说明</p>
		    <p>凡同意申请、参与或办理本业务的自然人（以下统称“用户”），即视为同意并履约该协议的所有约定。</p>
		    <p>2.用户身份限制</p>
		    <p>本业务仅支持成年人（年龄18周岁及以上人士）参与和使用。</p>
		    <p>3.涉及的个人资料</p>
		    <p>只要同意该协议的用户，即视为授权并同意中国电信向本业务提供其本人身份信息、缴费行为等相关内容信息，同时，同意并授权本业务收集和使用与本业务相关的个人资料信息，包括但不仅限于从中国电信、其他外部金融信用信息基础数据库、NFCS网络金融征信系统数据库、第三方大数据服务机构、行业自律机构、社会第三方合作机构等依法设立的机构查询、使用用户的个人资料信息。</p>
		    <p>4.对资料披露的权利</p>
		    <p>用户理解并同意，本业务有权将用户正常履约及违约信息报中国电信、由其向国家金融信用信息基础数据库或中国人民银行指定的其他机构进行报送。</p>
		</div>
	</div>
</template>
<script>
	import back from '../../back.vue';

	export default {
		components: {
			back
		}
	}
</script>
<style lang="scss" scoped>
	.main{
	    padding-left: 0.27rem;
	    padding-right: 0.27rem;
	}
	.title{
	    text-align: center;
	    font-size: 0.48rem;
	    padding-top: 0.27rem;
	    padding-bottom: 0.27rem;
	}
	.tZ{
	    text-indent: 0.27rem;
	}
	p {
		font-size: 0.35rem;
	}
</style>