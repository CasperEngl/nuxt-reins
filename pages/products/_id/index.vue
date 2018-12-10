<template>
  <section class="section products">
    <div class="container">
      <article
        v-if="product"
        class="product"
      >
        <figure>
          <img
            :src="product.images[0].src"
            :alt="product.images[0].alt"
          >
        </figure>
        <h3>{{ product.name }}</h3>
      </article>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  asyncData({ route, store }) {
    this.product = store.getters['products'].find(
      product => product.id === Number(route.params.id)
    )

    console.log(this.product)
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters(['products'])
  }
}
</script>

<style lang="scss" scoped>
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
