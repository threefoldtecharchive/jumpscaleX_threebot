/* eslint no-undef: 0 */
/* eslint-disable no-new */
import httpVueLoader from './packages/ems/httpVueLoader.js'
import VueRouter from './packages/ems/vue-router.js'
import './packages/legacy/fontawesome-pro/js/all.js'
import config from './config/index.js'
import store from './store/index.js'
import userService from './services/userService.js'

Vue.prototype.$rules = {
  required: v => !!v || 'This is required',
  email: v => (/.+@.+\..+/.test(v) || !v) || 'E-mail must be valid',
  noLongerThan100: v => (v && v.length <= 100) || 'This must be less than 100 characters'
}

window.config = config
window.userService = userService

const router = new VueRouter({
  routes: [{
    path: '/',
    component: httpVueLoader('./views/home/index.vue'),
    name: 'home',
    meta: {
      icon: 'fa-home',
      position: 'top'
    }
  }, {
    path: '/appstore',
    component: httpVueLoader('./views/appstore/index.vue'),
    name: 'appstore',
    meta: {
      icon: 'fa-th',
      position: 'bottom'
    }
  }, {
    path: '/login',
    name: 'login',
    component: httpVueLoader('./views/login/index.vue'),
    meta: {
      position: 'none'
    }
  }, {
    path: '/initialize',
    name: 'initialize',
    component: httpVueLoader('./views/initialize/index.vue'),
    meta: {
      position: 'none'
    }
  }]
})

store.dispatch('setRoutes', router.options.routes)

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
    app: httpVueLoader('./App/index.vue')
  },
  router,
  store,
  template: '<app></app>'
})
