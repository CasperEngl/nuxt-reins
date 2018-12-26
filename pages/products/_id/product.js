export default {
  computed: {
    product() {
      return this.$store.state.products.find(
        product => product.id === Number(this.$route.params.id)
      )
    }
  }
}
