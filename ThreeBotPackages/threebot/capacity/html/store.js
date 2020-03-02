import tfService from './service.js'
import lodash from '/weblibs/lodash/lodash.min.js'

const state = {
  registered3bots: 0,
  onlinenodes: 0,
  registeredFarms: 0,
  farmsList: [],
  nodesList: [],
  originalNodesList: [],
  countries: 0,
  cru: 0,
  mru: 0,
  sru: 0,
  hru: 0
}
const actions = {
  getRegistered3Bots(context) {
    tfService.registered3bots().then(response => {
      console.log('nodes', response.data)
      context.commit('setRegistered3Bots', response.data.nodes.length)
      context.commit('setNodesList', response.data.nodes)
      context.commit('setOriginalNodesList', response.data.nodes)
      context.commit('setCountriesFromNodes', response.data.nodes)
      context.commit('setRUfromNodes', response.data.nodes)
      context.commit('setNodesOnline', response.data.nodes)
    })
  },
  getRegisteredFarms(context) {
    tfService.registeredfarms().then(response => {
      console.log('farms', response.data)
      context.commit('setRegisteredFarms', response.data.farms.length)
      context.commit('setFarmsList', response.data.farms)
    })
  }
}
const mutations = {
  setRegistered3Bots(state, value) {
    state.registered3bots = value
  },
  setRegisteredFarms(state, value) {
    state.registeredFarms = value
  },
  setFarmsList(state, value) {
    state.farmsList = value
  },
  setNodesList(state, value) {
    state.nodesList = value
  },
  setOriginalNodesList(state, value) {
    state.originalNodesList = value
  },
  setCountriesFromNodes(state, value) {
    state.countries = lodash.uniqBy(value, node => node.location.country).length
  },
  setRUfromNodes(state, value) {
    state.cru = lodash.sumBy(value, node => node.total_resources.cru)
    state.mru = lodash.sumBy(value, node => node.total_resources.mru)
    state.sru = lodash.sumBy(value, node => node.total_resources.sru)
    state.hru = lodash.sumBy(value, node => node.total_resources.hru)
  },
  setNodesOnline(state, value) {
    state.onlinenodes = value.length
  }
}

const getters = {
  registered3bots: (state) => state.registered3bots,
  registeredfarms: (state) => state.registeredFarms,
  farmslist: (state) => state.farmsList,
  nodeslist: (state) => state.nodesList,
  originalNodesList: (state) => state.originalNodesList,
  cru: (state) => state.cru,
  mru: (state) => state.mru,
  sru: (state) => state.sru,
  hru: (state) => state.hru,
  countries: (state) => state.countries,
  onlinenodes: (state) => state.onlinenodes
}

export {
  state,
  actions,
  mutations,
  getters
}