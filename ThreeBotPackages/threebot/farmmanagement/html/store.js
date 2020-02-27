import farmManagementService from './service.js'

export const state = {
  user: {},
  farms: [],
  nodes: []
}
export const actions = {
  getName: async (context) => {
      var response = await farmManagementService.getName()
      return response.data.name
    },
  getUser: async (context) => {
    var name = await context.dispatch('getName')
    console.log('name', name)
    var response = await farmManagementService.getUser(name)
    context.commit('setUser', response.data)
  },
  getFarms: (context) => {
    console.log("in get farms")
    farmManagementService.getFarms(context.getters.user.id).then(response => {
      context.commit('setFarms', response.data.farms)
    })
  },
  registerFarm: (context, farm) => {
    farmManagementService.registerFarm(farm).then(response => {
      context.dispatch('getFarms')
    })
  },
  updateFarm: (context, farm) => {
    farmManagementService.updateFarm(farm.id, farm).then(response => {
      context.dispatch('getFarms')
    })
  },
  getNodes: (context, farm_id) => {
    farmManagementService.getNodes(farm_id).then(response => {
      context.commit('setNodes', response.data.nodes)
    })
  }
}
export const mutations = {
  setUser: (state, user) => {state.user = user},
  setFarms: (state, farms) => { state.farms = farms },
  addFarm: (state, farm) => { state.farms.push(farm) },
  setNodes: (state, nodes) => {state.nodes = nodes}
}

export const getters = {
  user: (state) => state.user,
  farms: (state) => state.farms,
  nodes: (state) => state.nodes
}
