import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home/home'], resolve)
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: resolve => require(['../components/discovery/discovery'], resolve)
    },
    {
      path: '/info',
      name: 'info',
      component: resolve => require(['../components/info/info'], resolve)
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      meta: {
        title: '商品详情'
      },
      component: resolve => require(['../components/goodsDetail/goodsDetail'], resolve)
    }
  ]
})
