import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home/home';
import discovery from '@/components/discovery/discovery';
import info from '@/components/info/info';

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
      component: home
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: discovery
    },
    {
      path: '/info',
      name: 'info',
      component: info
    }
  ]
})
