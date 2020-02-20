import VueRouter from '../web_modules/vue-router/dist/vue-router.esm.browser.js'
import Vue from '../web_modules/vue/dist/vue.js'
import httpVueLoader from '../web_modules/http-vue-loader/src/httpVueLoader.js'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: "/", component: httpVueLoader("./Views/Home/") },
  ]
})
