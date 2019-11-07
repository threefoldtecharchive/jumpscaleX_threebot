/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../config/index.js'

export default ({
  getVueApps () {
    const frontendPackages = Axios.post(`${config.jsApiUrl}package_manager/packages_list`, {
      args: {
        frontend: true
      }
    })
    return frontendPackages
  },
  checkPathForFile (path) {
    return Axios.get(path)
  },
  installApp (app) {
    app.installed = true
    return Axios.post(`${config.jsApiUrl}apps/put`, {
      args: {
        app
      }
    })
  },
  uninstallApp (app) {
    app.installed = false
    return Axios.post(`${config.jsApiUrl}apps/put`, {
      args: {
        app
      }
    })
  }
})