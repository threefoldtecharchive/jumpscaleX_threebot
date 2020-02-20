import appService from '../services/appServices.js'
import config from '../config/index.js'
import router from '../router/index.js'

export default ({
  state: {
    apps: [
      
  ]
  },
  actions: {
    getApps: (context) => {
      var tmpApps = []
      appService.getVueApps().then(response => {
        response.data.packages.forEach( (app, index) => {
          const appLocation = `${config.threebotBaseUrl}${app.source.threebot}/${app.source.name}`
          appService.checkPathForFile(`${appLocation}/router.json`).then(result => {
            if (result.status === 200) {
              app.routes = result.data
              app.store = `${appLocation}/store.js`
            }
            console.log(app)
            tmpApps.push(app)
          })
        })
      }).catch(e => {
        console.log("something went wrong", e)
      })
      console.log(`fuckers`,tmpApps)
      context.commit('setApps', tmpApps)
    },
    getAppRoutes(app) {
      return app.routes.map(route => {
        return {
          path: `/${app.name.toLowerCase()}${route.path}`,
          component: httpVueLoader(`/${app.name}/${route.component}`),
          name: `${app.name.toLowerCase()}${route.name ? '-' + route.name : ''}`,
          meta: {
            ...route.meta,
            app: true,
            position: route.meta.position ? route.meta.position : 'top'
          }
        }
      })

      
    },
    registerRoutes(app) {
      console.log(`router?`,router)
      // this.getAppRoutes(app).forEach(route => {
      //   if (!this.routes.some(r => r.name === route.name)) {
      //     this.addRoute(route);
      //     this.$router.addRoutes([route]);
      //   }
      // })
    }
  
  },
  mutations: {
    setApps: (state, app) => {
      console.log(`insetapps`, app)
      state.apps = app
    },
    // updateApp: (state, app) => {
    //   state.apps.find(x => x.name === app.name).installed = app.installed
    // }
  },
  getters: {
    apps: (state) => state.apps
  }
})
