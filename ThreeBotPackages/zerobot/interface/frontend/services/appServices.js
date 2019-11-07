/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../../config/index.js'

export default ({
  getApps () {
    return Axios.post(`${config.jsApiUrl}apps/get`)
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
