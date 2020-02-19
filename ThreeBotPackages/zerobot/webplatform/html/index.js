import Vue from './web_modules/vue/dist/vue.js'
import httpVueLoader from './web_modules/http-vue-loader/src/httpVueLoader.js'
import VueRouter from './web_modules/vue-router/dist/vue-router.esm.browser.js'
import Vuetify from './web_modules/vuetify/dist/vuetify.js'

document.addEventListener('DOMContentLoaded', (event) => {
  
  Vue.use(httpVueLoader)
  Vue.use(VueRouter)
  Vue.use(Vuetify)

  //Vue.component('navigation', httpVueLoader('./Components/Navigation/'))
  
  const router = new VueRouter({
    routes: [
      { path: '/', component: httpVueLoader('./Views/App/') },
      { path: '/test', component: httpVueLoader('./Components/test.vue') },
    ]
  })
  
  new Vue({
    components: {
      app: httpVueLoader('./Views/App/'),
    },
    vuetify: new Vuetify(),
    router,
    template: '<app></app>',
  }).$mount('#app')
})
  