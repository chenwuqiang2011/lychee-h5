
var global = global || {};
global.baseurl = 'http://192.168.20.132:8088';
// global.testurl = 'https://www.cwq888.cn';
global.testurl = '/api';
global.imgurl = 'http://www.cwq888.cn/image/';
// global.testurl = 'http://localhost:999';
// global.testurl = 'http://192.168.1.102:1000';
global.iourl = 'ws://localhost:1703/';


// 保存token
/*function saveToken() {
	var option = {};
    option.authAppId = 'PK9toXlIdbLoJLq7';
    option.authAppSecret = '6jsniGLm22HTYuS0cTvcP1fzQcysH1pQ';
    option.openId ='oVa7_0DqTO-1XPfq0JfoXDDfiUpo';//获取用户openId

    api.getToken(option).then(res => {
    	console.log(res)
    	if (res.data.errcode == 1) {
    	    var tokenInfo = res.data.auth;
    	    try {
    	        localStorage.getItem("token")
    	    } catch (e) {
    	        console.log('token写入缓存异常：', e)
    	    }
    	} else {
    	    console.log('错误提示：', res.data.errmsg)
    	}
    })
    // wx.request({
    //     url: 'https://mobile.lychee-info.cn/auth',
    //     data: {
    //         'openId':openId, 
    //         'authAppId': authAppId,
    //         'authAppSecret': authAppSecret
    //     },
    //     method: 'POST',
    //     dataType: 'json',
    //     success: function (res) {
    //         if (res.data.errcode == 1) {
    //             var tokenInfo = res.data.auth;
    //             try {
    //                 wx.setStorageSync('tokenInfo', tokenInfo)
    //             } catch (e) {
    //                 console.log('token写入缓存异常：', e)
    //             }
    //         } else {
    //             console.log('错误提示：', res.data.errmsg)
    //         }


    //     },
    //     fail: function (res) {
    //         console.log('fail:', res)
    //     },
    //     complete: function (res) { },
    // })
};
// 获取token
function getToken() {
    var token = '';

    // try {
    //     var tokenInfo = wx.getStorageSync('tokenInfo');
    //     if (tokenInfo) {
    //         token = tokenInfo.token;
    //     } else {
    //         saveToken();
    //     }
    // } catch (e) {
    //     console.log(e)
    // }
    // return token;
}*/

export default {
	global
}