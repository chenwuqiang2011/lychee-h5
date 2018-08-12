// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js';

Vue.config.productionTip = false;

import $ from 'jquery';

//引入flexible;
import './assets/js/flexible';

//Element UI;
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import '../node_modules/swiper/dist/css/swiper.min.css';
Vue.use(VueAwesomeSwiper);

//图片lazy-load插件；
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./src/assets/imgs/error.png',
    loading:'./src/assets/imgs/lazy.gif'
})

//移动端单位转换；
// var deviceWidth = document.documentElement.clientWidth;   
// document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
//1rem=100px  就是所有的css属性的属性值都是用rem来表示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
