function abc(num){
	console.log()
	return new Promise((resolve, reject) => {
		if(num > 0) {
			resolve( num );
		} else {
			reject ( 0 );
		}
	})
};
function a(num) {
	if(!num) return false;
	console.log(num);
}

import axios from 'axios';
import qs from 'qs';
import global from '../assets/common/common.js';

var IS_DEBUG = true; //如果是测试环境就是true，如果是生产环境就是false
if(process.env.NODE_ENV == 'development') {
	IS_DEBUG = true;
} else {
	IS_DEBUG = false;
}
var url = IS_DEBUG ? global.global.testurl : global.global.baseurl;

export default {
	a,
	abc,
	//查询商品列表；
	queryProducts (params) {
		params = params || {};
		console.log(params)
		var default_params = {
			pageNo: 1,
			qty: 10
		};
		params = Object.assign({}, default_params, params);
		console.log(123,params)
		return axios.post(`${url}/queryProducts`, qs.stringify(params) );
	},
	getProduct (params) {
		return axios.post(`${url}/getProduct`, qs.stringify(params) );
	}
}