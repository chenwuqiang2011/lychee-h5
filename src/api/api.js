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
	conditionList (params) {
		var token = getToken();
		return axios.post(`${url}/goods/queryGoodsList`, qs.stringify(params), {
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
	getBaseInfo (params) {
		var token = getToken();
		return axios.post(url + '/mine/index', JSON.stringify(params), {
			headers: {
            	'Content-Type': 'application/json;charset=UTF-8'
        	}
    	});
	}
}