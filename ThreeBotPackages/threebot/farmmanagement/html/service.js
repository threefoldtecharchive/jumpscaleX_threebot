import axios from '/weblibs/axios/axios.min.js'
import farmConfig from '/threebot/farmmanagement/config/farmmanagement.config.local.js'


export default ({
   getNodes (farm_id) {
    return axios.post(`${farmConfig.tfgridUrl}/nodes/list`, {
      args: {
        farm_id: farm_id
      }
    })
  }
})