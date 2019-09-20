import axios from 'axios'
import config from '../../public/config'
export default ({
  getPeersStat () {
    return axios.get(`${config.tfApiUrl}v1/peers/stat`)
  },
  getPeers () {
    return axios.get(`${config.tfApiUrl}v1/peers`)
  },
  getChartRate () {
    return axios.get(`${config.tfApiUrl}v1/chart/rates`)
  },
  getLastTrades () {
    return axios.get(`${config.tfApiUrl}v1`)
  }
})
