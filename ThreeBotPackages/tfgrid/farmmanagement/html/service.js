export default ({
  getName () {
    return axios.post(`${window.config.jsApiUrl}/identity/name`, {
      args: {
      }
    })
  },
  getUser (name) {
    return axios.post(`${window.config.tfGridApiUrl}/phonebook/get`, {
      args: {
        "name": name
      }
    })
  },
  getFarms (user_id) {
    console.log(`getFarms userid`,user_id)
    return axios.post(`${window.config.tfGridApiUrl}/farms/owned_by`, {
      args: {
        "threebot_id": user_id
      }
    })
  },
  registerFarm (farm) {
    console.log(JSON.stringify(farm))
    return axios.post(`${window.config.tfGridApiUrl}/farms/register`, {
      args: {
        farm
      }
    })
  },
  updateFarm (farm_id, farm) {
    return axios.post(`${window.config.tfGridApiUrl}/farms/update`, {
      args: {
        farm_id,
        farm
      }
    })
  },
  getNodes (farm_id) {
    return axios.post(`${window.config.tfGridApiUrl}/nodes/list`, {
      args: {
        farm_id: farm_id
      }
    })
  }
})