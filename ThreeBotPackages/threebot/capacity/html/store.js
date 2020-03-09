import tfService from "./service.js";
import lodash from "/weblibs/lodash/lodash.min.js";

const state = {
  user: {},
  registeredNodes: [],
  nodes: undefined,
  registeredFarms: [],
  farms: [],
  nodeSpecs: {
    amountregisteredNodes: 0,
    amountregisteredFarms: 0,
    countries: 0,
    onlinenodes: 0,
    cru: 0,
    mru: 0,
    sru: 0,
    hru: 0
  }
};
const actions = {
  getName: async context => {
    var response = await tfService.getName();
    return response.data.name;
  },
  getUser: async context => {
    var name = await context.dispatch("getName");
    var response = await tfService.getUser(name);
    context.commit("setUser", response.data);
  },
  getRegisteredNodes(context) {
    tfService.registered3bots().then(response => {
      context.commit("setRegisteredNodes", response.data.nodes);
      context.commit("setTotalSpecs", response.data.nodes);
    });
  },
  getRegisteredFarms(context) {
    tfService.registeredfarms().then(response => {
      context.commit("setAmountOfFarms", response.data.farms);
      context.commit("setRegisteredFarms", response.data.farms);
    });
  },
  getFarms: context => {
    tfService.getFarms(context.getters.user.id).then(response => {
      context.commit("setFarms", response.data.farms);
    });
  },
  resetNodes: context => {
    context.commit("setNodes", undefined)
  }
};
const mutations = {
  setRegisteredNodes(state, value) {
    state.registeredNodes = value;
  },
  setRegisteredFarms(state, value) {
    state.registeredFarms = value;
  },
  setFarms(state, value) {
    state.farms = value;
  },
  setNodes(state, value) {
    state.nodes = value;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setAmountOfFarms(state, value) {
    state.nodeSpecs.amountregisteredFarms = value.length;
  },
  setTotalSpecs(state, value) {
    state.nodeSpecs.amountregisteredNodes = value.length;
    state.nodeSpecs.onlinenodes = value.length;
    state.nodeSpecs.countries = lodash.uniqBy(
      value,
      node => node.location.country
    ).length;
    state.nodeSpecs.cru = lodash.sumBy(value, node => node.total_resources.cru);
    state.nodeSpecs.mru = lodash.sumBy(value, node => node.total_resources.mru);
    state.nodeSpecs.sru = lodash.sumBy(value, node => node.total_resources.sru);
    state.nodeSpecs.hru = lodash.sumBy(value, node => node.total_resources.hru);
  }
};

const getters = {
  user: state => state.user,
  registeredNodes: state => state.registeredNodes,
  nodes: state => state.nodes,
  registeredFarms: state => state.registeredFarms,
  farms: state => state.farms,
  nodeSpecs: state => state.nodeSpecs
};

export { state, actions, mutations, getters };
