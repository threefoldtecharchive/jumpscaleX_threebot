import Vuex from '/weblibs/vuex/vuex.esm.browser.js'
import Vue from '/weblibs/vue/vue.js'

import appStore from './app.js'
import routeStore from './route.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      appStore,
      routeStore
  }
})
