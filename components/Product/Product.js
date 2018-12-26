export default {
  props: ['product'],
  methods: {
    addToCart(item) {
      this.$store.commit('addToCart', item)
      this.$toast.success('Added to cart')
    }
  },
  computed: {
    productLink() {
      return {
        name: 'products-id',
        params: {
          id: this.product.id
        }
      }
    }
  }
}
