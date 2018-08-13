import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',//主页
      name: 'home',
      component: resolve => require(['@/components/home/home'], resolve)
    },
    {
      path: '/discovery',//发现
      name: 'discovery',
      component: resolve => require(['../components/discovery/discovery'], resolve)
    },
    {
      path: '/info',//我的
      name: 'info',
      component: resolve => require(['../components/info/info'], resolve)
    },
    {
      path: '/info/bindPhone',//绑定手机号
      name: 'bindPhone',
      component: resolve => require(['../components/info/bindPhone/bindPhone'], resolve)
    },
    {
      path: '/goodsDetail',//商品详情
      name: 'goodsDetail',
      meta: {
        title: '商品详情'
      },
      component: resolve => require(['../components/goodsDetail/goodsDetail'], resolve)
    },
    {
      path: '/rentDetail',//租机详情
      name: 'rentDetail',
      meta: {
        title: '租机信息'
      },
      component: resolve => require(['../components/goodsDetail/rentDetail'], resolve)
    },
    {
      path: '/rentDetailEwm',//提交租机详情
      name: 'rentDetailEwm',
      meta: {
        title: '租机信息'
      },
      component: resolve => require(['../components/goodsDetail/rentDetailEwm'], resolve)
    },
    {
      path: '/phoneList',//租机分类 
      name: 'phoneList',
      meta: {
        title: '信用租机'
      },
      component: resolve => require(['../components/phoneList/phoneList'], resolve)
    },
    {
      path: '/phoneFilter',//租机分类 
      name: 'phoneFilter',
      meta: {
        title: '信用租机'
      },
      component: resolve => require(['../components/phoneList/phoneFilter'], resolve)
    },
    {
      path: '/city',//租机分类 
      name: 'city',
      meta: {
        title: '城市列表'
      },
      component: resolve => require(['../components/city'], resolve)
    },
    {
      path: '/search',//搜索列表 
      name: 'search',
      meta: {
        title: '搜索'
      },
      component: resolve => require(['../components/search/search'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '商品详情'
      },
      component: resolve => require(['../components/test'], resolve)
    }
  ]
})
