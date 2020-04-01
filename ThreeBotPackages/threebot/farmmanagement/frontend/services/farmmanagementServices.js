import axios from "/weblibs/axios/axios.min.js";
import config from "../config/farmmanagement.config.local.js";

export default {
  getName() {
    return axios.get("/auth/authenticated", {
      args: {}
    });
  },
  getUser(name) {
    return axios.get(`${config.tfgridUrl}/users`, {
      params: {
        name: name
      } 
    });
  },
  getFarms (user_id) {
    return axios.get(`${config.tfgridUrl}/farms`, {
      params: {
        owner: user_id
      }
    });
  },
  registerFarm (farm) {
    return axios.post(`${config.tfgridUrl}/farms/register`, 
      {
       farm: farm
      }
    );
  },
  updateFarm (farm_id, farm) {
    return axios.post(`${config.tfgridUrl}/farms/update`, {
      args: {
        farm_id,
        farm
      }
    })
  },
  registered3bots(farm_id = undefined) {
    return axios.get(`${config.tfgridUrl}/nodes`, {
      params: {
        farm_id: farm_id
      }
    })
  },
  registeredfarms() {
    return axios.get(`${config.tfgridUrl}/farms`);
  },
  news() {
    return axios.get(`${config.tfgridUrl}/news`);
  },
  getExplorerConstants() {
    return axios.get(`${config.tfExplorerUrl}`);
  },
  getExplorerBlockByHeight(height) {
    return axios.get(`${config.tfExplorerUrl}/blocks/${height}`);
  }
};