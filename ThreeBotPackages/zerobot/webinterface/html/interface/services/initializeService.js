/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../config/index.js'

export default ({
  getName () {
    return Axios.post(`${config.jsApiUrl}initialize/name`)
  }
})
