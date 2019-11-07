/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../../config/index.js'

export default ({
  getUserData (doubleName) {
    return Axios.get(`${config.botBackend}/api/users/${doubleName}`)
  }
})
