import axios from '../../zerobot/webplatform/web_modules/axios/dist/axios.min.js'
import farmConfig from '/threebot/farmmanagement/config/farmmanagement.config.local.js'


export default ({
  
  async getName () {
    // let respons = await localGedisClient.executeCommand('identity','name')
    // let resp = await respons.json()
    // return resp
    return axios.post(`/${window.config.identityActor}name`, {
      args: {
      }
    })
  },
  getUser (name) {
    return axios.post(`${farmConfig.identityActor}/phonebook/get`, {
      args: {
        "name": name
      }
    })
  },
  getFarms (user_id) {
    console.log(`getFarms userid`,user_id)
    return axios.post(`${farmConfig.tfGridApiUrl}/farms/owned_by`, {
      args: {
        "threebot_id": user_id
      }
    })
  },
  registerFarm (farm) {
    console.log(JSON.stringify(farm))
    return axios.post(`${farmConfig.tfGridApiUrl}/farms/register`, {
      args: {
        farm
      }
    })
  },
  updateFarm (farm_id, farm) {
    return axios.post(`${farmConfig.tfGridApiUrl}/farms/update`, {
      args: {
        farm_id,
        farm
      }
    })
  },
  getNodes (farm_id) {
    return axios.post(`${farmConfig.tfGridApiUrl}/nodes/list`, {
      args: {
        farm_id: farm_id
      }
    })
  }
})