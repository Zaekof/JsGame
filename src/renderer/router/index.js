import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default-page',
      component: require('@/components/Default').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
