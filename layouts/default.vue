<template>
  <div class="app">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          to="/"
          class="navbar-item"
        >
          Reins
        </nuxt-link>
        
        <a
          :class="{ 'is-active' : navOpen }"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          @click="toggleNav()"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbar"
        :class="{ 'is-active' : navOpen }"
        class="navbar-menu"
      >
        <div class="navbar-end">
          <nuxt-link
            to="/"
            class="navbar-item"
          >
            Home
          </nuxt-link>
          <nuxt-link
            to="/products"
            class="navbar-item"
          >
            Products
          </nuxt-link>
        </div>

      </div>
    </nav>
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
    this.getProducts()
    this.getCart()
    this.getCartTotals()
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
