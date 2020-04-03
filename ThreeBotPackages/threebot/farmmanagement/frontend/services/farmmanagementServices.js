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
  getFarms(user_id) {
    return axios.get(`${config.tfgridUrl}/farms`, {
      params: {
        owner: user_id
      }
    });
  },
  registerFarm(farm) {
    return axios.post(`${config.tfgridUrl}/farms/register`,
      {
        farm: farm
      }
    );
  },
  updateFarm(farm_id, farm) {
    return axios.post('/threebot/farmmanagement/actors/farm_management/update_farm', {
      args: {
        farm_id: farm_id,
        farm: farm,
      }
    })
  },
  getNodes(farm_id = undefined) {
    return axios.get(`${config.tfgridUrl}/nodes`, {
      params: {
        farm_id: farm_id
      }
    })
  },
  setNodeFree(node_id, free) {
    return axios.post('/threebot/farmmanagement/actors/farm_management/mark_node_free', {
      args: {
        node_id: node_id,
        free: free,
      }
    })
  }
};