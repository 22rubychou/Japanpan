import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: ''
    },
    admin: {
      name: '',
      id: ''
    },
    cartItems: [],
    favItems: []
  },
  mutations: {
    logout (state) {
      state.user.name = ''
      state.user.id = ''
    },
    login (state, data) {
      state.user.name = data.account
      state.user.id = data._id
    },
    adminLogin (state, data) {
      state.admin.name = data.account
      state.admin.id = data._id
    },
    adminLogout (state) {
      state.admin.name = ''
      state.admin.id = ''
    },
    addCart (state, data) {
      const productInCart = state.cartItems.find(item => {
        return item.productId === data.productId
      })
      if (productInCart) {
        productInCart.amount += data.amount
        return
      }
      state.cartItems.push(data)
    },
    delCartProduct (state, data) {
      state.cartItems.splice(state.cartItems.indexOf(data), 1)
    },
    updateProduct (state, amount) {
      state.cartItems.amount = amount
    },
    addFav (state, data) {
      state.favItems.push(data)
    },
    delFav (state, data) {
      state.favItems.splice(state.favItems.indexOf(data), 1)
    },
    clearCart (state) {
      state.cartItems = []
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    cartItems (state) {
      return state.cartItems
    },
    cartTotalPrice (state) {
      let total = 0
      state.cartItems.forEach(item => {
        total += item.price * item.amount
      })
      return total
    },
    favItems (state) {
      return state.favItems
    },
    user (state) {
      return state.user
    },
    favItemsLength (state) {
      return state.favItems.length
    },
    cartTotalAmount (state) {
      let totalAmount = 0
      state.cartItems.forEach(item => {
        totalAmount += item.amount
      })
      return totalAmount
    }
  },
  plugins: [Persistedstate()]
})
