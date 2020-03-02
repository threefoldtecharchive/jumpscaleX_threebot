import axios from '/weblibs/axios/axios.min.js'
import config from '/threebot/capacity/config/capacity.config.local.js'

export default ({
  registered3bots () {
    return axios.post(`${config.tfApiUrl}nodes/list`)
  },
  registeredfarms () {
    return axios.post(`${config.tfApiUrl}farms/list`)
  },
  news () {
    return axios.post(`${config.tfApiUrl}news/list`)
  },
  getExplorerConstants () {
    return axios.get(`${config.tfExplorerUrl}`)
  },
  getExplorerBlockByHeight (height) {
    return axios.get(`${config.tfExplorerUrl}/blocks/${height}`)
  }
})