export default ({
  state: {
    routes: [{
      path: '/',
      name: 'home',
      meta: {
        icon: 'fa-home',
        position: 'top'
      }
    }, {
      path: '/test',
      name: 'home',
      meta: {
        icon: 'fa-home',
        position: 'top'
      }
    }]
  },
  actions: {
    setRoutes: (context, routes) => context.commit('setRoutes', routes),
    addRoute: (context, route) => context.commit('addRoute', route)
  },
  mutations: {
    setRoutes: (state, routes) => { state.routes = routes },
    addRoute: (state, route) => { state.routes.push(route) }
  },
  getters: {
    routes: (state) => state.routes
  }
})
