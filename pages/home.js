import Product from '@/components/Product';

export default {
  components : {
    Product
  },
  computed: {
    products() {
      return this.$store.state.products
        .filter(product => product.featured)
        .slice(0, 3)
    }
  },
}