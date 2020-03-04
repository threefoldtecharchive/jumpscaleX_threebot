import axios from "/weblibs/axios/axios.min.js";
import config from "/threebot/capacity/config/capacity.config.local.js";

export default {
  getName() {
    return axios.post(`/${window.config.identityActor}/threebot_name`, {
      args: {}
    });
  },
  getUser(name) {
    return axios.post(`${window.config.phonebookActor}/get`, {
      args: {
        name: name
      }
    });
  },
  getFarms (user_id) {
    return axios.post(`${config.tfApiUrl}/farms/owned_by`, {
      args: {
        "threebot_id": user_id
      }
    })
  },
  registerFarm (farm) {
    return axios.post(`${config.tfApiUrl}/farms/register`, {
      args: {
        farm
      }
    })
  },
  updateFarm (farm_id, farm) {
    return axios.post(`${config.tfApiUrl}/farms/update`, {
      args: {
        farm_id,
        farm
      }
    })
  },
  registered3bots(farm_id = undefined) {
    return axios.post(`${config.tfApiUrl}/nodes/list`, {
      args: {
        farm_id: farm_id
      }
    })
  },
  registeredfarms() {
    return axios.post(`${config.tfApiUrl}/farms/list`);
  },
  news() {
    return axios.post(`${config.tfApiUrl}/news/list`);
  },
  getExplorerConstants() {
    return axios.get(`${config.tfExplorerUrl}`);
  },
  getExplorerBlockByHeight(height) {
    return axios.get(`${config.tfExplorerUrl}/blocks/${height}`);
  }
};
