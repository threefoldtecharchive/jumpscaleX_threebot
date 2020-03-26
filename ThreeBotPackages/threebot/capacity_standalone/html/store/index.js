import Vuex from '/weblibs/vuex/vuex.esm.browser.js'
import Vue from '/weblibs/vue/vue.js'

import capacity from './capacity.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      capacity
  }
})
