import Vue from './web_modules/vue/dist/vue.js'
import httpVueLoader from './web_modules/http-vue-loader/src/httpVueLoader.js'
import Vuetify from './web_modules/vuetify/dist/vuetify.js'
import store from './store/index.js'
import router from './router/index.js'

document.addEventListener('DOMContentLoaded', (event) => {
  
  Vue.use(httpVueLoader)
  Vue.use(Vuetify)
  
  new Vue({
    components: {
      app: httpVueLoader('./App/'),
    },
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
    }
    ),
    router,
    store,
    template: '<app></app>',
  }).$mount('#app')
})
  