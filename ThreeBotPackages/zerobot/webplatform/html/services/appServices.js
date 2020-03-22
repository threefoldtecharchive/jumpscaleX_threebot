/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../config/index.js'
import axios from '/weblibs/axios/axios.min.js'

export default ({
  getVueApps () {
    const frontendPackages = axios.post(`${config.threebotBaseUrl}${config.packagemanager}packages_list`, {
      args: {
        frontend: true
      }
    })
    return frontendPackages
  },
  checkPathForFile (path) {
    return axios.get(path)
  },
  installApp (app) {
    app.installed = true
    return axios.post(`${config.threeBotApiUrl}apps/put`, {
      args: {
        app
      }
    })
  },
  uninstallApp (app) {
    app.installed = false
    return axios.post(`${config.threeBotApiUrl}apps/put`, {
      args: {
        app
      }
    })
  }
})
