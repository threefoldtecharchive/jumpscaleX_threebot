import appService from '../services/appServices.js'

export default ({
  state: {
    apps: [
      {
      name: "test"
      },
      {
        name: "test2"
      },
  ]
  },
  actions: {
    getApps: (context) => {
      var tmpApps = []

      appService.getVueApps().then(response => {

        response.data.packages.forEach( (item, index) => {
          console.log(index,item)
          // appService.checkPathForFile(`${window.location.origin}/${item.name}/router.json`).then(r => {
          //   if (r.status === 200) {
          //     item.routes = r.data
          //     item.store = `/${item.name}/store.js`
          //   }
          //   tmpApps.push(item)
          // })
        })
      }).catch(e => {
        console.log("something went wrong", e)
      })

      context.commit('setApps', tmpApps)
    }
  
  },
  mutations: {
    setApps: (state, app) => {
      state.apps = app
    },
    updateApp: (state, app) => {
      state.apps.find(x => x.name === app.name).installed = app.installed
    }
  },
  getters: {
    apps: (state) => state.apps
  }
})
