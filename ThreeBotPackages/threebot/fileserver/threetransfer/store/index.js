/* eslint no-undef: 0 */
/* eslint-disable no-new */
import Vuex from '/interface/packages/ems/vuex.js'
import transferStore from './store.js'

window.vuex = Vuex
Vuex.jimber = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    transferStore
  }
})
