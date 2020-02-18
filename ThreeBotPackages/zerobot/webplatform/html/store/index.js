import Vue from '../web_modules/vue/dist/vue.js'
import Vuex from '../web_modules/vuex/dist/vuex.js'

import main from './main.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      //appStore,
      main
      // authStore
    }
  })