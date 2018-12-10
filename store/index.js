import Vue from 'vue'
import Vuex from 'vuex'
import createHmac from 'create-hmac'
import OAuth from 'oauth-1.0a'
import axios from 'axios'

Vue.use(Vuex)

const oauth = new OAuth({
  consumer: {
    key: process.env.OAUTH_CONSUMER_KEY,
    secret: process.env.OAUTH_CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return createHmac('sha1', key)
      .update(base_string)
      .digest('base64')
  }
})

const store = () =>
  new Vuex.Store({
    state: {
      products: [],
      cart: {},
      cartTotals: {}
    },
    getters: {
      products: state => state.products,
      cart: state => state.cart,
      cartTotals: state => state.cartTotals
    },
    mutations: {
      SET_PRODUCTS(state, payload) {
        state.products = payload
      },
      SET_CART(state, payload) {
        state.cart = payload
      },
      SET_CART_TOTALS(state, payload) {
        state.cartTotals = payload
      }
    },
    actions: {
      async getProducts({ commit }) {
        try {
          const request = {
            url: 'https://reins.test/wp-json/wc/v3/products',
            method: 'GET'
          }

          const auth = oauth.toHeader(oauth.authorize(request))

          const json = await axios({
            url: request.url,
            method: request.method,
            headers: {
              ...auth
            }
          })

          commit('SET_PRODUCTS', json.data)

          return json.data
        } catch (err) {
          // console.error(err);
        }
      },
      async getCart({ commit }) {
        try {
          const request = {
            url: 'https://reins.test/wp-json/wc/v2/cart',
            method: 'GET'
          }

          const json = await axios({
            url: request.url,
            method: request.method
          })

          commit('SET_CART', json.data)

          return json.data
        } catch (err) {
          // console.error(err);
        }
      },
      async getCartTotals({ commit }) {
        try {
          const request = {
            url: 'https://reins.test/wp-json/wc/v2/cart/totals',
            method: 'GET'
          }

          const json = await axios({
            url: request.url,
            method: request.method
          })

          commit('SET_CART_TOTALS', json.data)

          return json.data
        } catch (err) {
          // console.error(err);
        }
      },
      async addToCart({ commit }, data) {
        try {
          const request = {
            url: 'https://reins.test/wp-json/wc/v2/cart/add',
            method: 'POST'
          }

          const json = await axios({
            url: request.url,
            method: request.method,
            data
          })

          commit('SET_CART_TOTALS', json.data)

          return json.data
        } catch (err) {
          // console.error(err);
        }
      }
    }
  })

export default store
