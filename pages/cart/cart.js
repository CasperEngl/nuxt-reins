import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  data () {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true,
      },
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
      stripeData: {
        nothing: 'here yet',
      },
    }
  },
  components: { Card },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    cartTotal() {
      return this.$store.state.cartTotal
    },
    totalCost() {
      return Object.values(this.cart)
        .reduce((sum, el) => sum + el.count * el.price, 0)
        .toFixed(2)
    }
  },
  methods: {
    removeItem(item) {
      this.$store.commit('removeItem', item)
      this.$toast.success(`Removed '${item.name}' from cart`)
    },
    async pay () {      
      try {
        let amount = this.totalCost * 100
        let items = Object.keys(this.cart).map((key, index) => {
          return {
            id: this.cart[key].id,
            title: this.cart[key].name,
            count: this.cart[key].count,
            slug: this.cart[key].slug
          }
        })

        const { token } = await createToken();

        this.stripeData = token;
        
        const json = await axios({
          url: '/api/charge',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            token: token.id,
            amount: amount,
            items: items,
          },
        });

        this.complete = true;
        this.$toast.success('Order placed successfully');
        this.$store.commit('clearCart');
      } catch (err) {
        this.complete = false;
        console.error(err);
      }
    }
  }
}
