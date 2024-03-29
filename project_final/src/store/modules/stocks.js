import stocks from '../../data/stocks'

const state = {
  stocks: []
}

const mutations = {
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks;
  },
  'RND_STOCKS' (state) {
    state.stocks.forEach(stock => {
      var price = Math.round(stock.price * (1 + Math.random() - 0.5))
      while (price < 10){
        price = Math.round(stock.price * (1 + Math.random() - 0.5))
      }
      stock.price = price
    })
  }
}

const actions = {
  buyStock: ({commit}, order) => {
    commit('BUY_STOCK', order)
  },
  initStocks: ({commit}) => {
    commit('SET_STOCKS', stocks)
  },
  randomizeStocks: ({commit}) => {
    commit('RND_STOCKS')
  }
}

const getters = {
  stocks: state => {
    return state.stocks
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}