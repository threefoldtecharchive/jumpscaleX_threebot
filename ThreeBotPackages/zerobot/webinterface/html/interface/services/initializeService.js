/* eslint no-undef: 0 */
/* eslint-disable no-new */
import config from '../config/index.js'

export default ({
  getName () {
    return Axios.post(`${config.jsApiUrl}initialize/name`)
  },
  addInitializationData (name, public_key, referrer, country, threebot_keys, wallet_keys) {
    var tmp = {
      args: {
        user: {
          bot_name: name,
          public_key: public_key,
          referrer: referrer,
          location: {
            country: country
          },
          threebot_keys: [{
            public_key: threebot_keys.publicKey,
            secret_key: threebot_keys.privateKey
          }],
          wallet_keys: [{
            public_key: wallet_keys.publicKey,
            secret_key: wallet_keys.privateKey
          }]
        }
      }
    }

    return Axios.post(`${config.jsApiUrl}initialize/add`, tmp)
  },
  getInitializationData () {
    return Axios.post(`${config.jsApiUrl}initialize/get`)
  }
})
