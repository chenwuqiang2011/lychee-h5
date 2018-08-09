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
	//查询热销推荐商品列表；
	hotProducts (params) {
		var token = getToken();
		console.log(params);

		return axios.post(`${url}/goods/queryConditionList`, qs.stringify(params), {
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
            	'Authorization': 'Bearer ' + token
        	}

		});
	},
	getProduct (params) {
		return axios.post(`${url}/getProduct`, qs.stringify(params) );
	}
}