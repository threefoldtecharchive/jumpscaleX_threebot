import tfService from '../services/tfService'

export default({
  state: {
    trades: []
  },
  actions: {
    getTrades (context) {
      tfService.getLastTrades().then(trades => {
        console.log(`trades`)
        context.commit('setTrades', trades)
      })
    }
  },
  mutations: {
    setTrades: (state, trades) => { state.trades = trades }
  },
  getters: {
    trades: (state) => state.trades
  }
})
