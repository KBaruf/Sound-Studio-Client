const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

async function StripeCheckoutSession(req, res) {
  const { cartItems, getCart } = await req.body;

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1MmK9gJnFFK3npbBUSbPfTzK' }, { shipping_rate: 'shr_1MmK8qJnFFK3npbB3OdAbG9G' }],
        line_items: cartItems.cartItems.map((item, index) => {
          const prodQuantity = cartItems.getCart[index].quantity;
          const image = item.image[0].asset._ref;
          const newImage = image.replace('image-', 'https://cdn.sanity.io/images/m4x5wjv9/production/').replace('-webp', '.webp');
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            quantity: prodQuantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default StripeCheckoutSession;
