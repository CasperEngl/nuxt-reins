<template>
  <div class="app">
    <b-navbar
      toggleable="md"
      type="light"
      variant="white"
    >
      <b-link
        to="/"
        class="navbar-brand"
      >
        Reins
      </b-link>
      <b-navbar-toggle
        :class="{ active: navOpen }"
        target="nav_collapse"
        @click="toggleNav"
      />

      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            to="/"
            exact
          >
            Home
          </b-nav-item>
          <b-nav-item to="/products">Products</b-nav-item>
          <b-nav-item to="/cart">Cart</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      navOpen: false
    }
  },
  mounted() {
    // this.getProducts()
    // this.getCart()
    // this.getCartTotals()
  },
  methods: {
    ...mapActions(['getProducts', 'getCart', 'getCartTotals']),
    toggleNav() {
      this.navOpen = !this.navOpen
    }
  }
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
