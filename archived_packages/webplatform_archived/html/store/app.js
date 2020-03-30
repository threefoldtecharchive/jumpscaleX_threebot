import appService from "../services/appServices.js";
import config from "../config/index.js";

export default {
  state: {
    apps: []
  },
  actions: {
    getApps: context => {
      var tmpApps = [];
      appService
        .getVueApps()
        .then(response => {
          response.data.packages.forEach((app, index) => {
            const appLocation = `${config.threebotBaseUrl}${app.source.threebot}/${app.source.name}`;
            appService
              .checkPathForFile(`${appLocation}/router.json`)
              .then(result => {
                if (result.status === 200) {
                  app.routes = result.data;
                  app.store = `${appLocation}/store.js`;
                  app.location = `${appLocation}/`;
                }
                tmpApps.push(app);
              });
          });
        })
        .catch(e => {
          console.log("something went wrong", e);
        });
      context.commit("setApps", tmpApps);
    },
  },
  mutations: {
    setApps: (state, app) => {
      state.apps = app;
    }
    // updateApp: (state, app) => {
    //   state.apps.find(x => x.name === app.name).installed = app.installed
    // }
  },
  getters: {
    apps: state => state.apps
  }
};
