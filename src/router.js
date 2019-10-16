import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeToolbar from './views/HomeToolbar.vue'
import EditToolbar from './views/EditToolbar.vue'
import EditRule from './views/EditRule.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components:{
        default: Home,
        navigation: HomeToolbar
      } 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/edit/:name',
      name: 'edit',
      components: {
        default : EditRule,
        navigation: EditToolbar,
      },
    },
  ]
})
