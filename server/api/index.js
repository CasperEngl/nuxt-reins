const { Router } = require('express')
const router = Router()
const stripe = require('stripe')('sk_test_jyXmRJzPuBRSriYY5ZznggWC')

router.post('/charge', async (req, res) => {
  try {
    let { token, email, name, address, city, amount, items } = req.body
    const customer = await stripe.customers.create({
      email,
    })

    // return req.json(customer);

    const source = await stripe.customers.createSource(customer.id, {
      source: token,
    })

    const charge = stripe.charges.create({
      amount,
      currency: 'dkk',
      customer: source.customer,
    })

    let content = ''
    items.forEach(item => {
      content += `${item.title} x ${item.count}, `
    })
    console.log(content);
    // const params = {
    //   type_slug: 'orders',
    //   title: name,
    //   content: content,
    //   metafields: [
    //     {
    //       key: 'Address',
    //       type: 'text',
    //       value: address
    //     },
    //     {
    //       key: 'City',
    //       type: 'text',
    //       value: city
    //     }
    //   ]
    // }

    // stripe.customers
    //   .create({
    //     email: email
    //   })
    //   .then(customer => {
    //     return stripe.customers.createSource(customer.id, {
    //       source: token
    //     })
    //   })
    //   .then(source => {
    //     return stripe.charges.create({
    //       amount: amount,
    //       currency: 'dkk',
    //       customer: source.customer
    //     })
    //   })
    //   .then(charge => {
    //     let content = ''
    //     items.forEach(item => {
    //       content += `${item.title} x ${item.count}, `
    //     })
    //     const params = {
    //       type_slug: 'orders',
    //       title: name,
    //       content: content,
    //       metafields: [
    //         {
    //           key: 'Address',
    //           type: 'text',
    //           value: address
    //         },
    //         {
    //           key: 'City',
    //           type: 'text',
    //           value: city
    //         }
    //       ]
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
