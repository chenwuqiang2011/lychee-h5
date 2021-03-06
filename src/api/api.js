import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] = 'application/json,charset=UTF-8';
import qs from 'qs';
import global from '../assets/common/common.js';

var IS_DEBUG = true; //如果是测试环境就是true，如果是生产环境就是false
if(process.env.NODE_ENV == 'development') {
	IS_DEBUG = true;
} else {
	IS_DEBUG = false;
};
//用户ID；
var openId = 'oVa7_0JOeScNLuMZSHrn4bkvx1U4';

var url = IS_DEBUG ? global.global.testurl : global.global.baseurl;
function getToken () {
	var lycheeToken = JSON.parse(localStorage.getItem('lycheeToken'));
	if(lycheeToken) return lycheeToken.token;
}

export default {
	//获取token;
	getToken (params) {
		var token = getToken();
		return axios.post(url + '/auth/', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8'
        	}
    	});
	},
	//获取省市编码；
	setCrmCode (params) {
		// https://mobile.lychee-info.cn/getCrmAreaDict
		var token = getToken();
		return axios.post(`${url}/getCrmAreaDict`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//获取首页轮播图和导航列表；
	getBannerAndNav (params) {
		var token = getToken();
		return axios.post(`${url}/index/getBannerAndNav`, JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}

		});
	},
	//查询热销推荐商品列表；
	hotProducts (params) {
		var token = getToken();
		return axios.post(`${url}/index/getSaleRecommand`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//关键词查询商品;
	queryGoodsByKeyWord (params) {
		var token = getToken();
		return axios.post(`${url}/goods/queryGoodsByKeyWord`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//查询商品列表 ;
	queryGoodsList (params) {
		var token = getToken();
		return axios.post(`${url}/goods/queryGoodsList`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//搜索条件显示；
	queryConditionList (params) {
		var token = getToken();
		return axios.post(`${url}/goods/queryConditionList`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//搜索列表+热门搜索；
	getHotWord (params) {
		var token = getToken();
		return axios.post(`${url}/goods/getHotWord`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//商品收藏；
	collectGoods (params) {
		var token = getToken();
		return axios.post(`${url}/goods/collectGoods`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//商品详情;
	queryGoodsDetail (params) {
		var token = getToken();
		return axios.post(`${url}/goods/queryGoodsDetail`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}
		});
	},
	//获取用户信息，判断是否激活；
	// getBaseInfo (params) {
	// 	var token = getToken();
	// 	return axios.post(url + '/mine/index', JSON.stringify(params), {
	// 		headers: {
 //            	'Content-Type': 'application/json;charset=UTF-8'
 //        	}
 //    	});
	// },


	//获取当前用户详细情况；
	getUserInfo (params) {
		var token = getToken();
		return axios.post(url + '/mine/index', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//绑定手机发送短信接口；
	sendMsg (params) {
		var token = getToken();
		return axios.post(url + '/msg/sendMsg', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//绑定用户；
	bindUser (params) {
		var token = getToken();
		return axios.post(url + '/user/bindUser', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//解除绑定；
	unbindUser (params) {
		var token = getToken();
		return axios.post(url + '/user/unbindUser', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//绑定用户基本信息；
	applyCredit (params) {
		var token = getToken();
		return axios.post(url + '/user/applyCredit', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},
	//用户基本信息（学历，驾驶证一类）；
	userInfo (params) {
		var token = getToken();
		return axios.post(url + '/mine/userInfo', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8',
            	'Authorization': 'Bearer ' + token
        	}
    	});
	},

}