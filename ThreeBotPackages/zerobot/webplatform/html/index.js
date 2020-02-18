import Vue from './web_modules/vue/dist/vue.js'
import httpVueLoader from './web_modules/http-vue-loader/src/httpVueLoader.js'
import VueRouter from './web_modules/vue-router/dist/vue-router.js'
import Vuetify from './web_modules/vuetify/dist/vuetify.js'
import store from './store/index.js'

Vue.use(httpVueLoader)
Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: httpVueLoader('./app/app.vue'),
    name: 'home',
    meta: {
      icon: 'fa-home',
      position: 'top'
    }
  }, {
    path: '/login',
    name: 'login',
    //component: httpVueLoader(),
    meta: {
      position: 'none'
    }
  }, {
    path: '/initialize',
    name: 'initialize',
    //component: httpVueLoader(),
    meta: {
      position: 'none'
    }
  }]
})

new Vue({
  el: '#app',
  vuetify: new Vuetify({
    iconfont: 'fa',
    theme: {
      themes: {
        light: {
          primary: '#2d4052',
          secondary: '#57be8e'
        }
      }
    }
  }),
  components: {
    app: 'url:./app/app.vue',
  },
  router,
  store,
  template: '<app></app>',
})
