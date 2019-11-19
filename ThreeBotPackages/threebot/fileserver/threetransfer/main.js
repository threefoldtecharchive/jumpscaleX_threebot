/* eslint no-undef: 0 */
/* eslint-disable no-new */
import httpVueLoader from './packages/ems/httpVueLoader.js'
import VueRouter from './packages/ems/vue-router.js'
import './packages/legacy/fontawesome-pro/js/all.js'
import config from './config/index.js'
import store from './store/index.js'

// Make sure the dom is loaded.
document.addEventListener('DOMContentLoaded', (event) => {

  window.config = config

  const router = new VueRouter({
    routes: [{
      path: '/',
      component: httpVueLoader('./views/threetransfer/index.vue'),
      name: 'threetransfer',
    },
    {
      path: "/download/:identifier",
      component: httpVueLoader('./views/threetransferdownload/index.vue'),
      name: "threetransferdownload",
      props: true,
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
      app: httpVueLoader('./App/index.vue')
    },
    router,
    store,
    template: '<app></app>'
  })
})