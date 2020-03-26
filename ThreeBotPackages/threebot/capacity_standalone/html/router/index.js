import VueRouter from '/weblibs/vue-router/vue-router.esm.browser.js'
import Vue from '/weblibs/vue/vue.js'
import httpVueLoader from '/weblibs/http-vue-loader/httpVueLoader.js'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { 
      path: "/", 
      component: httpVueLoader("/threebot/capacity_standalone/views/capacity/"), 
      name: 'home',
      meta: {
        icon: 'fa-home',
        position: 'top'
      } 
    },
  ]
})
