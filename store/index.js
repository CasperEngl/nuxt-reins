import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTotal: 0,
      cart: {},
      products: [],
    },
    mutations: {
      setProducts(state, products) {
        state.products = products
      },
      clearCart(state) {
        state.cart = {}
        state.cartTotal = 0
      },
      removeItem(state, item) {
        state.cartTotal -= item.count
        Vue.delete(state.cart, item.slug)
      },
      addToCart(state, item) {
        state.cartTotal++
        if (item.slug in state.cart) {
          state.cart[item.slug].count++
        } else {
          let stateItem = Object.assign({}, item)
          stateItem.count = 1
          state.cart[item.slug] = stateItem
        }
      }
    },
    actions: {
      nuxtServerInit({ dispatch }, { req }) {
        return dispatch('getProducts')
      },
      async getProducts({ commit, state }) {
        try {
          const request = {
            url: process.env.API_HOST + '/wp-json/reins/products',
            method: 'GET'
          }

          const json = await axios({
            url: request.url,
            method: request.method
          })

          commit('setProducts', json.data)
        } catch (err) {
          console.error(err)
        }
      }
    },
    getters: {
      products: state => state.products,
      cart: state => state.cart
    }
  })
}

export default createStore
