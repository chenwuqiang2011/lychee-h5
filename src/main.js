// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//引入flexible;
import './assets/js/flexible';

//移动端单位转换；
// var deviceWidth = document.documentElement.clientWidth;   
// document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
//1rem=100px  就是所有的css属性的属性值都是用rem来表示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
