<template>
  <section class="section products">
    <div class="container">
      <div
        v-if="products"
        class="columns is-multiline"
      >
        <nuxt-link
          v-for="product in products"
          :key="product.id"
          :to="'/products/' + product.id"
          class="column is-4"
        >
          <article class="product">
            <figure>
              <img
                :src="product.images[0].src"
                :alt="product.images[0].alt"
              >
            </figure>
            <h3>{{ product.name }}</h3>
          </article>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}

figure {
  height: 20rem;
  display: flex;
  align-items: center;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>
